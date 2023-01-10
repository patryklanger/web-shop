package pl.langer.productService.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.langer.productService.dto.FindResultDto;
import pl.langer.productService.dto.ParamsDto;
import pl.langer.productService.dto.product.*;
import pl.langer.productService.dto.SearchDto;
import pl.langer.productService.service.CategoryService;
import pl.langer.productService.service.ProductService;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/products/product")
public class ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;


    @GetMapping
    public ResponseEntity<FindResultDto<ProductDto>> getAllProducts(@RequestParam(value = "page", defaultValue = "0") Long page, @RequestParam(value = "limit", defaultValue = "10") Long limit, @RequestParam(required = false) Long categoryId) {
        ParamsDto paramsDto = ParamsDto.builder().categoryId(categoryId).build();

        SearchDto searchDto = SearchDto.builder()
                .page(page)
                .limit(limit)
                .build();
        return new ResponseEntity<>(productService.findAll(searchDto, paramsDto), HttpStatus.OK);

    }

    @PostMapping("/buy")
    public ResponseEntity<List<ProductPriceResponseDto>> getPriceAndDecreaseStockAmount(@RequestBody List<ProductPriceRequestDto> productPriceRequestDtos) {
        return new ResponseEntity<>(productService.getPriceAndDecreaseStockAmount(productPriceRequestDtos), HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> editProduct(@PathVariable Long id, @RequestBody ProductCategoryDto productCategoryDto) {
        return new ResponseEntity<>(productService.editProduct(productCategoryDto, id), HttpStatus.OK);
    }


    @PostMapping("/{id}/tag")
    public ResponseEntity<ProductDto> addTagsToProduct(@PathVariable Long id, @RequestBody Set<String> tags){
        return new ResponseEntity<>(productService.addTags(tags,id),HttpStatus.OK);
    }


    @DeleteMapping("/{id}/tag")
    public ResponseEntity<ProductDto> removeTagsFromProduct(@PathVariable Long id, @RequestBody Set<String> tags) {
        return new ResponseEntity<>(productService.removeTags(tags,id),HttpStatus.OK);
    }


    @PostMapping("/{id}/category")
    public ResponseEntity<ProductDto> addCategoriesToProduct(@PathVariable Long id, @RequestBody Set<Long> categoryIds) {
        return new ResponseEntity<>(productService.addCategoriesToProduct(id, categoryIds), HttpStatus.OK);
    }


    @DeleteMapping("/{id}/category")
    public ResponseEntity<ProductDto> deleteCategoriesFromProduct(@PathVariable Long id, @RequestBody Set<Long> categoryIds) {
        categoryIds.stream().forEach(c->{
            Set<Long> idList = new HashSet<>();
            idList.add(id);
            categoryService.deleteProductsFromCategory(idList, c);
        });
        return new ResponseEntity<>(productService.findById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<ProductDto> addProduct(@Valid @RequestBody CreateProductDto createProductDto) {
        return new ResponseEntity<>(productService.createProduct(createProductDto), HttpStatus.CREATED);
    }


    @PostMapping("/{id}/image")
    public ResponseEntity<ProductDto> addImageToProduct(@RequestParam("image")MultipartFile multipartFile, @PathVariable Long id) {
        return new ResponseEntity<>(productService.addPhotoToProduct(id, multipartFile), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        return new ResponseEntity<>(productService.findById(id), HttpStatus.OK);
    }
    @PermitAll

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        productService.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
