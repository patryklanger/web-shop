package pl.langer.orderService.controller;

import lombok.AllArgsConstructor;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.langer.orderService.dto.FindResultDto;
import pl.langer.orderService.dto.OrderDto;
import pl.langer.orderService.dto.SearchDto;
import pl.langer.orderService.service.OrderService;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/orders/")
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<FindResultDto<OrderDto>> getAllProducts(@RequestParam(value = "page", defaultValue = "0") Long page, @RequestParam(value = "limit", defaultValue = "10") Long limit) {
        SearchDto searchDto = SearchDto.builder()
                .page(page)
                .limit(limit)
                .build();
        return new ResponseEntity<>(orderService.findAll(searchDto), HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(HttpServletRequest request, @RequestBody OrderDto orderDto) {
        Principal principal = request.getUserPrincipal();
        return new ResponseEntity<>(orderService.save(orderDto), HttpStatus.CREATED);
    }
}
