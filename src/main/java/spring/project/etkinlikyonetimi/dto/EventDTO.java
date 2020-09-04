package spring.project.etkinlikyonetimi.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.*;
import java.time.LocalDateTime;


@Builder
public class EventDTO {

    @JsonProperty("name")
    @NotEmpty(message = "Name cannot be empty!")
    public final String name;

    @JsonProperty("description")
    @NotEmpty(message = "Description cannot be empty!")
    public final String description;

    @JsonProperty("capacity")
    @Min(value = 0,message = "0 capacity?")
    public final Long capacity;

    @JsonProperty("startDate")
    public final String startDate;

    @JsonProperty("endDate")
    public final String endDate;

    @JsonProperty("lat")
    public final Double lat;

    @JsonProperty("lng")
    public final Double lng;

    @JsonProperty("availablePlace")
    public final Long availablePlace;

    @JsonProperty("applicantNumber")
    public final Long applicantNumber;



    @AssertTrue(message = "Dates are not logical!")
    public boolean isDatesValid(){
        return LocalDateTime.parse(startDate).isBefore(LocalDateTime.parse(endDate));
    }

    @JsonCreator
    public EventDTO(
            @JsonProperty("name") String name,
                   @JsonProperty("description") String description,
                   @JsonProperty("capacity") Long capacity,
                   @JsonProperty("StartDate") String startDate,
                    @JsonProperty("endDate") String endDate,
            @JsonProperty("lat") Double lat,
            @JsonProperty("lng") Double lng,
    @JsonProperty("availablePlace") Long availablePlace,
    @JsonProperty("applicantNumber") Long applicantNumber)
    {
        this.name = name;
        this.capacity=capacity;
        this.description=description;
        this.endDate=endDate;
        this.startDate=startDate;
        this.lat=lat;
        this.lng=lng;
        this.availablePlace=availablePlace;
        this.applicantNumber=applicantNumber;
    }
}
