import { Button, Container, Card, Row, Col, Nav, FormControl } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './CreateSlot.css';
import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import TimePicker from 'react-time-picker';
import Chip from "@material-ui/core/Chip";
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';
import { Alert, Calendar } from 'antd';
import 'antd/dist/antd.css';
import 'react-time-picker/dist/TimePicker.css'
// import 'react-time-picker/dist/TimePicker.css';
import { useUserContext } from '../../context/userContext';
function CreatSlot() {
    // moment(new Date, 'DD-MM-YYYY').format()

    const [data, setData] = useState([]);
    const preDate = moment(new Date()).format("DD/MM/YYYY HH:MM:SS");
    const { user, logOut } = useUserContext();

    const [startDate, setStartDate] = useState(new Date());

    const currentDate = moment(startDate).format("YYYY-MM-DD");

    const [startTime, setStartTime] = useState(preDate);
    const [endTime, setEndTime] = useState(preDate);

    const start_time = moment(startTime).format("HH:MM:SS");
    const end_time = moment(endTime).format("HH:MM:SS");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const form = useRef(null)

    const handleStartTime = (e) => (
        setStartTime(e)
    )

    const handleEndTime = (e) => (
        setEndTime(e)

    )

    const clear = () =>{
        startDate = "";
        startTime = "";
        endTime   = "";
    }




    // const date = startDate.getDate() + "/" + parseInt(startDate.getMonth() + 1) + "/" + startDate.getFullYear();

    // const jsonData = {
    //     // date: currentDate,
    //     // start_time: startTime,
    //     // end_time: endTime
    //     doctorEmail: "mike@gmail.com",
    //     slotDate: currentDate,
    //     appointmentStartTime: "09:30:00",
    //     appointmentEndTime: "10:30:00"
    // }

    const submit = (e) => {
        e.preventDefault()
        const jsonData = {
            // date: currentDate,
            // start_time: startTime,
            // end_time: endTime
            doctorEmail: user.name,
            slotDate: startDate,
            appointmentStartTime: startTime,
            appointmentEndTime: endTime
        }

        // const res = axios.post("http://localhost:8585/appointment/api/v1/saveTimeslot", json, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
        // console.log(res);

        // axios.post(`http://localhost:8585/appointment/api/v1/saveTimeslot`, { json })
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //         setData(res);
        //     })

        debugger;
        axios.post('http://localhost:8585/appointment/api/v1/saveTimeslot', jsonData
        ).then((response) => {
            console.log("Data: ", response.data);
            alert("Slot created Successfully ...!");
            clear();
        }).then((err) => {
            alert("Something went wrong. Please try again ...!");
        });

        // fetch('http://localhost:3000/slots', {
        //   method: 'POST',
        //   body: JSON.stringify(json),
        //   headers: { 'Content-Type': 'application/json' },
        // })
        //   .then(res => res.json())
        //   .then(json => 
        //     setData(json)
        //     )
    }

    return (
        <div className='App' style={{
            display: 'block', padding: 30, textAlign: 'center'
        }}>
            {/* <Alert id="helpMessage" message = {`Time Slot created Successfully !`}/> */}
            <Container>
                <Nav fill variant="tabs" defaultActiveKey="/" style={{ "justifyContent": "center" }}>
                    {/* <Nav.Item>
                        <Nav.Link className='btn-stepper' style={{ "color": "black" }} as={Link} to="/">Schedule</Nav.Link>
                    </Nav.Item>{' '} */}
                    <Nav.Item style={{ "backgroundColor": "white" }}>
                        <Nav.Link className='btn-stepper' eventKey="link-2">Create Slots</Nav.Link>
                    </Nav.Item>
                </Nav>
                <div className='time-slot'>
                    {/* {data && data.length > 0 && data.map((item, index) => */}
                    <Form ref={form} onSubmit={submit}>
                        <div className="input-container my-5">
                            <div >
                                {/* value={data.startDate} */}
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) =>
                                        setStartDate(date)} />
                            </div>
                            <i className="fas fa-calendar-alt" ></i>
                        </div>
                        <Card className='time-section text-center p-4' style={{ "width": "1000px" }}>
                            <Card.Body className='mx-5'>
                                <div className='time-top my-4' >
                                    <p>Select Time</p>
                                    <Button><i className="fas fa-plus"></i></Button>
                                </div>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label=""
                                    className="mb-4"
                                >
                                    <TimePicker type="time" onChange={handleStartTime} value={startTime} />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label=""
                                    className="mb-4"
                                >
                                    <TimePicker onChange={handleEndTime} value={endTime} />
                                </FloatingLabel>
                               
                                <Button className="button my-3" type='submit' variant="success">CREATE SLOT</Button>
                            </Card.Body>
                        </Card>
                    </Form>
                    {/* )} */}
                </div>
            </Container>
        </div>
    )
}

export default CreatSlot;
