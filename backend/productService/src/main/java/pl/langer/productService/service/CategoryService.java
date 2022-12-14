package pl.langer.productService.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.langer.productService.dto.category.CategoryDto;
import pl.langer.productService.dto.FindResultDto;
import pl.langer.productService.dto.SearchDto;
import pl.langer.productService.dto.category.CategoryNameDto;
import pl.langer.productService.dto.category.CategoryProductDto;
import pl.langer.productService.exception.CategoryNotFoundException;
import pl.langer.productService.exception.ImageUploadException;
import pl.langer.productService.exception.ProductNotFoundException;
import pl.langer.productService.mapper.category.CategoryMapper;
import pl.langer.productService.mapper.product.ProductMapper;
import pl.langer.productService.model.Category;
import pl.langer.productService.model.Product;
import pl.langer.productService.repository.CategoryRepository;
import pl.langer.productService.repository.ProductRepository;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryService {

    PhotoService photoService;
    CategoryRepository categoryRepository;
    ProductRepository productRepository;
    CategoryMapper categoryMapper;
    ProductMapper productMapper;

    public List<CategoryNameDto> findAllNames(){
        return categoryRepository.findAllByIsDeletedFalse(Sort.by("id").descending()).stream().map(categoryMapper::mapEntityToNameDto).collect(Collectors.toList());
    }

    private Category getCategoryById(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findByIdAndIsDeletedFalse(categoryId);

        if (!categoryOptional.isPresent()) {
            throw new CategoryNotFoundException("Category not found!");
        }

        return categoryOptional.get();
    }
    public FindResultDto<CategoryDto> findAll(SearchDto searchDto) {
        PageRequest pageRequest = PageRequest.of(searchDto.getPage().intValue(), searchDto.getLimit().intValue(), Sort.by("id").descending());

        Page<Category> categories = categoryRepository.findAllByIsDeletedFalse(pageRequest);

        return FindResultDto.<CategoryDto>builder()
                .count((long) categories.getNumberOfElements())
                .results(categories.getContent().stream()
                        .map(categoryMapper::mapEntityToDto)
                        .collect(Collectors.toList()))
                .startElement(pageRequest.getOffset())
                .totalCount(categories.getTotalElements())
                .build();
    }

    public CategoryDto addPhotoToCategory(Long categoryId, MultipartFile multipartFile) {
        Category category = getCategoryById(categoryId);
        try {
            String dir = photoService.saveCategoryPhoto(multipartFile, categoryId);
            category.setImgUrl(dir);
            return categoryMapper.mapEntityToDto(categoryRepository.save(category));
        } catch(Exception e) {
            throw new ImageUploadException();
        }
    }

    public CategoryDto findById(Long id) {
        Optional<Category> category = categoryRepository.findByIdAndIsDeletedFalse(id);
        if (category.isPresent()) {
            return categoryMapper.mapEntityToDto(category.get());
        } else {
            throw new CategoryNotFoundException("Category not found!");
        }
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
                .map(productRepository::findById)
                .map(c->c.orElseThrow(()->new ProductNotFoundException("Product not found!")))
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
        Category category = categoryRepository.findById(id).orElseThrow(()->new CategoryNotFoundException("Category not found!"));
        category.getProducts().forEach(p->{
            var cat = p.getCategories().stream().filter(c->c.getId()!=category.getId()).collect(Collectors.toSet());
            p.setCategories(cat);
            productRepository.save(p);
        });
        category.setIsDeleted(true);
        categoryRepository.save(category);
    }
}
