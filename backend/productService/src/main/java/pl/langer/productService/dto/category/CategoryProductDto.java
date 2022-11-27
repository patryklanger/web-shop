package pl.langer.productService.dto.category;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryProductDto {
    private Long id;
    private String name;
    private String description;
    private String imgUrl;
}
