package pl.langer.authservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.langer.authservice.dtos.FindResultDto;
import pl.langer.authservice.dtos.RegisterRequest;
import pl.langer.authservice.dtos.UserDto;
import pl.langer.authservice.services.UserService;

@RestController
@AllArgsConstructor
@RequestMapping(path="api/user")
public class UserController {

    UserService service;

    @CrossOrigin
    @PostMapping
    public String addUser(@RequestBody RegisterRequest registerRequest){
        service.addUser(registerRequest);
        return "User Added Successfully";
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<FindResultDto<UserDto>> getUsers(@RequestParam(value = "page", defaultValue = "0") Long page, @RequestParam(value = "limit", defaultValue = "10")Long limit) {
        return new ResponseEntity<>(service.getUsers(page, limit), HttpStatus.OK);
    }
}
