package pl.langer.orderService.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.util.List;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasketDto {
    @JsonProperty(value = "elements")
    private List<BasketElementDto> elements;
}
