package pl.langer.productService.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.langer.productService.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByIsDeletedFalse(Sort sort);
    Page<Category> findAllByIsDeletedFalse(Pageable pageable);
    Optional<Category> findByIdAndIsDeletedFalse(Long id);
}
