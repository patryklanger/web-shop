package pl.langer.productService.dto.product;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductPriceResponseDto {
    private Long id;
    private Integer amount;
    private Float price;
}
