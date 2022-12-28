package pl.langer.productService.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.langer.productService.dto.FindResultDto;
import pl.langer.productService.dto.product.ProductCategoryDto;
import pl.langer.productService.dto.product.ProductDto;
import pl.langer.productService.dto.SearchDto;
import pl.langer.productService.exception.CategoryNotFoundException;
import pl.langer.productService.exception.ProductNotFoundException;
import pl.langer.productService.mapper.category.CategoryMapper;
import pl.langer.productService.mapper.product.ProductMapper;
import pl.langer.productService.model.Category;
import pl.langer.productService.model.Product;
import pl.langer.productService.repository.CategoryRepository;
import pl.langer.productService.repository.ProductRepository;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {

    ProductRepository productRepository;
    ProductMapper productMapper;
    CategoryMapper categoryMapper;
    CategoryRepository categoryRepository;

    public FindResultDto<ProductDto> findAll(SearchDto searchDto) {
        PageRequest pageRequest = PageRequest.of(searchDto.getPage().intValue(), searchDto.getLimit().intValue());

        Page<Product> products = productRepository.findAll(pageRequest);

        return FindResultDto.<ProductDto>builder()
                .count((long) products.getNumberOfElements())
                .results(products.getContent().stream()
                        .map(productMapper::mapEntityToDto)
                        .collect(Collectors.toList()))
                .startElement(pageRequest.getOffset())
                .totalCount(products.getTotalElements())
                .build();
    }

    private Product getProductById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);

        if(productOptional.isEmpty()) {
            throw new ProductNotFoundException("Product not found!");
        }

        return productOptional.get();
    }
    @Transactional
    public ProductDto addCategoriesToProduct(Long productId, Set<Long> categoryIds) {
        Product product = getProductById(productId);

        Set<Category> categories = categoryIds.stream()
                .map(categoryRepository::findById)
                .map(c->c.orElseThrow(()->new CategoryNotFoundException("Category not found")))
                .collect(Collectors.toSet());

        Set<Category> newSet = product.getCategories();
        newSet.addAll(categories);

        product.setCategories(newSet);
        return productMapper.mapEntityToDto(productRepository.save(product));

    }
     public ProductDto addTags(Set<String> list, Long id){
        ProductDto productDto = findById(id);
        Product product = productMapper.mapDtoToEntity(productDto);
        list.forEach(product::addTag);
        return save(productMapper.mapEntityToDto(product));
     }

     public ProductDto removeTags(Set<String> list, Long id) {
         ProductDto productDto = findById(id);
         Product product = productMapper.mapDtoToEntity(productDto);
         list.forEach(product::removeTag);
         return save(productMapper.mapEntityToDto(product));
     }

    public ProductDto findById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()) {
            return productMapper.mapEntityToDto(product.get());
        } else {
            throw new ProductNotFoundException("Product not found!");
        }
    }

    public ProductDto editProduct(ProductCategoryDto productCategoryDto, Long id) {
        ProductDto productDto = findById(id);
        productDto.setName(productCategoryDto.getName());
        productDto.setPrice(productCategoryDto.getPrice());
        productDto.setDescription(productCategoryDto.getDescription());
        productDto.setStockAmount(productCategoryDto.getStockAmount());
        productDto.setTags(productCategoryDto.getTags());
        return save(productDto);
    }

    public ProductDto save(ProductDto object) {
        if(object == null) {
            throw new NullPointerException("Object cannot be null!");
        }
        Product product = productMapper.mapDtoToEntity(object);
        Product p = productRepository.save(product);
        return productMapper.mapEntityToDto(p);
    }

    @Transactional
    public void deleteById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(()->new ProductNotFoundException("Product not found!"));
        product.getCategories().forEach(c->c.getProducts().remove(product));
        productRepository.delete(product);
    }
}