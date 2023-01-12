package pl.langer.authservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.langer.authservice.dtos.FindResultDto;
import pl.langer.authservice.dtos.RegisterRequest;
import pl.langer.authservice.dtos.UserDto;
import pl.langer.authservice.dtos.UserInfoDto;
import pl.langer.authservice.model.UserInfo;
import pl.langer.authservice.services.UserService;

import javax.annotation.security.PermitAll;
import javax.ws.rs.core.Response;

@RestController
@AllArgsConstructor
@RequestMapping(path="api/auth/user")
public class UserController {

    UserService service;

    @PostMapping
    public ResponseEntity<UserDto> addUser(@RequestBody RegisterRequest registerRequest){
        return new ResponseEntity<>(service.addUser(registerRequest), HttpStatus.CREATED);
    }

    @PostMapping("/{id}/toggleAdmin")
    public ResponseEntity<UserDto> toggleAdmin(@PathVariable String id) {
        return new ResponseEntity<>(service.toggleAdminRole(id),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<FindResultDto<UserDto>> getUsers(@RequestParam(value = "page", defaultValue = "0") Long page, @RequestParam(value = "limit", defaultValue = "10")Long limit) {
        return new ResponseEntity<>(service.getUsers(page, limit), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable String id) {
        return new ResponseEntity<>(service.getUser(id),HttpStatus.OK);
    }

//    @CrossOrigin
    @DeleteMapping(path = "/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") String userId) {
        service.deleteUser(userId);
        return new ResponseEntity<>(userId, HttpStatus.OK);
    }

}
