package pl.langer.productService.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.langer.productService.model.Product;

import java.util.List;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByIsDeletedFalseAndCategories_Id(Long id, Pageable pageable);
    Page<Product> findAllByIsDeletedFalse(Pageable pageable);

    List<Product> findByIsDeletedFalseAndIdIn(Set<Long> idList, Sort sort);
}
