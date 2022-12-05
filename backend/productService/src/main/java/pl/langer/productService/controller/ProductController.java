package pl.langer.productService.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.langer.productService.dto.FindResultDto;
import pl.langer.productService.dto.product.ProductCategoryDto;
import pl.langer.productService.dto.product.ProductDto;
import pl.langer.productService.dto.SearchDto;
import pl.langer.productService.service.CategoryService;
import pl.langer.productService.service.ProductService;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import java.util.HashSet;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/product")
public class ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<FindResultDto<ProductDto>> getAllProducts(@RequestParam(value = "page", defaultValue = "0") Long page, @RequestParam(value = "limit", defaultValue = "10") Long limit) {
        SearchDto searchDto = SearchDto.builder()
                .page(page)
                .limit(limit)
                .build();
        return new ResponseEntity<>(productService.findAll(searchDto), HttpStatus.OK);

    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> editProduct(@PathVariable Long id, @RequestBody ProductCategoryDto productCategoryDto) {
        return new ResponseEntity<>(productService.editProduct(productCategoryDto, id), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/{id}/tag")
    public ResponseEntity<ProductDto> addTagsToProduct(@PathVariable Long id, @RequestBody Set<String> tags){
        return new ResponseEntity<>(productService.addTags(tags,id),HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/{id}/tag")
    public ResponseEntity<ProductDto> removeTagsFromProduct(@PathVariable Long id, @RequestBody Set<String> tags) {
        return new ResponseEntity<>(productService.removeTags(tags,id),HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/{id}/category")
    public ResponseEntity<ProductDto> addCategoriesToProduct(@PathVariable Long id, @RequestBody Set<Long> categoryIds) {
        return new ResponseEntity<>(productService.addCategoriesToProduct(id, categoryIds), HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/{id}/category")
    public ResponseEntity<ProductDto> deleteCategoriesFromProduct(@PathVariable Long id, @RequestBody Set<Long> categoryIds) {
        categoryIds.stream().forEach(c->{
            Set<Long> idList = new HashSet<>();
            idList.add(id);
            categoryService.deleteProductsFromCategory(idList, c);
        });
        return new ResponseEntity<>(productService.findById(id), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<ProductDto> addProduct(@RequestBody ProductDto productDto) {
        return new ResponseEntity<>(productService.save(productDto), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        return new ResponseEntity<>(productService.findById(id), HttpStatus.OK);
    }
    @PermitAll
    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        productService.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
