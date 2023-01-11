package pl.langer.orderService.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderBasketElementDto {
    private Long productId;
    private Integer amount;
}
