package pl.langer.authservice.exception;

public class AuthorizationFailedException extends RuntimeException {
    public AuthorizationFailedException(String msg) {
        super(msg);
    }
}
