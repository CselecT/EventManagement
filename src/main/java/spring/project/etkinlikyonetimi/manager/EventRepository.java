package spring.project.etkinlikyonetimi.manager;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.project.etkinlikyonetimi.entities.Event;

import javax.transaction.Transactional;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Transactional
    void deleteByName(String name);

    boolean existsByName(String name);

    Event findByName(String name);
}
