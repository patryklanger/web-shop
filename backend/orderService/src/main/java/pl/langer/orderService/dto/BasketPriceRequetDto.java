package pl.langer.orderService.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasketPriceRequetDto {
    private Long id;
    private Integer amount;
}
