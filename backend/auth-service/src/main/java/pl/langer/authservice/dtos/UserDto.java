package pl.langer.authservice.dtos;

import lombok.*;
import pl.langer.authservice.model.enums.UserRoles;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserDto {
    private String username;
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private List<String> roles;
    private Boolean enabled;
}
