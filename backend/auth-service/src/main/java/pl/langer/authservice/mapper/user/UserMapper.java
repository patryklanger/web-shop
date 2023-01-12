package pl.langer.authservice.mapper.user;

import org.keycloak.representations.idm.UserRepresentation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import pl.langer.authservice.dtos.UserDto;

import java.util.LinkedList;
import java.util.List;
import java.util.Locale;

@Mapper(componentModel = "spring")
public interface UserMapper {
     @Mapping(source = "realmRoles", target = "roles", qualifiedByName = "findUserRoles")
    UserDto mapModelToDto(UserRepresentation user);

    @Named("findUserRoles")
    static List<String> findUserRoles(List<String> roles) {
        List<String> list = new LinkedList<>();
        if(roles == null) {
            list.add("VISITOR");
        }
        else {
            roles.stream()
                    .filter(i -> i.equals("visitor") || i.equals("admin"))
                    .forEach(r->list.add(r));
        }

        return list;
    }
}
