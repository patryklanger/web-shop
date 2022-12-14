package pl.langer.orderService.dto;

import lombok.*;
import pl.langer.orderService.model.Order;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasketElementDto {
    private Long productId;
    private Integer amount;
    private Float price;
}
