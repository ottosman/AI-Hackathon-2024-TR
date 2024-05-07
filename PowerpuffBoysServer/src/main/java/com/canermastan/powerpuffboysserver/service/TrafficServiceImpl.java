package com.canermastan.powerpuffboysserver.service;

import com.canermastan.powerpuffboysserver.entity.TrafficEntity;
import com.canermastan.powerpuffboysserver.repository.TrafficRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class TrafficServiceImpl implements TrafficService{

    private final TrafficRepository trafficRepository;

    public TrafficServiceImpl(TrafficRepository trafficRepository) {
        this.trafficRepository = trafficRepository;
    }

    @Override
    public TrafficEntity save(TrafficEntity trafficEntity) {
        return trafficRepository.save(trafficEntity);
    }

    @Override
    public List<TrafficEntity> findAll() {
        return trafficRepository.findAll();
    }

    @Override
    public List<TrafficEntity> findLast50Data() {
        return List.of();
    }

    @Override
    public List<TrafficEntity> findByDate(LocalDate date) {
        return trafficRepository.findByDate(date);
    }

    @Override
    public List<TrafficEntity> findByTime(LocalTime time) {
        return trafficRepository.findByTime(time);
    }

    @Override
    public List<TrafficEntity> findByIntersection(String intersection) {
        return trafficRepository.findByIntersection(intersection);
    }

    @Override
    public List<TrafficEntity> findByDateAndTime(LocalDate date, LocalTime time) {
        return trafficRepository.findByDateAndTime(date, time);
    }

    @Override
    public List<TrafficEntity> findByDateAndIntersection(LocalDate date, String intersection) {
        return trafficRepository.findByDateAndIntersection(date, intersection);
    }

    @Override
    public List<TrafficEntity> findByTimeAndIntersection(LocalTime time, String intersection) {
        return trafficRepository.findByTimeAndIntersection(time, intersection);
    }

    @Override
    public List<TrafficEntity> findByDateAndTimeAndIntersection(LocalDate date, LocalTime time, String intersection) {
        return trafficRepository.findByDateAndTimeAndIntersection(date, time, intersection);
    }


}
