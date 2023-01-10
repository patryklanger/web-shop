package pl.langer.productService.dto.product;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductPriceRequestDto {
    private Long id;
    private Integer amount;
}
