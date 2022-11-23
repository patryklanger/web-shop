package pl.langer.authservice.mapper.user;

import org.keycloak.representations.idm.UserRepresentation;
import org.mapstruct.Mapper;
import pl.langer.authservice.dtos.UserDto;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto mapModelToDto(UserRepresentation user);
}
