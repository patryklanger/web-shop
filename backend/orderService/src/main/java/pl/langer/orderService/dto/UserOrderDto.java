package pl.langer.orderService.dto;

import lombok.*;
import pl.langer.orderService.model.OrderState;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserOrderDto {
    private Long id;

    private Set<BasketElementDto> basket;

    private OrderState orderState;

    private String city;

    private String street;

    private Date createdAt;

    private String buildingNumber;

    private String apartmentNumber;

    private String country;

    private Long phoneNumber;

    private Boolean paid;
}