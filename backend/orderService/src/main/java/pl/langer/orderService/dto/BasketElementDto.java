package pl.langer.orderService.dto;

import lombok.*;
import pl.langer.orderService.model.Basket;

import javax.persistence.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasketElementDto {
    private Long productId;
    private Long amount;
}
