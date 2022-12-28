package pl.langer.authservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.langer.authservice.dtos.LoginRequest;
import pl.langer.authservice.dtos.LoginResponse;
import pl.langer.authservice.services.LoginService;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping(path="api/auth")
public class LoginController {

    LoginService loginService;

    @CrossOrigin
    @PostMapping("login")
    public ResponseEntity<?> login (@RequestBody LoginRequest loginRequest) {
        return loginService.login(loginRequest);
    }

    @CrossOrigin
    @PostMapping("refresh-token/{token}")
    public ResponseEntity<?> refreshToken (@PathVariable String token) {
        return loginService.refreshToken(token);
    }
}