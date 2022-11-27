package pl.langer.productService.dto.product;

import lombok.*;
import pl.langer.productService.dto.category.CategoryProductDto;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "categories")
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Float price;
    private Integer stockAmount;
    private String imgUrl;
    private Set<String> tags;
    private Set<CategoryProductDto> categories;

    public void setTags(Set<String> tags){
        this.tags = tags.stream().map(String::toLowerCase).collect(Collectors.toSet());
    }
}
