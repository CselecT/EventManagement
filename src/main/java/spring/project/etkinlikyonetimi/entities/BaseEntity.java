package spring.project.etkinlikyonetimi.entities;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@EqualsAndHashCode(of = "id")
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idgen")
    @Column(name="ID")
    private Long id;

    @Version
    @Column(name="VERSION")
    private Long version;

    @CreatedDate
    @Column(name="CREATED", updatable = false)
    private LocalDateTime created;

    @LastModifiedDate
    @Column(name="LAST_MODIFIED", updatable = false)
    private LocalDateTime lastModified;

}
