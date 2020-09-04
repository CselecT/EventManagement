package spring.project.etkinlikyonetimi.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@Entity
@Setter
@Getter
@SequenceGenerator(name = "idgen", sequenceName = "EVENT_SEQ")
public class Event extends BaseEntity {

    @Column(name="EVENT_NAME", unique = true)
    private String name;

    @Column(name="DESCRIPTION")
    private String description;

    @Column(name="CAPACITY")
    private Long capacity;

    @Column(name="STARTING")
    private String startDate;

    @Column(name="ENDING")
    private String endDate;

    @Column(name="LAT")
    private Double lat;

    @Column(name="LNG")
    private Double lng;

    @Column(name="AVAILABLE_PLACE")
    private Long availablePlace;

    @Column(name="APPLICANT_NUMBER")
    private Long applicantNumber;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="EVENT_ID")
    private Set<Users> applicants;

    public Long availablePlace(){
        return this.capacity - this.applicants.size();
    }

}
