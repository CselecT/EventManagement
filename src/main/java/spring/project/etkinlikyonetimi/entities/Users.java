package spring.project.etkinlikyonetimi.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "idgen", sequenceName = "USERS_SEQ")

public class Users extends BaseEntity {

    @Column(name="NAME")
    private String name;

    @Column(name="SURNAME")
    private String surname;

    @Column(name="TC_KIMLIK_NO", unique = false)
    private String tcKimlikNo;

    @Column(name="EMAIL")
    private String email;

}
