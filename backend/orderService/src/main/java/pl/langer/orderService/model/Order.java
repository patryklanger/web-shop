package pl.langer.orderService.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "basekt_id", referencedColumnName = "id")
    private Basket basket;

    private Date createdAt;

    private OrderState orderState;

    private String city;

    private String street;

    private Integer buildingNumber;

    private Integer apartmentNumber;

    private String country;

    private Long phoneNumber;
}
