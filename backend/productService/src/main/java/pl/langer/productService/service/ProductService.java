package pl.langer.productService.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.langer.productService.dto.FindResultDto;
import pl.langer.productService.dto.ParamsDto;
import pl.langer.productService.dto.product.*;
import pl.langer.productService.dto.SearchDto;
import pl.langer.productService.exception.CategoryNotFoundException;
import pl.langer.productService.exception.ImageUploadException;
import pl.langer.productService.exception.ProductNotFoundException;
import pl.langer.productService.exception.StockTooLowException;
import pl.langer.productService.mapper.category.CategoryMapper;
import pl.langer.productService.mapper.product.ProductMapper;
import pl.langer.productService.model.Category;
import pl.langer.productService.model.Product;
import pl.langer.productService.repository.CategoryRepository;
import pl.langer.productService.repository.ProductRepository;

import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {

    PhotoService photoService;
    ProductRepository productRepository;
    ProductMapper productMapper;
    CategoryMapper categoryMapper;
    CategoryRepository categoryRepository;

    public List<ProductDto> findList(Set<Long> ids) {
        List<Product> products = productRepository.findByIsDeletedFalseAndIdIn(ids, Sort.by("id").descending());
        return products.stream().map(productMapper::mapEntityToDto).collect(Collectors.toList());
    }

    public List<ProductDto> findListIncludeDeleted(Set<Long> ids) {
        List<Product> products = productRepository.findByIdIn(ids, Sort.by("id").descending());
        return products.stream().map(productMapper::mapEntityToDto).collect(Collectors.toList());
    }

    public FindResultDto<ProductDto> findAll(SearchDto searchDto, ParamsDto paramsDto) {
        PageRequest pageRequest = PageRequest.of(searchDto.getPage().intValue(), searchDto.getLimit().intValue(), Sort.by("id").descending());
        Page<Product> products;

        if (paramsDto.getCategoryId() != null) {
            products = productRepository.findByIsDeletedFalseAndCategories_Id(paramsDto.getCategoryId(),pageRequest);
        } else {
            products = productRepository.findAllByIsDeletedFalse(pageRequest);
        }

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
    public List<ProductPriceResponseDto> getPriceAndDecreaseStockAmount(List<ProductPriceRequestDto> productPriceRequestDtos) {
        List<ProductPriceResponseDto> result = new LinkedList<>();
        productPriceRequestDtos.stream()
                .forEach(c->{
                    var product = productRepository.findById(c.getId()).orElseThrow(()->new ProductNotFoundException("Product not found!"));
                    if(product.getStockAmount() < c.getAmount()) {
                        throw new StockTooLowException("Stock too low exception!");
                    }
                    product.setStockAmount(product.getStockAmount()-c.getAmount());
                    var response = ProductPriceResponseDto.builder().price(c.getAmount()*product.getPrice()).amount(c.getAmount()).id(c.getId()).build();
                    result.add(response);
                    productRepository.save(product);
                });
        return result;
    }
    @Transactional
    public ProductDto addCategoriesToProduct(Long productId, Set<Long> categoryIds) {
        Product product = getProductById(productId);

        Set<Category> categories = categoryIds.stream()
                .map(categoryRepository::findById)
                .map(c->c.orElseThrow(()->new CategoryNotFoundException("Category not found")))
                .collect(Collectors.toSet());
        product.setCategories(categories);

        return productMapper.mapEntityToDto(productRepository.save(product));
    }
     public ProductDto addTags(Set<String> list, Long id){
        ProductDto productDto = findById(id);
        Product product = productMapper.mapDtoToEntity(productDto);
        product.setTags(list);
        return save(productMapper.mapEntityToDto(product));
     }

    public ProductDto findById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(()->new ProductNotFoundException("Product not found!"));
        if(product.getIsDeleted()) {
            throw new ProductNotFoundException("Product not found!");
        }
        return productMapper.mapEntityToDto(product);
    }

    public ProductDto editProduct(CreateProductDto createProductDto, Long id) {
        ProductDto productDto = findById(id);
        productDto.setName(createProductDto.getName());
        productDto.setPrice(createProductDto.getPrice());
        productDto.setDescription(createProductDto.getDescription());
        productDto.setStockAmount(createProductDto.getStockAmount());
        return save(productDto);
    }

    public ProductDto addPhotoToProduct(Long productId, MultipartFile multipartFile) {
        Product product = getProductById(productId);
        try {
            String dir = photoService.saveProductPhoto(multipartFile, productId);
            product.setImgUrl(dir);
            return productMapper.mapEntityToDto(productRepository.save(product));
        } catch(Exception e) {
            throw new ImageUploadException();
        }
    }

    public ProductDto createProduct(CreateProductDto object) {
        if(object == null) {
            throw new NullPointerException("Object cannot be null!");
        }
        Product product = productMapper.mapCreateDtoToEntity(object);
        Product p = productRepository.save(product);
        return productMapper.mapEntityToDto(p);
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
        product.setIsDeleted(true);
        productRepository.save(product);
    }
}
