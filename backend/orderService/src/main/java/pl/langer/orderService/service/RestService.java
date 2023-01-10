package pl.langer.orderService.service;

import com.netflix.appinfo.InstanceInfo;
import com.netflix.discovery.EurekaClient;
import com.netflix.discovery.shared.Application;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import pl.langer.orderService.dto.BasketPriceRequetDto;
import pl.langer.orderService.dto.BasketPriceResponseDto;
import pl.langer.orderService.exception.ProductNotFoundException;
import pl.langer.orderService.exception.StackTooLowException;

import java.util.List;

@Service
@AllArgsConstructor
public class RestService {
    private String productServiceId = "productService";
    private final RestTemplate restTemplate;
    @Autowired
    private EurekaClient eurekaClient;

    public RestService() {
        this.restTemplate = new RestTemplate();
    }

    public  BasketPriceResponseDto[] buyProducts(List<BasketPriceRequetDto> basketPriceRequetDtoList) {
        Application application = eurekaClient.getApplication(productServiceId);
        InstanceInfo instanceInfo = application.getInstances().get(0);
        String url = "http://" + instanceInfo.getIPAddr() + ":" + instanceInfo.getPort() + "/" + "api/products/product/buy";

        try {
            var response =  this.restTemplate.postForObject(url, basketPriceRequetDtoList, BasketPriceResponseDto[].class);
            return response;
        } catch(HttpClientErrorException | HttpServerErrorException httpClientOrServerExc) {
            if(HttpStatus.NOT_FOUND.equals(httpClientOrServerExc.getStatusCode())) {
                throw new ProductNotFoundException("Product not found!");
            } else if (HttpStatus.FORBIDDEN.equals(httpClientOrServerExc.getStatusCode())) {
                throw new StackTooLowException("Stack too low!");
            }
            return null;
        }
    }
}
