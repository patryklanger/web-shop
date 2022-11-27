package pl.langer.productService.dto.product;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategoryDto {
    private Long id;
    private String name;
    private String description;
    private Float price;
    private Integer stockAmount;
    private Set<String> tags;
    private String imgUrl;
}
