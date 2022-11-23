package pl.langer.authservice.config;

import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Configuration;

import static org.keycloak.OAuth2Constants.CLIENT_CREDENTIALS;
@Configuration
@Slf4j
public class KeycloakConfig {

    static Keycloak keycloak = null;

    public final static String serverUrl = "http://localhost:28080/auth";
    public final static String realm = "web-shop";
    public final static String clientId = "keycloak-admin";
    public final static String clientSecret = "c57ce869-42fa-41ac-9617-b49ea05fc72f";



    public KeycloakConfig() {
    }

    public static Keycloak getInstance(){
        if(keycloak == null){
            keycloak = KeycloakBuilder.builder()
                    .grantType(CLIENT_CREDENTIALS)
                    .serverUrl(serverUrl)
                    .realm(realm)
                    .clientId(clientId)
                    .clientSecret(clientSecret)
                    .build();
        }
        return keycloak;
    }
}