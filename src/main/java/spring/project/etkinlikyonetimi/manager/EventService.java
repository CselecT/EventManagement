package spring.project.etkinlikyonetimi.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import spring.project.etkinlikyonetimi.MessageResponse;
import spring.project.etkinlikyonetimi.MessageType;
import spring.project.etkinlikyonetimi.entities.Event;
import spring.project.etkinlikyonetimi.entities.Users;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static spring.project.etkinlikyonetimi.MessageType.ERROR;
import static spring.project.etkinlikyonetimi.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsForUsers() {
        return eventRepository.findAll()
                .stream()
                .filter(event -> LocalDateTime.parse(event.getStartDate()).isAfter(LocalDateTime.now()))
                .collect(Collectors.toList());
    }

    public MessageResponse addEvent(Event event) {
        event.setApplicants(Collections.emptySet());
        if(LocalDateTime.parse(event.getStartDate()).isAfter(LocalDateTime.parse(event.getEndDate()))) return new MessageResponse("Event dates are not logical!", ERROR);
        else if(eventRepository.existsByName(event.getName())){
            return new MessageResponse("An event with the same name already exists!", ERROR);
        }
        else {
            event.setAvailablePlace(event.getCapacity());
            event.setApplicantNumber(0L);
            eventRepository.save(event);
        return new MessageResponse("Event has been added successfully!", SUCCESS);}
    }

    public MessageResponse addApplicant(Users user, String name) {

            Event event=eventRepository.findByName(name);
            if(event.availablePlace()==0) return new MessageResponse("Capacity for this event is full!", MessageType.ERROR);
            else if(event.getApplicants().stream().anyMatch(u-> u.getTcKimlikNo().equals(user.getTcKimlikNo()))){
                return new MessageResponse("This identity number is already in use!", MessageType.ERROR);
            }
            else{
                Set<Users> users=event.getApplicants();
                users.add(user);
                event.setApplicantNumber(event.getApplicantNumber()+1);
                event.setAvailablePlace(event.getAvailablePlace()-1);
                eventRepository.save(event);
                return new MessageResponse("Booking is successful!", MessageType.SUCCESS);
            }
    }

    public Set<Users> getAllUsers(String eventName) {
        Event event=eventRepository.findByName(eventName);
        return event.getApplicants();
    }

    public Event getEvent(String name) {
        return eventRepository.findByName(name);
    }

    public MessageResponse deleteEvent(String eventName) {
        if(eventRepository.existsByName(eventName)){
            eventRepository.deleteByName(eventName);
            return new MessageResponse(String.format("%s has been been deleted successfully!", eventName), SUCCESS);
        }
        else{
            return new MessageResponse(String.format("%s can't be found!",eventName), ERROR);
        }
    }

    @Transactional
    public MessageResponse updateEvent(Event event, String eventName) {
        Event oldEvent= eventRepository.findByName(eventName);
        if(LocalDateTime.parse(oldEvent.getStartDate()).isBefore(LocalDateTime.now())) return new MessageResponse("Event has already started!", ERROR);
        else if(LocalDateTime.parse(event.getStartDate()).isAfter(LocalDateTime.parse(event.getEndDate()))) return new MessageResponse("Event dates are not logical!", ERROR);
        else if(event.getCapacity()<oldEvent.getApplicantNumber()) return new MessageResponse("New capacity is not enough for current applicants!", ERROR);
        else {
            oldEvent.setName(event.getName());
            oldEvent.setDescription(event.getDescription());
            oldEvent.setCapacity(event.getCapacity());
            oldEvent.setLat(event.getLat());
            oldEvent.setLng(event.getLng());
            oldEvent.setStartDate(event.getStartDate());
            oldEvent.setEndDate(event.getEndDate());
            oldEvent.setAvailablePlace(event.getCapacity()- oldEvent.getApplicantNumber());
            eventRepository.save(oldEvent);
            return new MessageResponse("Event is updated successfully!", SUCCESS);
        }
    }

    public Users getUser(String eventName, String tcKimlik) {
        Event event=eventRepository.findByName(eventName);
        return event.getApplicants()
                .stream()
                .filter(users -> users.getTcKimlikNo().equals(tcKimlik))
                .collect(Collectors.toList()).get(0);
    }

    public MessageResponse deleteUser(String eventName, String tcKimlik) {
        Event event=eventRepository.findByName(eventName);
        if(LocalDateTime.parse(event.getStartDate()).isBefore(LocalDateTime.now())) return new MessageResponse("Event has already started!", ERROR);
        else {
            Set<Users> filteredUsers= event.getApplicants().stream().filter(users -> !users.getTcKimlikNo().equals(tcKimlik)).collect(Collectors.toSet());
            event.getApplicants().clear();
            event.getApplicants().addAll(filteredUsers);
            event.setAvailablePlace(event.getAvailablePlace()+1);
            event.setApplicantNumber(event.getApplicantNumber()-1);
            eventRepository.save(event);
            return new MessageResponse(String.format("Applicant with the identity number %s is deleted from the event!", tcKimlik), SUCCESS);
        }
    }


}
