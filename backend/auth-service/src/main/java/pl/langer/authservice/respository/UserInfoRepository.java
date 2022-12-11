package pl.langer.authservice.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.langer.authservice.model.UserInfo;

import java.util.List;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    List<UserInfo> findByUserId(String userId);
}
