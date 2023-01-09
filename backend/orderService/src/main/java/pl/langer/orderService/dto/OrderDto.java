package pl.langer.orderService.dto;

import lombok.*;
import pl.langer.orderService.model.OrderState;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private String userId;
    private BasketDto basket;
    private OrderState orderState;
    private String city;
    private String street;
    private Date createdAt;
    private Integer buildingNumber;
    private Integer apartmentNumber;
    private String country;
    private Long phoneNumber;
}
