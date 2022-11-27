package pl.langer.productService.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.langer.productService.dto.category.CategoryDto;
import pl.langer.productService.dto.FindResultDto;
import pl.langer.productService.dto.SearchDto;
import pl.langer.productService.dto.category.CategoryProductDto;
import pl.langer.productService.exception.CategoryNotFoundException;
import pl.langer.productService.mapper.category.CategoryMapper;
import pl.langer.productService.mapper.product.ProductMapper;
import pl.langer.productService.model.Category;
import pl.langer.productService.model.Product;
import pl.langer.productService.repository.CategoryRepository;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryService {
    CategoryRepository categoryRepository;
    ProductService productService;
    CategoryMapper categoryMapper;
    ProductMapper productMapper;

    private Category getCategoryById(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

        if (!categoryOptional.isPresent()) {
            throw new CategoryNotFoundException("Category not found!");
        }

        return categoryOptional.get();
    }
    public FindResultDto<CategoryDto> findAll(SearchDto searchDto) {
        PageRequest pageRequest = PageRequest.of(searchDto.getPage().intValue(), searchDto.getLimit().intValue());

        Page<Category> categories = categoryRepository.findAll(pageRequest);

        return FindResultDto.<CategoryDto>builder()
                .count((long) categories.getNumberOfElements())
                .results(categories.getContent().stream()
                        .map(categoryMapper::mapEntityToDto)
                        .collect(Collectors.toList()))
                .startElement(pageRequest.getOffset())
                .totalCount(categories.getTotalElements())
                .build();
    }

    public CategoryDto findById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            return categoryMapper.mapEntityToDto(category.get());
        } else {
            throw new CategoryNotFoundException("Category not found!");
        }
    }

    @Transactional
    public CategoryDto addProductsToCategory(Set<Long> productIdList, Long categoryId) {
        Category category = getCategoryById(categoryId);

        Set<Product> products = productIdList.stream()
                .map(productService::findById)
                .map(productMapper::mapDtoToEntity)
                .collect(Collectors.toSet());

        Set<Product> newSet = category.getProducts();
        newSet.addAll(products);

        category.setProducts(newSet);
        categoryRepository.save(category);

        return categoryMapper.mapEntityToDto(category);
    }

    public CategoryDto editCategory(CategoryProductDto categoryProductDto, Long id) {
        CategoryDto categoryDto = findById(id);
        categoryDto.setName(categoryProductDto.getName());
        categoryDto.setDescription(categoryDto.getDescription());
        return save(categoryDto);
    }

    @Transactional
    public CategoryDto deleteProductsFromCategory(Set<Long> productIds, Long categoryId){
        Category category = getCategoryById(categoryId);

        Set<Product> products = productIds.stream()
                .map(productService::findById)
                .map(productMapper::mapDtoToEntity)
                .collect(Collectors.toSet());

        Set<Product> newProducts = category.getProducts();
        newProducts.removeAll(products);
        category.setProducts(newProducts);

        return categoryMapper.mapEntityToDto(categoryRepository.save(category));
    }

    public CategoryDto save(CategoryDto object) {
        if (object == null) {
            throw new NullPointerException("Object cannot be null!");
        }
        Category category = categoryMapper.mapDtoToEntity(object);
        if (category.getProducts() == null) {
            category.setProducts(new HashSet<>());
        }
        Category c = categoryRepository.save(category);
        return categoryMapper.mapEntityToDto(c);
    }

    @Transactional
    public void deleteById(Long id) {
        CategoryDto categoryDto = findById(id);
        categoryMapper.mapDtoToEntity(categoryDto);
        categoryDto.getProducts().stream()
                .map(productMapper::mapDtoToEntity)
                .forEach(p -> p.removeCategory(
                        categoryMapper.mapDtoToEntity(categoryDto)));
        categoryRepository.deleteById(id);
    }
}
