package pl.langer.orderService.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import pl.langer.orderService.dto.BasketDto;
import pl.langer.orderService.model.Basket;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface BasketMapper {
    Basket mapDtoToEntity(BasketDto basketDto);
    BasketDto mapEntityToDto(Basket basket);
}
