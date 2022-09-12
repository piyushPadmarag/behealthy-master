package com.stackroute.appointmentService.service;

import com.stackroute.appointmentService.model.Appointment;

import java.util.List;

public interface AppointmentService {
    Appointment createAppointment(Appointment appointment);

    Appointment rescheduleAppointment(Appointment appointment);


    Appointment updateAppointmentStatusByAppointmentId(int appointmentId);

    Appointment getAppointmentById(int appointmentId);

    List<Appointment> getAllAppointmentsByPatientEmail(String patientEmail);

    List<Appointment> getAllAppointmentsByDoctorEmail(String doctorEmail);


    void deleteByAppointmentId(int appointmentId);



}
