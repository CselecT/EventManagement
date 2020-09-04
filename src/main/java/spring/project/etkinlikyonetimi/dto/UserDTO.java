package spring.project.etkinlikyonetimi.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import spring.project.etkinlikyonetimi.validation.TcKimlikNo;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Builder
public class UserDTO {

    @JsonProperty("name")
    @NotEmpty(message = "Name cannot be empty!")
    public final String name;

    @JsonProperty("surname")
    @NotEmpty(message = "Surname cannot be empty!")
    public final String surname;

    @JsonProperty("tcKimlikNo")
    @TcKimlikNo(message = "TC Kimlik No must be valid!")
    public final String tcKimlikNo;

    @JsonProperty("email")
    @Email(message = "Email is not valid!")
    public final String email;

    @JsonCreator
    public UserDTO(@JsonProperty("name") String name,
                      @JsonProperty("surname") String surname,
                      @JsonProperty("tcKimlikNo") String tcKimlikNo,
                   @JsonProperty("email") String email)
                      {
        this.name = name;
        this.surname = surname;
        this.tcKimlikNo = tcKimlikNo;
        this.email = email;
    }
}