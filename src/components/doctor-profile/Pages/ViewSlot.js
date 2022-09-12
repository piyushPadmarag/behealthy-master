import { React, useState, useEffect, state, handleCallback, useRef } from 'react';
import './CreateSlot.css';
import 'rsuite/styles/index.less';
import 'rsuite/dist/rsuite.min.css'
import { DatePicker } from 'antd';
import { Timeline } from 'rsuite';
import { Button, Container, Row, Col, Card, Nav, Form } from 'react-bootstrap';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';
import { Link } from 'react-router-dom';
import { Alert, Calendar } from 'antd';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import TimePicker from 'react-time-picker';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';
function ViewSlot() {

    // Modal Hooks
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { user, logOut } = useUserContext();

    // Time picker Hooks
    const [value, setValue] = useState(moment('07/13/2022'));
    const [selectedValue, setSelectedValue] = useState(moment('07/13/2022'));
    const preDate = moment(new Date()).format("DD/MM/YYYY HH:MM:SS A");

    const [startDate, setStartDate] = useState(new Date());

    const currentDate = moment(selectedValue).format("YYYY-MM-DD");

    const [startTime, setStartTime] = useState(preDate);
    const [endTime, setEndTime] = useState(preDate);

    const [updateSlots, setUpdatedSlot] = useState([]);

    const form = useRef(null)

    // state = {
    //     persons: []
    // }



    // data to fetch from JSON
    const [data, setData] = useState([]);

    const getData = () => {

        //     // fetch('http://localhost:3000/slots'
        //     //     , {
        //     //         headers: {
        //     //             'Content-Type': 'application/json',
        //     //             'Accept': 'application/json'
        //     //         }
        //     //     }
        //     // )
        //     //     .then(function (response) {
        //     //         return response.json();
        //     //     })
        //     //     .then(function (myJson) {
        //     //         console.log(myJson);
        //     //         setData(myJson)
        //     //     });
        //     // axios.get('localhost:8585/appointment/api/v1/saveTimeslot')
        //     //     .then(res => {
        //     //         const list = res.data;
        //     //         console.log(list);
        //     //     })
        const jsonData1 = {
            // date: currentDate,
            // start_time: startTime,
            // end_time: endTime
            doctorEmail: user.name,
            slotDate: currentDate
        }
        // debugger;
        axios({
            method: 'get',
            url: `http://localhost:8585/appointment/api/v1/slotByDate/${jsonData1.slotDate}/${jsonData1.doctorEmail}`,
            // url: `http://localhost:8585/appointment/api/v1/slotByDate/2022-07-24/vedant@gmail.com`,
            // url: `localhost:8585/appointment/api/v1/getAllSlots`,
            responseType: 'stream'
        })
            .then(function (response) {
                const persons = response.data;
                setData(persons)
            });
    }

    useEffect(() => {
        getData()
    }, [currentDate])

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const handleStartTime = (e) => (
        setStartTime(e)
    )
    const handleEndTime = (e) => (
        setEndTime(e)
    )
    const jsonData = {
        // date: currentDate,
        start_time: startTime,
        end_time: endTime
    }
    const editItem = (list) => {
        handleShow();
        setUpdatedSlot(list);
    }

    
    const editJSONdata = {
        appointmentStartTime: startTime,
        appointmentEndTime: endTime,
    }
    const submit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8585/appointment/api/v1/updateTimeslot/${updateSlots.slotId}`, editJSONdata)
        .then(response => {
            console.log(response);
        }).catch(err => console.log(err));
          alert("Record Updated successfully ...!")
         // window.location.reload();
    }

    //   setResults(newArray);
    //   console.log(newArray);

    // const deleteItem = (e) => {
    //     console.log(e)
    //     // axios({
    //     //     method : 'delete',
    //     //     url: `https://localhost:8585/appointment/api/v1/deleteTimeslot/${e.slotId}`
    //     // }).then(res => {
    //     //       console.log(res);
    //     //       console.log(res.data);
    //     // })
    //     // axios.delete(`https://localhost:8585/appointment/api/v1/deleteTimeslot/${e.slotId}`)
    //     // .then(res => {
    //     //   console.log(res);
    //     //   console.log(res.data);
    //     // })
    //     // getData();
    // }

    // useEffect(() => {
    //     // DELETE request using axios with async/await
    //     async function deleteItem(e) {
    //         await axios.delete(`https://localhost:8585/appointment/api/v1/deleteTimeslot/${e.slotId}`);
    //         alert('Delete successful');
    //     }
    //     deleteItem();
    // }, []);




    const deleteItem = (id) => {
        // Whatever you want to do with that item
        axios.delete(`http://localhost:8585/appointment/api/v1/deleteTimeslot/${id}`).then(response => {
            console.log(response);

        });
        alert("Record Delete successfully ...!")
      //  window.location.reload();  
    }

    const selectedDate = selectedValue.format('YYYY-MM-DD');

    return (
        <div style={{
            display: 'block', padding: 30, textAlign: 'center'
        }}>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Slots</Modal.Title>
                </Modal.Header>
                <Form ref={form} onSubmit={submit}>
                    <Modal.Body>
                        <div className='my-3'>
                            <h6>Start Time</h6>
                            <TimePicker onChange={handleStartTime} value={startTime} />
                        </div>
                        <div className='my-3'>
                            <h6>End Time</h6>
                            <TimePicker onChange={handleEndTime} value={endTime} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary" >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Container>
                <Nav fill variant="tabs" defaultActiveKey="/" style={{ "justifyContent": "center" }}>
                    {/* <Nav.Item>
                        <Nav.Link className='btn-stepper' style={{ "color": "black" }} as={Link} to="/">Schedule</Nav.Link>
                    </Nav.Item>{' '} */}
                    <Nav.Item style={{ "backgroundColor": "white" }}>
                        <Nav.Link className='btn-stepper' eventKey="link-2">Scheduled Slots</Nav.Link>
                    </Nav.Item>
                </Nav>
                <p id='alert-msg' style={{ "display": "none" }}>sucess!!!</p>
                <Row className='my-5'>
                    <Col lg={6} className="mb-3">
                        {/* updateParentTime={updateParentTime}  */}
                        {/* <CalendarView /> */}
                        <Alert message={`You selected date: ${selectedValue?.format('DD/MM/YYYY')}`} />
                        <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
                    </Col>
                    <Col lg={6}>
                        <Timeline>

                            {/* {list.users.map((data, key) => {
                                console.log(data); */}
                            {/* // return <h1 key={key}>{data}</h1>; key={key.id}*/}
                            {
                                // data && data.length > 0 && Object.entries(data).map(([key, value]) => ({key, value}) =>
                                data && data.length > 0 && data.map((item, index) =>
                                    // console.log("JSON Date",item.slotDate,selectedDate),
                                    // console.log("Calendar Date",selectedDate)

                                    selectedDate == item.slotDate ? <Timeline.Item key={index}>
                                        <Card>
                                            <Card.Body>
                                                <Button className='btn-card' variant="primary"
                                                    onClick={() => deleteItem(item.slotId)}><i className="fas fa-trash"></i></Button>
                                                <Button className='btn-card' variant="primary"
                                                    onClick={() => editItem(item)}><i className="fas fa-pen"></i></Button>

                                                <Card.Subtitle>{item.slotDate}</Card.Subtitle>
                                                <Card.Text>{item.appointmentStartTime} - {item.appointmentEndTime}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Timeline.Item>
                                        : ""

                                    // <Timeline.Item key={index}>
                                    // <Card >
                                    //     <Card.Body className='text-center'>
                                    //         <h4>No Records are available</h4>
                                    //     </Card.Body>
                                    // </Card>
                                    // </Timeline.Item>

                                )
                            }
                            {/* <Button className='btn-card' variant="primary" onClick={handleShow}><i className="fas fa-pen"></i></Button> */}
                        </Timeline>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ViewSlot;
