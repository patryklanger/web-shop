package pl.langer.productService.dto.category;

import lombok.*;
import pl.langer.productService.dto.product.ProductCategoryDto;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryNameDto {
    private Long id;
    private String name;
}
