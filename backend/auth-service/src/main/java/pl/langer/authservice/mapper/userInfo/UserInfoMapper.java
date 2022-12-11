package pl.langer.authservice.mapper.userInfo;

import org.mapstruct.Mapper;
import pl.langer.authservice.dtos.UserInfoDto;
import pl.langer.authservice.model.UserInfo;

@Mapper(componentModel = "spring")
public interface UserInfoMapper {
    UserInfoDto mapEntityToDto(UserInfo userInfo);
    UserInfo mapDtoToEntity(UserInfoDto userInfoDto);
}
