package com.stackroute.appointmentService.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalTime;


@Document(collection="Appointment")
@Setter
@Getter
@NoArgsConstructor
@ToString
public class Appointment{


    @Transient
    public static final String Sequence_Name = "Appointment_Sequence";

    public Appointment(int appointmentId, String doctorEmail, String doctorName, LocalDate appointmentDate, LocalTime appointmentStartTime, LocalTime appointmentEndTime, String patientEmail, String patientDescription, Status status) {
        this.appointmentId = appointmentId;
        this.doctorEmail = doctorEmail;
        this.doctorName = doctorName;
        this.appointmentDate = appointmentDate;
        this.appointmentStartTime = appointmentStartTime;
        this.appointmentEndTime = appointmentEndTime;
        this.patientEmail = patientEmail;
        this.patientDescription = patientDescription;
        this.status = status;
    }

    @Id
    private int appointmentId;
    private String doctorEmail;

    private String doctorName;

    private LocalDate appointmentDate;

    private LocalTime appointmentStartTime;

    private LocalTime appointmentEndTime;

    private int slotId;
    private String patientEmail;
    private String patientDescription;

    private Status status;
}
