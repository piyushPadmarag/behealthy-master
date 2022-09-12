import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './DoctorsList.css';
import ListGroup from 'react-bootstrap/ListGroup';
import { React, useState, useEffect, state, handleCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function DoctorsList(props) {

    const navigate = useNavigate();
    const [wordEntered, setWordEntered] = useState("");

    const bookSlot = (data) => {
        navigate('/patientpro/bookslot', 
        { state: {"email":data} });
    }

    const [data, setData] = useState([]);

    const [selectedData, setSelectedData] = useState([]);

    // const [selectedDoc, setSelectedDoc] = useState([]);
   

    const getData = () => {

        axios({
                method : 'get',
                url:'http://localhost:8585/user/api/v1/doctor/getAllDoctor',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                setData(response.data)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    // const delete_records = () => {
    //     console.log(profileSelectedData);
    //     profileSelectedData.splice(1, 1);
    // }
    const getSelectedData = () => {

        // fetch(`http://localhost:8585/user/api/v1/doctor/doctorEmail/doctor1@gmail.com`
        //     , {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         }
        //     }
        // )
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then(function (myJson) {
        //         setSelectedData(myJson)
        //     });
    }
    useEffect(() => {
        getSelectedData()
    }, [])



    // async function addProfile(list) {
    //     let res = await axios.get(`http://localhost:8585/user/api/v1/doctor/doctorEmail/${list.doctorEmail}`);
    //     setSelectedData(res.data);
    //     console.log(res.data);
    //   }


    const addProfile = (list) => {

        axios({
                method : 'get',
                url : `http://localhost:8585/user/api/v1/doctor/doctorEmail/${list.doctorEmail}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                setSelectedData(response.data)
            });
    }


  
    return (
        <>
            <div>
                <Container fluid>

                    {/* <InputGroup className="my-3">
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-search"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Search by Doctors"
                            aria-label="Username"
                            aria-describedby="basic-addon1" 
                        />
                    </InputGroup> */}
                    <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between" }}>
                        <div style={{ "marginRight": "40px" }}>

                            <Row>
                                {data && data.length > 0 && data.map((item, index) =>
                                    <Col key={index}>
                                        <Card className='card-profile mb-3' style={{ "width": "25rem" }}>
                                            <Card.Header as="h5">{item.specialization}</Card.Header>
                                            <Card.Body style={{ "display": "flex", "flexDirection": "row" }}>
                                                <div className=' profile-header1'>
                                                    <Card.Img src='https://doctors.fortishealthcare.com/uploads/1db1d482-893e-4d14-9e42-3720d036a957_180521122231/picture/dr.%20vivek%20jha%20jpeg.jpg' style={{ "width": "150px", "height": "100%", "marginRight": "10px" }} />
                                                    {/* <Card.Img src='./../Images/doctor1.jpg' style={{"width":"150px","height":"100%","marginRight":"10px"}}/> */}
                                                </div>
                                                <div style={{ "width": "100%", "textAlign": "left", "margin": "auto 0px" }}>
                                                    <Card.Title>Dr.{item.firstName} {item.lastName}</Card.Title>
                                                    <Card.Text>
                                                        <b>Email:</b> {item.doctorEmail}<br />
                                                        <b>Experience:</b> {item.yearOfExperience} year
                                                    </Card.Text>
                                                    <Button variant="primary"
                                                        className='footer-btn'
                                                        onClick={() => addProfile(item)}
                                                        style={{ "float": "right" }}>View</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                )}
                            </Row>
                            {/* <Pagination className='my-5'>
                                <Pagination.First />
                                <Pagination.Prev />
                                <Pagination.Item>{1}</Pagination.Item>
                                <Pagination.Item>{2}</Pagination.Item>
                                <Pagination.Ellipsis />
                                <Pagination.Next />
                                <Pagination.Last />
                            </Pagination> */}
                        </div>
                        <div>

                            {/* key={index,index1} */}

                            <Row>


                                {/* // data.map((item1, index1) => */}
                                {/* // item1.id == 1 ?
                                            // item1.id == item2.id ? */}
                                {/* {selectedData.forEach((item, index) =>)} */}
                                                {/* {JSON.stringify(selectedData).length > 0 ?  */}
                                { JSON.stringify(selectedData) !== '[]' ? 
                                <Col lg={12}>
                                    <Card className="text-center" style={{ width: '28rem' }}>
                                        <Card.Header>{selectedData.Speciality}</Card.Header>
                                        <Card.Body>
                                            <div className='profile-header'>
                                                <div className='img m-2'>
                                                    <Card.Img src='https://doctors.fortishealthcare.com/uploads/1db1d482-893e-4d14-9e42-3720d036a957_180521122231/picture/dr.%20vivek%20jha%20jpeg.jpg' />
                                                </div>
                                                <div className='img-content my-3 mx-3'>
                                                    <h4 style={{ "lineHeight": "0px" }}>{selectedData.firstName}</h4>
                                                    <p><b>Age: </b>({selectedData.age}year)</p>
                                                    <p><b>Email:</b> {selectedData.doctorEmail}</p>
                                                    <p><b>Mobile No:</b> {selectedData.contactNo}</p>
                                                    <div >
                                                        {/* <div><p><b>Age: </b>{selectedData.age}</p></div> */}
                                                        <div><p><b>Gender:</b> {selectedData.gender}</p></div>
                                                    </div>

                                                </div>
                                            </div>
                                            <hr />
                                            <ListGroup className="listgroup my-2">
                                                <ListGroup.Item>
                                                    {/* <b>Qualification</b> */}
                                                    <table style={{ "width": "100%" }}>
                                                        <tbody>
                                                            <tr>
                                                                <th style={{ "width": "50%" }}>Specialization</th>
                                                                <td>{selectedData.specialization}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    {/* <b>Qualification</b> */}
                                                    <table style={{ "width": "100%" }}>
                                                        <tbody>
                                                            <tr>
                                                                <th style={{ "width": "50%" }}>Qualification</th>
                                                                <td>{selectedData.graduation}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    {/* <b>Year of Experience</b> */}
                                                    <table style={{ "width": "100%" }}>
                                                        <tbody>
                                                            <tr>
                                                                <th style={{ "width": "50%" }}>Year of Experience</th>
                                                                <td>{selectedData.yoe} years of Exp.</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    {/* <b>Hospital Location</b> */}
                                                    <table style={{ "width": "100%" }}>
                                                        <tbody>
                                                            <tr>
                                                                <th style={{ "width": "50%" }}>City</th>
                                                                <td>{selectedData.hospitalLocation}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    {/* <b>Hospital Location</b> */}
                                                    <table style={{ "width": "100%" }}>
                                                        <tbody>
                                                            <tr>
                                                                <th style={{ "width": "50%" }}>Hospital</th>
                                                                <td>{selectedData.hospitalName}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </ListGroup.Item>
                                                {/* <ListGroup.Item>
                                                    <h6><b>Decription</b></h6>
                                                    <p>
                                                        We're here to help whenever you feel ill, nut keeping you healthy is our better priority.
                                                    </p>
                                                </ListGroup.Item> */}
                                            </ListGroup>
                                        </Card.Body>
                                        <Card.Footer className="text-muted"><Button variant="primary" onClick={() => bookSlot(selectedData.doctorEmail)} dataParentToChild={selectedData}>Book a Slot</Button></Card.Footer>
                                        <Card.Footer className="text-muted">
                                        {/* <Button variant="primary" dataParentToChild={selectedData}>
                                        <Link to={{pathname:`/patientpro/bookslot`, data:selectedData.doctorEmail}} 
                                        className="nav-link active fs-5 mx-2 ">Book a Slot</Link></Button>*/}
                                        </Card.Footer> 
                                        {/* <Card.Footer className="text-muted"><Button variant="primary" onClick={() => bookSlot(item2)}><Link to="/bookslot">Book a Slot</Link></Button></Card.Footer> */}
                                    </Card>
                                </Col>:""}
                                {/* // : ""

                                        // ) */}
                                        {/* <Link to={{pathname:`/patientpro/bookslot:${selectedData.doctorEmail}`, data:selectedData.doctorEmail}}  */}

                            </Row>
                        </div>
                    </div>



                </Container>
            </div>
        </>
    )
}

export default DoctorsList

// need installation
// npm i react-paginate@0.5.1
// npm i axios
