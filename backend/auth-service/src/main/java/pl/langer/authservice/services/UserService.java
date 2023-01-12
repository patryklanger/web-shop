package pl.langer.authservice.services;

import lombok.AllArgsConstructor;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.langer.authservice.config.KeycloakConfig;
import pl.langer.authservice.dtos.FindResultDto;
import pl.langer.authservice.dtos.RegisterRequest;
import pl.langer.authservice.dtos.UserDto;
import pl.langer.authservice.exception.UnableToCreateUserException;
import pl.langer.authservice.exception.UserNotFoundException;
import pl.langer.authservice.exception.UsernameOrEmailTakenException;
import pl.langer.authservice.mapper.user.UserMapper;
import pl.langer.authservice.utils.Credentials;

import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import static pl.langer.authservice.config.KeycloakConfig.getInstance;

@Service
@AllArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public UserDto addUser(RegisterRequest registerRequest){
        CredentialRepresentation credential = Credentials
                .createPasswordCredentials(registerRequest.getPassword());
        UserRepresentation user = new UserRepresentation();
        user.setUsername(registerRequest.getUsername());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setCredentials(Collections.singletonList(credential));
        user.setEnabled(true);

        UsersResource instance = getInstance();
        Response response = instance.create(user);

        if(response.getStatus() == HttpStatus.CONFLICT.value()) {
            throw new UsernameOrEmailTakenException("Username or email taken");
        }
        if(response.getStatus() == HttpStatus.CREATED.value()) {
            return userMapper.mapModelToDto(user);
        }
        throw new UnableToCreateUserException("Unable");
    }

    public UserDto toggleAdminRole(String userId) {
        var keycloakRealm = KeycloakConfig.getInstance().realm(KeycloakConfig.realm);
        UsersResource instance = keycloakRealm.users();
        try {
            var user = instance.get(userId);
            List<RoleRepresentation> roleToAdd = new LinkedList<>();
            roleToAdd.add(keycloakRealm
                    .roles()
                    .get("admin")
                    .toRepresentation());

            var userRoles = user
                    .roles()
                    .realmLevel()
                    .listAll();

            var isAdmin = userRoles
                    .stream()
                    .anyMatch(r->r.getName().equals("admin"));

            if(isAdmin){
                user.roles().realmLevel().remove(roleToAdd);
            } else {
                user.roles().realmLevel().add(roleToAdd);
            }
            return getUser(user.toRepresentation().getId());

        } catch(Exception e) {
            throw new UserNotFoundException(("User not found!"));
        }
    }

    public FindResultDto<UserDto> getUsers(Long page, Long limit) {
        UsersResource instance = KeycloakConfig.getInstance().realm(KeycloakConfig.realm).users();

        Long count = Long.valueOf(instance.count());

        List<UserRepresentation> userRepresentations = instance.list(page.intValue() * limit.intValue(), limit.intValue());

        userRepresentations.stream().forEach(i -> i.setRealmRoles(
                KeycloakConfig.getInstance().realm(KeycloakConfig.realm).users()
                        .get(i.getId()).roles().realmLevel().listAll()
                        .stream()
                        .map(RoleRepresentation::getName).collect(Collectors.toList())));

        return FindResultDto.<UserDto>builder()
                .count((long) userRepresentations.size())
                .results(userRepresentations.stream()
                        .map(userMapper::mapModelToDto)
                        .collect(Collectors.toList()))
                .startElement(((long) page.intValue() * limit.intValue()))
                .totalCount(count)
                .build();
    }
    public void deleteUser(String userId){
        getUser(userId);

        UsersResource usersResource = getInstance();
        usersResource.get(userId)
                .remove();
    }


    public UserDto getUser(String userId) {
        UsersResource instance = KeycloakConfig.getInstance().realm(KeycloakConfig.realm).users();
        try {
            var user = instance.get(userId).toRepresentation();
            user.setRealmRoles(KeycloakConfig.getInstance().realm(KeycloakConfig.realm).users()
                    .get(user.getId()).roles().realmLevel().listAll()
                    .stream()
                    .map(RoleRepresentation::getName).collect(Collectors.toList()));
            return userMapper.mapModelToDto(user);
        } catch(Exception e) {
            throw new UserNotFoundException(("User not found!"));
        }
    }


    public UsersResource getInstance(){
        return KeycloakConfig.getInstance().realm(KeycloakConfig.realm).users();
    }
}
