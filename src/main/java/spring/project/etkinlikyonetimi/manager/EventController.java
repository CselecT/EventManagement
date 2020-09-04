package spring.project.etkinlikyonetimi.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import spring.project.etkinlikyonetimi.MessageResponse;
import spring.project.etkinlikyonetimi.dto.EventDTO;
import spring.project.etkinlikyonetimi.dto.UserDTO;
import spring.project.etkinlikyonetimi.entities.Event;
import spring.project.etkinlikyonetimi.entities.Users;
import spring.project.etkinlikyonetimi.mapper.EventMapper;
import spring.project.etkinlikyonetimi.mapper.UserMapper;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;
    private final EventMapper eventMapper;
    private final UserMapper userMapper;

    @GetMapping()
    List<EventDTO> getAllEvents(){
        List<Event> events=eventService.getAllEvents();
        return eventMapper.mapToDto(events);
    }

    @GetMapping("/users")
    List<EventDTO> getEventsForUsers(){
        List<Event> events= eventService.getEventsForUsers();
        return eventMapper.mapToDto(events);
    }

    @GetMapping("/{eventName}")
    EventDTO getEvent(@PathVariable String eventName){
        Event event=eventService.getEvent(eventName);
        return eventMapper.mapToDto(event);
    }

    @PostMapping("/add")
    public MessageResponse addEvent(@Valid @RequestBody EventDTO eventDTO){
        Event event=eventMapper.mapToEntity(eventDTO);
        return eventService.addEvent(event);
    }

    @PostMapping("/{eventName}/booking")
    public MessageResponse addApplicant(@Valid @RequestBody UserDTO userDTO, @PathVariable String eventName){
        Users user=userMapper.mapToEntity(userDTO);
        return eventService.addApplicant(user,eventName);
    }

    @GetMapping("/admin/{eventName}")
    public List<UserDTO> getAllApplicants(@PathVariable String eventName){
        Set<Users> users=eventService.getAllUsers(eventName);
        return userMapper.mapToDto(new ArrayList<>(users));
    }

    @DeleteMapping("/admin/{eventName}")
    public MessageResponse deleteEvent(@PathVariable String eventName){
        return eventService.deleteEvent(eventName);
    }

    @PutMapping("/admin/{eventName}/edit")
    public MessageResponse updateEvent(@RequestBody EventDTO eventDTO,@PathVariable String eventName){
        return eventService.updateEvent(eventMapper.mapToEntity(eventDTO),eventName);
    }

    @GetMapping("admin/{eventName}/{tcKimlik}")
    public UserDTO getApplicant(@PathVariable String eventName,@PathVariable String tcKimlik){
        return userMapper.mapToDto(eventService.getUser(eventName,tcKimlik));
    }

    @DeleteMapping("admin/{eventName}/{tcKimlik}")
    public MessageResponse deleteApplicant(@PathVariable String eventName, @PathVariable String tcKimlik){
        return eventService.deleteUser(eventName,tcKimlik);
    }

}
