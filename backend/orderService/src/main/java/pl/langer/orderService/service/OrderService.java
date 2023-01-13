package pl.langer.orderService.service;

import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.langer.orderService.dto.*;
import pl.langer.orderService.exception.OrderNotFoundException;
import pl.langer.orderService.mapper.BasketElementMapper;
import pl.langer.orderService.mapper.OrderMapper;
import pl.langer.orderService.model.BasketElement;
import pl.langer.orderService.model.Order;
import pl.langer.orderService.model.OrderState;
import pl.langer.orderService.repository.OrderRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;
    BasketElementMapper basketElementMapper;
    RestService restService;

    public FindResultDto<OrderDto> findAll(SearchDto searchDto) {
        PageRequest pageRequest = PageRequest.of(searchDto.getPage().intValue(), searchDto.getLimit().intValue(), Sort.by("id").descending());

        Page<Order> orders = orderRepository.findAll(pageRequest);

        return FindResultDto.<OrderDto>builder()
                .count((long) orders.getNumberOfElements())
                .results(orders.getContent().stream()
                        .map(orderMapper::mapEntityToDto)
                        .collect(Collectors.toList())).startElement(pageRequest.getOffset())
                .totalCount(orders.getTotalElements())
                .build();
    }

    public OrderDto findById(Long id) {
        return orderMapper.mapEntityToDto(orderRepository.findById(id).orElseThrow(()->new OrderNotFoundException("Order not found")));
    }

    public FindResultDto<UserOrderDto> findAllByUserId(SearchDto searchDto, String id) {
        PageRequest pageRequest = PageRequest.of(searchDto.getPage().intValue(), searchDto.getLimit().intValue(), Sort.by("id").descending());

        Page<Order> orders = orderRepository.findAllByUserId(id, pageRequest);

        return FindResultDto.<UserOrderDto>builder()
                .count((long) orders.getNumberOfElements())
                .results(orders.getContent().stream()
                        .map(orderMapper::maptEntityToUserDto)
                        .collect(Collectors.toList()))
                .startElement(pageRequest.getOffset())
                .totalCount(orders.getTotalElements())
                .build();
    }

    public OrderDto save(CreateOrderDto object, String name) {
        if(object == null) {
            throw new NullPointerException("Object cannot be null!");
        }
        Set<BasketElement> newBasket = new HashSet<BasketElement>();
        var basket = object.getBasket().stream().map(basketElementMapper::mapCreateRequestToRequest).collect(Collectors.toList());
        Arrays.stream(restService.buyProducts(basket)).map(basketElementMapper::mapResponseToEntity).forEach(e->{
            var element = new BasketElement();
            element.setProductId(e.getProductId());
            element.setAmount(e.getAmount());
            element.setPrice(e.getPrice());
            newBasket.add(element);
        });
        Order order = orderMapper.mapCreateDtoToEntity(object);
        order.setBasket(newBasket);
        order.setUserId(name);
        order.setCreatedAt(new Date());
        order.setPaid(false);
        order.setOrderState(OrderState.INITIALIZED);
        Order o = orderRepository.save(order);
        return orderMapper.mapEntityToDto(o);
    }

    public OrderDto changeStauts(Long id, ChangeStateDto changeStateDto) {
        var order = orderRepository.findById(id).orElseThrow(()->new OrderNotFoundException("Order not found!"));
        order.setOrderState(changeStateDto.getState());
        return orderMapper.mapEntityToDto(orderRepository.save(order));
    }

    public OrderDto payOrder(Long id) {
        var order = orderRepository.findById(id).orElseThrow(()->new OrderNotFoundException("Order not found!"));
        order.setPaid(true);
        return orderMapper.mapEntityToDto(orderRepository.save(order));
    }
}
