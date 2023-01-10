package pl.langer.orderService.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    @OneToMany(targetEntity = BasketElement.class, cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id",nullable = false)
    @JsonIgnoreProperties("order")
    private Set<BasketElement> basket;

    @Column(nullable = false)
    private Date createdAt;

    @Enumerated
    @Column(nullable = false)
    private OrderState orderState;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private String buildingNumber;

    private String apartmentNumber;

    @Column(nullable = false)
    private String country;

    private Long phoneNumber;

    private Boolean paid;
}
