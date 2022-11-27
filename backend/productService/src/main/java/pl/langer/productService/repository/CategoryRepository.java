package pl.langer.productService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.langer.productService.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
