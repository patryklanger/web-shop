package pl.langer.productService.mapper.category;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import pl.langer.productService.dto.category.CategoryDto;
import pl.langer.productService.dto.category.CategoryProductDto;
import pl.langer.productService.model.Category;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface CategoryMapper {

    Category mapDtoToEntity(CategoryDto categoryDto);
    CategoryDto mapEntityToDto(Category category);

    Category mapDtoToEntity(CategoryProductDto categoryProductDto);
}
