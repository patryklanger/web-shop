package pl.langer.productService.dto.category;

import lombok.*;
import pl.langer.productService.dto.product.ProductCategoryDto;
import pl.langer.productService.dto.product.ProductDto;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "products")
public class CategoryDto {
    private Long id;
    private String name;
    private String description;
    private String imgUrl;
    private Set<ProductCategoryDto> products;
}
