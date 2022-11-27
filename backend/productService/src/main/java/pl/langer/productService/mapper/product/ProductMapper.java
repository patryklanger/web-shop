package pl.langer.productService.mapper.product;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import pl.langer.productService.dto.product.ProductCategoryDto;
import pl.langer.productService.dto.product.ProductDto;
import pl.langer.productService.model.Product;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ProductMapper {

    Product mapDtoToEntity(ProductDto productDto);
    ProductDto mapEntityToDto(Product product);

    Product mapDtoToEntity(ProductCategoryDto productCategoryDto);
}
