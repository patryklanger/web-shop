package pl.langer.orderService.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchDto {
    private Long limit;
    private Long page;
}