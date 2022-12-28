package pl.langer.productService.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.langer.productService.dto.category.CategoryDto;
import pl.langer.productService.dto.FindResultDto;
import pl.langer.productService.dto.SearchDto;
import pl.langer.productService.dto.category.CategoryProductDto;
import pl.langer.productService.service.CategoryService;

import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping(path="api/products/category")
public class CategoryController {
    private final CategoryService categoryService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<FindResultDto<CategoryDto>> getAllCategories(@RequestParam(value = "page", defaultValue = "0") Long page, @RequestParam(value = "limit", defaultValue = "10")Long limit){
        SearchDto searchDto = SearchDto.builder()
                .page(page)
                .limit(limit)
                .build();

        return new ResponseEntity<>(categoryService.findAll(searchDto), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<CategoryDto> addCategory(@RequestBody CategoryDto categoryDto){
        return new ResponseEntity<>(categoryService.save(categoryDto), HttpStatus.CREATED);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> editCategory(@RequestBody CategoryProductDto categoryProductDto, @PathVariable Long id){
        return new ResponseEntity<>(categoryService.editCategory(categoryProductDto, id), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/{id}/product")
    public ResponseEntity<CategoryDto> addProductsToCategory(@RequestBody Set<Long> categoryIdSet, @PathVariable Long id) {
        return new ResponseEntity<>(categoryService.addProductsToCategory(categoryIdSet, id), HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/{id}/product")
    public ResponseEntity<CategoryDto> deleteProductsFromCategory(@RequestBody Set<Long> categoryIds, @PathVariable Long id) {
        return new ResponseEntity<>(categoryService.deleteProductsFromCategory(categoryIds,id), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategory(@PathVariable Long id) {
        return new ResponseEntity<>(categoryService.findById(id), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/{id}/image")
    public ResponseEntity<CategoryDto> addImageToCategory(@RequestParam("image") MultipartFile multipartFile, @PathVariable Long id) {
        return new ResponseEntity<>(categoryService.addPhotoToCategory(id, multipartFile), HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity deleteCategory(@PathVariable Long id) {
        categoryService.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
