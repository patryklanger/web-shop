package pl.langer.orderService.exception;

public class StackTooLowException extends RuntimeException{
    public StackTooLowException(String msg) {
        super(msg);
    }
}