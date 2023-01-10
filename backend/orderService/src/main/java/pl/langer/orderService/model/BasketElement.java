package pl.langer.orderService.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class BasketElement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private Integer amount;
    private Float price;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", referencedColumnName = "id",  nullable = false, insertable = false, updatable = false)
    @JsonIgnoreProperties("basket")
    private Order order;
}
