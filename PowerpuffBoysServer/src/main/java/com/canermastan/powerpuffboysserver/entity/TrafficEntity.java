package com.canermastan.powerpuffboysserver.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "traffic")
public class TrafficEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "vehicle_count")
    private Integer vehicleCount;
    @Column
    private LocalTime time;
    @Column @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDate date;
    @Column
    private String intersection;

    public TrafficEntity() {

    }

    public TrafficEntity(Long id, Integer vehicleCount, LocalTime time, LocalDate date, String intersection) {
        this.id = id;
        this.vehicleCount = vehicleCount;
        this.time = time;
        this.date = date;
        this.intersection = intersection;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getIntersection() {
        return intersection;
    }

    public void setIntersectionName(String intersection) {
        this.intersection = intersection;
    }

    public Integer getVehicleCount() {
        return vehicleCount;
    }

    public void setVehicleCount(Integer vehicleCount) {
        this.vehicleCount = vehicleCount;
    }
}
