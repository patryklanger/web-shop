package pl.langer.orderService.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import pl.langer.orderService.dto.CreateOrderDto;
import pl.langer.orderService.dto.OrderDto;
import pl.langer.orderService.dto.UserOrderDto;
import pl.langer.orderService.model.Order;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface OrderMapper {
    UserOrderDto maptEntityToUserDto(Order order);
    OrderDto mapEntityToDto(Order order);
    Order mapCreateDtoToEntity(CreateOrderDto createOrderDto);


}
