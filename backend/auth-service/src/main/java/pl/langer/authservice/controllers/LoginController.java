package pl.langer.authservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.langer.authservice.dtos.LoginRequest;
import pl.langer.authservice.dtos.LoginResponse;
import pl.langer.authservice.exception.AuthorizationFailedException;
import pl.langer.authservice.services.LoginService;

import javax.servlet.http.HttpServletRequest;

@RestController
public class LoginController {


    @Autowired
    LoginService loginService;

    @PostMapping("login")
    public ResponseEntity<?> login (HttpServletRequest request,
                                                @RequestBody LoginRequest loginRequest) throws Exception {

        ResponseEntity<LoginResponse> response = null;
        response = loginService.login(loginRequest);
        return response;
    }
}