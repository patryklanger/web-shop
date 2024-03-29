package pl.langer.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authorization.HttpStatusServerAccessDeniedHandler;
import org.springframework.web.cors.CorsConfiguration;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;

@EnableWebFluxSecurity
public class SecurityContextWebFlux {

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) throws Exception {
        http.csrf().disable()
                .cors().configurationSource(request->{
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("*"));
                    config.setAllowedMethods(List.of("*"));
                    config.setAllowedHeaders(List.of("*"));
                    return config;
                })
                .and()
                .authorizeExchange()
                .pathMatchers(HttpMethod.POST, "/api/auth/user", "/api/auth/login", "/api/auth/refresh-token/**", "/api/orders/**", "/api/products/product/list").permitAll()
                .pathMatchers(HttpMethod.GET, "/api/products/category/**", "/api/products/product/**", "/api/products/photos/**").permitAll()
                .pathMatchers(HttpMethod.GET, "/api/orders/user").authenticated()
                .pathMatchers("**").hasRole("admin")
                .anyExchange().authenticated()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(new HttpStatusServerAccessDeniedHandler(HttpStatus.BAD_REQUEST))
                .and()
                .oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(grantedAuthoritiesExtractor());
        return http.build();
    }

    @Bean
    Converter<Jwt, Mono<AbstractAuthenticationToken>> grantedAuthoritiesExtractor() {
        GrantedAuthoritiesExtractor extractor = new GrantedAuthoritiesExtractor();
        return new ReactiveJwtAuthenticationConverterAdapter(extractor);
    }

    static class GrantedAuthoritiesExtractor extends JwtAuthenticationConverter {
        @Override
        protected Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
            List<String> roles = Collections.emptyList();
            Map<String, Object> resource = jwt.getClaimAsMap("resource_access");
            if (resource.containsKey("iotflux-service")) {
                roles = ((Map<String, List<String>>)resource.get("iotflux-service")).get("roles");
            }
            return roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        }
    }

}