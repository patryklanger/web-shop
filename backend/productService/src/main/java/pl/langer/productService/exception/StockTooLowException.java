package pl.langer.productService.exception;

public class StockTooLowException extends RuntimeException{
    public StockTooLowException(String msg) {
        super(msg);
    }
}
