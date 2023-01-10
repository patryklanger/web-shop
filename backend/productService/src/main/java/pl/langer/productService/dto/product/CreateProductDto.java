package pl.langer.productService.dto.product;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductDto {
    @NotBlank(message="Name cannot be empty!")
    private String name;
    private String description;
    @NotNull(message = "Price cannot be empty!")
    @Min(value = 0, message = "Price cannot be lower than 0!")
    private Float price;
    @NotNull(message = "Stock amount cannot be empty!")
    @Min(value = 0, message = "Stock amount cannot be lower than 0!")
    private Integer stockAmount;
    private Set<String> tags;
}
