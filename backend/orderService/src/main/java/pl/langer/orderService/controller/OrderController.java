package pl.langer.orderService.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.langer.orderService.dto.*;
import pl.langer.orderService.model.OrderState;
import pl.langer.orderService.service.OrderService;

import javax.validation.Valid;
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

    @GetMapping("{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        return new ResponseEntity<>(orderService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(Principal principal, @RequestBody @Valid CreateOrderDto createOrderDto) {
        String name = principal.getName();
        return new ResponseEntity<>(orderService.save(createOrderDto, name), HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<OrderDto> changeOrderStauts(@PathVariable Long id, @RequestBody ChangeStateDto changeStateDto) {
        return new ResponseEntity<>(orderService.changeStauts(id,changeStateDto),HttpStatus.OK);
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<OrderDto> payOrder(@PathVariable Long id) {
        return new ResponseEntity<>(orderService.payOrder(id),HttpStatus.OK);
    }
}
