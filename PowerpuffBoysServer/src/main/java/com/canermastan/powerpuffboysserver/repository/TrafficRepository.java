package com.canermastan.powerpuffboysserver.repository;

import com.canermastan.powerpuffboysserver.entity.TrafficEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TrafficRepository extends JpaRepository<TrafficEntity, Long> {
    @Query("SELECT t FROM TrafficEntity t ORDER BY t.id DESC LIMIT 50")
    List<TrafficEntity> findLast50Data();

    List<TrafficEntity> findByDate(LocalDate date);

    List<TrafficEntity> findByTime(LocalTime time);

    List<TrafficEntity> findByIntersection(String intersection);

    List<TrafficEntity> findByDateAndTime(LocalDate date, LocalTime time);

    List<TrafficEntity> findByDateAndIntersection(LocalDate date, String intersection);

    List<TrafficEntity> findByTimeAndIntersection(LocalTime time, String intersection);

    List<TrafficEntity> findByDateAndTimeAndIntersection(LocalDate date, LocalTime time, String intersection);
}
