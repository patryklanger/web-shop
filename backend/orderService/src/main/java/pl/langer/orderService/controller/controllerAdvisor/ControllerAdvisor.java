package pl.langer.orderService.controller.controllerAdvisor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.support.WebExchangeBindException;
import pl.langer.orderService.exception.OrderNotFoundException;
import pl.langer.orderService.exception.ProductNotFoundException;
import pl.langer.orderService.exception.StackTooLowException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
@Slf4j
public class ControllerAdvisor {
    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<Object> handleOrderNotFoundException(OrderNotFoundException ex){
        return new ResponseEntity<>("Order not found!", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Object> handleProductNotFoundException(ProductNotFoundException ex){
        return new ResponseEntity<>("Product not found!", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(StackTooLowException.class)
    public ResponseEntity<Object> handleStackTooLowException(StackTooLowException ex){
        return new ResponseEntity<>("Stack too low!", HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(WebExchangeBindException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationErrors(WebExchangeBindException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors()
                .stream().map(FieldError::getDefaultMessage).collect(Collectors.toList());
        return new ResponseEntity<>(getErrorsMap(errors), HttpStatus.BAD_REQUEST);
    }

    private Map<String, List<String>> getErrorsMap(List<String> errors) {
        Map<String, List<String>> errorResponse = new HashMap<>();
        errorResponse.put("errors", errors);
        return errorResponse;
    }
}