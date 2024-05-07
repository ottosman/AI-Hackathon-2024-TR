package com.canermastan.powerpuffboysserver.api;

import com.canermastan.powerpuffboysserver.entity.TrafficEntity;
import com.canermastan.powerpuffboysserver.repository.TrafficRepository;
import com.canermastan.powerpuffboysserver.service.TrafficService;
import jakarta.annotation.Nullable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TrafficApi {
    private final TrafficService trafficService;

    public TrafficApi(TrafficService trafficService) {
        this.trafficService = trafficService;""
    }

    @PostMapping("/save")
    public ResponseEntity<TrafficEntity> save(@RequestBody TrafficEntity trafficEntity){
        return new ResponseEntity<TrafficEntity>(trafficService.save(trafficEntity), HttpStatus.CREATED);
    }

    @GetMapping("/findLast50Data")
    public ResponseEntity<List<TrafficEntity>> findLast50Data(){
        return new ResponseEntity<List<TrafficEntity>>(trafficService.findLast50Data(), HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<List<TrafficEntity>> findData(
            @RequestParam(value = "date", required = false) @DateTimeFormat(pattern = "dd.MM.yyyy") LocalDate date,
            @RequestParam(value = "time", required = false) @DateTimeFormat(pattern = "HH:mm") LocalTime time,
            @RequestParam(value = "intersection", required = false) String intersection) {

        if (date == null && time == null && intersection == null) {
            return ResponseEntity.ok(trafficService.findAll());
        }

        if (date != null && time == null && intersection == null) {
            return ResponseEntity.ok(trafficService.findByDate(date));
        }

        if (date == null && time != null && intersection == null) {
            return ResponseEntity.ok(trafficService.findByTime(time));
        }

        if (date == null && time == null && intersection != null) {
            return ResponseEntity.ok(trafficService.findByIntersection(intersection));
        }

        if (date != null && time != null && intersection == null) {
            return ResponseEntity.ok(trafficService.findByDateAndTime(date, time));
        }

        if (date != null && time == null && intersection != null) {
            return ResponseEntity.ok(trafficService.findByDateAndIntersection(date, intersection));
        }

        if (date == null && time != null && intersection != null) {
            return ResponseEntity.ok(trafficService.findByTimeAndIntersection(time, intersection));
        }

        if (date != null && time != null && intersection != null) {
            return ResponseEntity.ok(trafficService.findByDateAndTimeAndIntersection(date, time, intersection));
        }

        return ResponseEntity.badRequest().build();
    }
}
