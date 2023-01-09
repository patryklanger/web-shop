package pl.langer.orderService.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import pl.langer.orderService.dto.OrderDto;
import pl.langer.orderService.model.Order;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface OrderMapper {
    Order mapDtoToEntity(OrderDto orderDto);
    OrderDto mapEntityToDto(Order order);
}
