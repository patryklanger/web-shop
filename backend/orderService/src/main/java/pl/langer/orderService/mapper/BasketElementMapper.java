package pl.langer.orderService.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import pl.langer.orderService.dto.BasketElementDto;
import pl.langer.orderService.model.BasketElement;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface BasketElementMapper {
    BasketElement mapDtoToEntity(BasketElementDto basketElementDto);
    BasketElementDto mapEntityToDto(BasketElement basketElement);
}
