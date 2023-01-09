package pl.langer.orderService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.langer.orderService.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
