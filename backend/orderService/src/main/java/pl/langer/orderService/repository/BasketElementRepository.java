package pl.langer.orderService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.langer.orderService.model.BasketElement;

public interface BasketElementRepository extends JpaRepository<BasketElement, Long> {
}
