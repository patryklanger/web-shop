package pl.langer.orderService.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.langer.orderService.dto.UserOrderDto;
import pl.langer.orderService.model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Override
    @Query("select distinct o from Order o join o.basket")
    List<Order> findAll();

    Page<Order> findAllByUserId(String id, Pageable pageable);
}
