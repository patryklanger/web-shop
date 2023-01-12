package pl.langer.orderService.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.langer.orderService.dto.BasketElementDto;
import pl.langer.orderService.dto.BasketPriceRequetDto;
import pl.langer.orderService.dto.BasketPriceResponseDto;
import pl.langer.orderService.dto.CreateOrderBasketElementDto;
import pl.langer.orderService.model.BasketElement;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface BasketElementMapper {
    @Mapping(source = "id", target = "productId")
    BasketElement mapResponseToEntity(BasketPriceResponseDto basketPriceResponseDto);
    @Mapping(source = "productId", target = "id")
    BasketPriceRequetDto mapCreateRequestToRequest(CreateOrderBasketElementDto createOrderBasketElementDto);
}
