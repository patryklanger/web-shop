package pl.langer.productService.model;

import lombok.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "PRODUCT")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    private Float price;

    @Column(nullable = false)
    private Long stockAmount;

    @Column(nullable = false)
    @ElementCollection

    private Set<String> tags = new HashSet<>();
    @Column(nullable = true)
    private String imgUrl;
    @ManyToMany(mappedBy = "products")
    private Set<Category> categories = new HashSet<>();

    public void addTag(String tag) {
        this.tags.add(tag.toLowerCase(Locale.ROOT));
    }

    public void removeTag(String tag) {
        this.tags.remove(tag.toLowerCase(Locale.ROOT));
    }


    public void removeCategory(Category category) {
        this.categories.remove(category);
    }

    public void addCategory(Category category){
        this.categories.add(category);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Product product = (Product) o;

        return Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
