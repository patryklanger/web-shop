package pl.langer.orderService.dto;

import lombok.*;
import pl.langer.orderService.model.OrderState;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangeStateDto {
    private OrderState state;
}
