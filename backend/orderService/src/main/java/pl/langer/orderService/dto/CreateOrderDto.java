package pl.langer.orderService.dto;

import lombok.*;
import pl.langer.orderService.model.OrderState;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderDto {
    private Set<CreateOrderBasketElementDto> basket;

    @NotBlank(message = "City is mandatory")
    private String city;

    @NotBlank(message = "Street is mandatory")
    private String street;

    @NotBlank(message = "Building number is mandatory")
    private String buildingNumber;

    private String apartmentNumber;

    @NotBlank(message = "Country number is mandatory")
    private String country;

    private Long phoneNumber;
}
