import { Alert, Calendar } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import './BookSlot.css';
import Card from 'react-bootstrap/Card';
import Chip from "@material-ui/core/Chip";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';

const BookSlot = () => {

    
    const location = useLocation();
    // location.state.email
    const [getDoctorData, setDoctorSlot] = useState([]);
    const [getSlotData, setSlotData] = useState();
    const [selectedSlot, setSlot] = useState();
    const { user, logOut } = useUserContext();
    const [description, setDescription] = useState();

    const preDate = moment(new Date()).format("DD/MM/YYYY");
    const [value, setValue] = useState(moment('2022-08-31'));
    // const [value, setValue] = useState(preDate);
    const [selectedValue, setSelectedValue] = useState(moment('2022-08-31'));
    // const [selectedValue, setSelectedValue] = useState(preDate);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [style, setStyle] = useState("cont");

    const showItem = () => {
        handleShow();
    }

    const onSelect = (newValue) => {
        //   setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const selectedDate = selectedValue.format('YYYY-MM-DD');

    const getAllData = () => {
        axios({
            method: 'get',
            url: `http://localhost:8585/user/api/v1/doctor/doctorEmail/${location.state.email}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
            .then(function (response) {
                setDoctorSlot(response.data)
            });
    }
    useEffect(() => {
        getAllData()
    }, [])

    const getAllSlots = () => {
        const jsonData = {
            doctorEmail: location.state.email,
            slotDate: selectedDate
        }

        axios({
            method: 'get',
            url: `http://localhost:8585/appointment/api/v1/slotByDate/${jsonData.slotDate}/${jsonData.doctorEmail}`,
            // url: `http://localhost:8585/appointment/api/v1/slotByDate/2022-07-24/vedant@gmail.com`,
            // url: `localhost:8585/appointment/api/v1/getAllSlots`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(function (response) {
                setSlotData(response.data)
                // const ele = response.data
                // ele.map((e) => {
                //     if (e.slotAvailability === true) {
                //         console.log(e)
                //         // setSlotData(e)
                //     }
                //     else{
                //         console.log("all slots", getSlotData);
                //     }
                // })
            });
    }
    useEffect(() => {
        getAllSlots()
    }, [selectedDate])

    const selectSlot = (data) => {
        setSlot(data);
        // setStyle("cont2");
        // event.currentTarget.classList.add('cont')
        console.log("selected slots", data)
    }
    const bookAppointment = () => {
        // localhost:8585/appointment/api/v1/saveAppointment
        console.log(selectedSlot)

        const jsonBookData = {
            doctorEmail: location.state.email,
            doctorName: getDoctorData.firstName,
            appointmentDate: selectedDate,
            appointmentStartTime: selectedSlot.appointmentStartTime,
            appointmentEndTime: selectedSlot.appointmentEndTime,
            patientEmail: user.name,
            patientDescription: description
        }
        axios.post('http://localhost:8585/appointment/api/v1/saveAppointment', jsonBookData
        ).then((response) => {
            console.log("Data: ", response.data);
            alert("Your appointment has been booked Successfully ...!");
        }).catch((err) => {
            alert("Something went wrong. Please try again ...!");
        });

        console.log(selectedSlot.slotId, selectedSlot.slotAvailability)
        axios.patch(`http://localhost:8585/appointment/api/v1/updateSlotAvailability/${selectedSlot.slotId}`,
            selectedSlot.slotAvailability = false
        ).then((response) => {
            console.log(response.data);
            // alert("Your appointment has been booked Successfully ...!");
        }).catch((err) => {
            alert("Something went wrong. Please try again ...!");
        });

    }

    return (
        <>
            {/* <div>{location.state.email}</div> */}
            {/* <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} /> */}
            <Container fluid style={{ "margin": "0px" }}>
                <Card className="my-3">
                   
                    {/* <Card.Header>
                <p>this is header</p>
                <p>this is header</p>
            </Card.Header> */}
                    <Card.Body>
                        <p><b>Name: </b>Clementina DuBuque</p>
                        <p><b>Email: </b>Rey.Padberg@gmail.com</p>
                    </Card.Body>
                    <Card.Footer className="p-3">
                        <h4>Doctor Assigned</h4>
                        <p><b>Doctor Name: </b>{getDoctorData.firstName} {getDoctorData.lastName}</p>
                        <p><b>Email: </b>{getDoctorData.doctorEmail}</p>
                    </Card.Footer>
                </Card>
            </Container>
            <Container>
                <Row className='my-5'>

                    <Col lg={8}>
                        <Alert message={`You selected date: ${selectedValue?.format('DD/MM/YYYY')}`} />
                        <Calendar value={value} fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange} />
                        {/* <CalendarView /> */}
                    </Col>
                    <Col className='m-auto'>

                        <Card>
                            <Card.Body>
                                {getSlotData && getSlotData.length > 0 && getSlotData.map((item, index) =>
                                    //    console.log(item.slotAvailability)
                                    //    selectedDate === item.date ? 
                                    item.slotAvailability == true ?
                                        <Chip key={index} label={item.appointmentStartTime + " - " + item.appointmentEndTime} 
                                        onClick={() => selectSlot(item)} /> :""
                                )}
                            </Card.Body>
                        </Card>

                        <Card className='my-5'>
                            <FloatingLabel controlId="floatingTextarea2" label="Description">
                                <Form.Control
                                    as="textarea"
                                    value={description}
                                    onChange={onChangeDescription}
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>
                        </Card>
                        <Card className='my-5'>
                            <Card.Footer>
                                <Button onClick={() => bookAppointment()}>Book slot</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose} centered>
                {/* <Modal.Header >
                    <Modal.Title style={{"margin":"auto"}}>
                    </Modal.Title> closeButton
                    
                </Modal.Header> */}
                <Modal.Body style={{ "margin": "auto" }}>
                    <Alert className='mb-3' message={"Your appointment has been saved sucessfully !"} variant="success" />
                    {/* <h6>Your appointement has been saved sucessfully!</h6> */}
                    <h1 style={{ "display": "flex", "justifyContent": "center" }}>Thank you..</h1>
                    <h1 style={{ "display": "flex", "justifyContent": "center" }}><i class="fas fa-check-circle"></i></h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BookSlot;



// “patientEmail” : String  // Primary Key
// “patientImage”:
// “patientName” : String
// “password” : String
// “patientMobile” : Long
// “patientDob”: Int
// “patientGender”:Enum
// “patientCity”: String
