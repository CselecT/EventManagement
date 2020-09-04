package spring.project.etkinlikyonetimi.mapper;

import org.mapstruct.Mapper;
import spring.project.etkinlikyonetimi.dto.EventDTO;
import spring.project.etkinlikyonetimi.dto.UserDTO;
import spring.project.etkinlikyonetimi.entities.Event;
import spring.project.etkinlikyonetimi.entities.Users;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO mapToDto(Users users);
    Users mapToEntity(UserDTO userDTO);
    List<Users> mapToEntity(List<UserDTO> eventDTOS);
    List<UserDTO> mapToDto(List<Users> events);
}
