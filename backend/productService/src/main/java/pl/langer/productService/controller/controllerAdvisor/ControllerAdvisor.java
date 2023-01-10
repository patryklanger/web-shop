package pl.langer.productService.controller.controllerAdvisor;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import pl.langer.productService.exception.CategoryNotFoundException;
import pl.langer.productService.exception.ImageUploadException;
import pl.langer.productService.exception.ProductNotFoundException;
import pl.langer.productService.exception.StockTooLowException;

import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class ControllerAdvisor {
    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<Object> handleCategoryNotFoundException(CategoryNotFoundException ex) {
        String msg = "Category not found!";
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        return new ResponseEntity<>(msg, httpStatus);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Object> handleProductNotFoundException(ProductNotFoundException ex) {
        String msg = "Product not found!";
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        return new ResponseEntity<>(msg, httpStatus);
    }

    @ExceptionHandler(ImageUploadException.class)
    public ResponseEntity<Object> handleImageUploadException(ImageUploadException ex) {
        String msg = "Unable to upload image!";
        HttpStatus httpStatus = HttpStatus.NOT_ACCEPTABLE;

        return new ResponseEntity<>(msg, httpStatus);
    }

    @ExceptionHandler(java.nio.file.NoSuchFileException.class)
    public ResponseEntity<Object> handleNoSuchFileException(java.nio.file.NoSuchFileException ex){
        String msg = "File not found!";
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        return new ResponseEntity<>(msg,httpStatus);
    }

    @ExceptionHandler(StockTooLowException.class)
    public ResponseEntity<Object> handleStockTooLowException(StockTooLowException ex) {
        return new ResponseEntity<>("Stock too low!", HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleValidationError(org.springframework.dao.DataIntegrityViolationException ex) {
        return new ResponseEntity<>("Validation error", HttpStatus.BAD_REQUEST);
    }

    private Map<String, Object> buildMessageBody(String msg) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", msg);

        return body;
    }
}
