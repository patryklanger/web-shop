package pl.langer.authservice.controllers.controllerAdvisor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import pl.langer.authservice.exception.AuthorizationFailedException;
import pl.langer.authservice.exception.UsernameOrEmailTakenException;

import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class ControllerAdvisor {
    @ExceptionHandler(UsernameOrEmailTakenException.class)
    public ResponseEntity<Object> handleUserCreationException(UsernameOrEmailTakenException ex) {
        String msg = "Username or email already taken";
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(buildMessageBody(msg), httpStatus);
    }

    @ExceptionHandler(AuthorizationFailedException.class)
    public ResponseEntity<Object> handleAuthorizationFailedException(AuthorizationFailedException ex) {
        String msg = "Wrong username or password";
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;

        return new ResponseEntity<>(buildMessageBody(msg), httpStatus);
    }

    private Map<String, Object> buildMessageBody(String msg) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", msg);

        return body;
    }
}
