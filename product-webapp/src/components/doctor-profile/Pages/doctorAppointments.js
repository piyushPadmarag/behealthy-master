import Table from 'react-bootstrap/Table';
// import logo from './logo1.png'
import './Appointment.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';


function DoctorAppointments(){
    const [appointments, setappointments] = useState([]);
    const { user, logOut } = useUserContext();
    const [type, setType] = useState("all");
    const getAll = async () => {
        // const response = await fetch(`http://localhost:8585/appointment/api/v1/getAppointmentsByPatientEmail/doctor1@gmail.com`);
        // setappointments(await response.json());
        axios({
            method : 'get',
            url : `http://localhost:8585/appointment/api/v1/getAppointmentsByDoctorEmail/${user.name}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then(function (response) {
            setappointments(response.data)
        });
    }
    
    const getpending = async () => {
        const response = await fetch('http://localhost:8001/pending');
        setappointments(await response.json());
    }
    const getcompleted = async () => {
        const response = await fetch('http://localhost:8001/completed');
        setappointments(await response.json());
    }
    const handleOnChange = (e) =>{
        setType(e.target.value);
    }
    useEffect(() => {
        if(type === "all"){
            getAll();
        } else if(type === "pending") {
            getpending();
        } else {
            getcompleted();
        }
    },[type]);

    console.log(appointments)

    const deleteAppointment = (data) => {
        axios.delete(`http://localhost:8585/appointment/api/v1/deleteAppointmentsByAppointmentId/${data.appointmentId}`).then(response => {
            console.log(response);
        });
        alert("Record Delete successfully ...!")
       //window.location.reload(); 
    }

    // useEffect(()=>{
    //     appointmentList();
    // })

    // const appointmentList=()=>{
    //     let response=axios.get(`http://localhost:8585/appointment/api/v1/getAppointmentsByPatientEmail/${user.name}`);
    //     console.log(response.data.status);
    // }

    return(
            <div className='me-5'>
             
            <div className="row" style={{ height: "5rem"}}>
                <div className="col-6" style={{ borderWidth: "4px", borderBottom:"solid", borderColor:"#CAD5E2"}}>
                    <h3 style={{ padding: "2%" ,paddingLeft: "36%"}}>0 PATIENT CONSULTED</h3>
                </div>
                <div className="col-6" style={{ borderWidth: "4px", borderBottom:"solid", borderColor:"#CAD5E2"}}>
                <h3 style={{ padding: "2%" ,paddingLeft: "27%"}}>0 COMPLETED APPOINTMENTS</h3>
                </div>
            </div>
            <div className='row' style={{borderBottomWidth: "3px", borderBottomStyle: "solid", borderBottomColor: "#CAD5E2"}}>
                <div className='col-7'>
                    <h4 style={{padding: "2%", paddingLeft:"60%"}}>LIST OF APPOINTMENTS</h4>
                </div>
                <div className='col-5' style={{padding: "1%", paddingLeft:"22%"}}>
                    <div><button type="button" className="btn btn-success">Create Slot</button></div>
                </div>
            </div>
            <div className='sorting' style={{paddingTop: "2rem"}}>
                <Container className='Container1' style={{width: "16rem"}}>
                    <Row id='ROW2' style={{position:"relative", left:"162%"}}>
                        <Col className='column1'><h4 style={{position:"relative", left:"1rem"}}>Sort by: </h4></Col>
                        <Col className='column2'>
                            <select onChange={handleOnChange} className="statusChange">
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </Col>
                    </Row>
                </Container>
            </div>
            {appointments.map((curElem)=> { 
                return(
                    <div className="page-content page-container mb-3" id="page-content">
                        <div className="padding" style={{paddingTop: "2%"}}>
                            <div className="row container d-flex justify-content-center">
                                <div className="col-lg-8 grid-margin stretch-card">
                                    <div className="card" style={{width:"123%", height:"100%"}}>
                                        <div className="card-body" style={{padding:"0"}}>
                                            <div className="table-responsive">
                                                <table className="table" style={{margin:"0"}}>
                                                    <tbody>
                                                        <tr>
                                                        {/* <td rowSpan={2} className="image"><img style={{width:"100px", position: "relative", left: "18%"}} className="rounded-circle" src={logo}></img></td> */}
                                                        <td style={{fontWeight: "bold"}}>Patient Name:</td>
                                                        <td style={{fontWeight: "bold"}}>Patient Email:</td>
                                                        <td style={{fontWeight: "bold"}}>Date:</td>
                                                        <td style={{fontWeight: "bold"}}>Timings:</td>
                                                        <td style={{fontWeight: "bold"}}>Status:</td>
                                                        </tr>
                                                        <tr>
                                                        <td>{curElem.patientName}</td>
                                                        <td>{curElem.patientEmail}</td>
                                                        <td>{curElem.appointmentDate}</td>
                                                        <td>{curElem.appointmentStartTime}-{curElem.appointmentEndTime}</td>
                                                        <td>{curElem.status}</td>
                                                        </tr>
                                                        <tr style={{borderWidth:"1px", borderStyle:"solid", borderColor: "#CAD5E2", backgroundColor: "#9c88ff", color: "white"}}>
                                                            <td></td>
                                                        <td style={{paddingLeft:"5%"}}><Button style={{"background":"none","padding":"unset","border":"none"}}>Video Consult</Button></td>
                                                        <td style={{paddingLeft: "3%"}}><Button style={{"background":"none","padding":"unset","border":"none"}}>Patient Profile</Button></td>
                                                        {/* <td>Reschedule</td> */}
                                                        {/* <td  style={{width: "20%"}}><Button style={{"background":"none","padding":"unset","border":"none"}}></Button></td> */}
                                                        <td colSpan={3} style={{paddingRight:"0"}}>
                                                            <Button style={{"background":"none","padding":"unset","border":"none"}} onClick={()=>deleteAppointment(curElem)}>Cancel</Button>
                                                        </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        
        );
}
export default DoctorAppointments