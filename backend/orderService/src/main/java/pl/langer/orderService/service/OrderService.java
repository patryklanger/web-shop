package pl.langer.orderService.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.langer.orderService.dto.FindResultDto;
import pl.langer.orderService.dto.OrderDto;
import pl.langer.orderService.dto.SearchDto;
import pl.langer.orderService.mapper.OrderMapper;
import pl.langer.orderService.model.Order;
import pl.langer.orderService.model.OrderState;
import pl.langer.orderService.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;

    public FindResultDto<OrderDto> findAll(SearchDto searchDto) {
        PageRequest pageRequest = PageRequest.of(searchDto.getPage().intValue(), searchDto.getLimit().intValue());

        Page<Order> orders = orderRepository.findAll(pageRequest);

        return FindResultDto.<OrderDto>builder()
                .count((long) orders.getNumberOfElements())
                .results(orders.getContent().stream()
                        .map(orderMapper::mapEntityToDto)
                        .collect(Collectors.toList())).startElement(pageRequest.getOffset())
                .totalCount(orders.getTotalElements())
                .build();
    }
    public OrderDto save(OrderDto object) {
        if(object == null) {
            throw new NullPointerException("Object cannot be null!");
        }
        Order order = orderMapper.mapDtoToEntity(object);
        order.setCreatedAt(new Date());
        order.setOrderState(OrderState.INITIALIZED);
        Order o = orderRepository.save(order);
        return orderMapper.mapEntityToDto(o);
    }
}
