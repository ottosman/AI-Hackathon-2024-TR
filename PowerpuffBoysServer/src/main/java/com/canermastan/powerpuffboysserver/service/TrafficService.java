package com.canermastan.powerpuffboysserver.service;

import com.canermastan.powerpuffboysserver.entity.TrafficEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface TrafficService {

    TrafficEntity save(TrafficEntity trafficEntity);

    List<TrafficEntity> findAll();
    List<TrafficEntity> findLast50Data();

    List<TrafficEntity> findByDate(LocalDate date);

    List<TrafficEntity> findByTime(LocalTime time);

    List<TrafficEntity> findByIntersection(String intersection);

    List<TrafficEntity> findByDateAndTime(LocalDate date, LocalTime time);

    List<TrafficEntity> findByDateAndIntersection(LocalDate date, String intersection);

    List<TrafficEntity> findByTimeAndIntersection(LocalTime time, String intersection);

    List<TrafficEntity> findByDateAndTimeAndIntersection(LocalDate date, LocalTime time, String intersection);
}
