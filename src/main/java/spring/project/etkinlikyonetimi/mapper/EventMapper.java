package spring.project.etkinlikyonetimi.mapper;

import org.mapstruct.Mapper;
import spring.project.etkinlikyonetimi.dto.EventDTO;
import spring.project.etkinlikyonetimi.entities.Event;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventMapper {
    EventDTO mapToDto(Event event);
    Event mapToEntity(EventDTO eventDTO);

    List<Event> mapToEntity(List<EventDTO> eventDTOS);
    List<EventDTO> mapToDto(List<Event> events);

}
