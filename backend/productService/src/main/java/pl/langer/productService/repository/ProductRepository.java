package pl.langer.productService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.langer.productService.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
