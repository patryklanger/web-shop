package pl.langer.orderService.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.langer.orderService.dto.BasketElementDto;
import pl.langer.orderService.dto.BasketPriceRequetDto;
import pl.langer.orderService.dto.BasketPriceResponseDto;
import pl.langer.orderService.model.BasketElement;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface BasketElementMapper {
    BasketElement mapDtoToEntity(BasketElementDto basketElementDto);
    BasketElementDto mapEntityToDto(BasketElement basketElement);

    @Mapping(source = "productId", target = "id")
    BasketPriceRequetDto mapEntityToRequest(BasketElement basketElement);

    @Mapping(source = "id", target = "productId")
    BasketElement mapResponseToEntity(BasketPriceResponseDto basketPriceResponseDto);
}
