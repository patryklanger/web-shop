package pl.langer.orderService.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasketPriceResponseDto {
    private Long id;
    private Integer amount;
    private Float price;
}
