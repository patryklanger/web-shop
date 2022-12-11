package pl.langer.authservice.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoDto {
    private Long id;

    private String userId;

    private String country;

    private String street;

    private String buildingNumber;

    private String postalCode;

    private String phoneNumber;
}
