package pl.langer.authservice.exception;

public class UsernameOrEmailTakenException extends RuntimeException{
    public UsernameOrEmailTakenException(String msg) {
        super(msg);
    }
}
