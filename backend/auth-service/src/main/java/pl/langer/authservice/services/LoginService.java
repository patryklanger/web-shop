package pl.langer.authservice.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import pl.langer.authservice.dtos.LoginRequest;
import pl.langer.authservice.dtos.LoginResponse;
import pl.langer.authservice.exception.AuthorizationFailedException;
import pl.langer.authservice.exception.CustomKeycloakAuthenticationHandler;

@Service
public class LoginService {

    @Value("${app.keycloak.login.url}")
    private String loginUrl;
    @Value("${app.keycloak.client-secret}")
    private String clientSecret;
    @Value("${app.keycloak.grant-type}")
    private String grantType;
    @Value("${app.keycloak.client-id}")
    private String clientId;

    RestTemplate restTemplate;

    public LoginService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<LoginResponse> login (LoginRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("username", request.getUsername());
        map.add("password", request.getPassword());
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("grant_type", grantType);

        HttpEntity<MultiValueMap<String,String>> httpEntity=new HttpEntity<>(map,headers);
        try {
            ResponseEntity<LoginResponse> loginResponse = restTemplate.postForEntity(loginUrl, httpEntity, LoginResponse.class);
            return ResponseEntity.status(200).body(loginResponse.getBody());
        }
        catch(Exception ex) {
            throw new AuthorizationFailedException("FAILED!");
        }
    }

    public ResponseEntity<LoginResponse> refreshToken (String refreshToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("grant_type", "refresh_token");
        map.add("refresh_token", refreshToken);
        HttpEntity<MultiValueMap<String,String>> httpEntity=new HttpEntity<>(map,headers);
        try {
            ResponseEntity<LoginResponse> loginResponse = restTemplate.postForEntity(loginUrl, httpEntity, LoginResponse.class);
            return ResponseEntity.status(200).body(loginResponse.getBody());
        }
        catch(Exception ex) {
            throw new AuthorizationFailedException("FAILED!");
        }
    }

}
