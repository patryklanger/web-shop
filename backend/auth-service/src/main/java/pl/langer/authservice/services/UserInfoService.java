package pl.langer.authservice.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.langer.authservice.dtos.UserInfoDto;
import pl.langer.authservice.mapper.userInfo.UserInfoMapper;
import pl.langer.authservice.model.UserInfo;
import pl.langer.authservice.respository.UserInfoRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserInfoService {
    UserInfoRepository userInfoRepository;
    UserInfoMapper userInfoMapper;

    public UserInfoDto addUserInfo(String userId, UserInfoDto userInfoDto) {

        userInfoDto.setUserId(userId);
        UserInfo userInfo = this.userInfoMapper.mapDtoToEntity(userInfoDto);
        return userInfoMapper.mapEntityToDto(userInfoRepository.save(userInfo));
    }

//    public UserInfoDto getUserInfo(String userId){
//        userInfoRepository.findByUserId(userId).stream().map()
//    }
}
