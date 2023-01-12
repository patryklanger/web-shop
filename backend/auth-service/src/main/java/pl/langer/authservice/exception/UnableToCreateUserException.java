package pl.langer.authservice.exception;

public class UnableToCreateUserException extends RuntimeException{
    public UnableToCreateUserException(String msg) {
        super(msg);
    }
}
