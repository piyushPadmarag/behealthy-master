import React, { useEffect,useState } from 'react';
import { BackTop, Button, Col, Row } from "antd";
import axios from 'axios';
import { useUserContext } from "../context/userContext";
import Container from 'react-bootstrap/Container';
import Loading from '../common/Loading';
import EditDoctorProfile from './EditDoctorProfile';
function Updateuser(props) {
    const [formValues,setProfile]=useState({});
  
    const { user, logOut } = useUserContext();
    useEffect(()=>{
 
        async function doGetProfile() {
            let res = await axios.get(`http://localhost:8585/user/api/v1/doctor/doctorEmail/${user.name}`);
            setProfile(res.data);
          
           
          }doGetProfile()
      },[])

      let handleEdit=()=>{
       
        return (
        <>
         <EditDoctorProfile/>
        </>
       )
      }
      

    return (
        <div className="mt-5">
     
        <Container fluid className="">
        <h1 className="mb-5">Profile Details:</h1>
          <Row>
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">First Name:<span className="fw-light"> {formValues.firstName}</span></p></Col>
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">Last Name:<span className="fw-light"> {formValues.lastName}</span></p></Col>
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">Address:<span className="fw-light"> {formValues.address}</span></p></Col>
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">Age:<span className="fw-light"> {formValues.age}</span></p></Col>
          </Row>
          <Row className="mt-5">
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">Contact No:<span className="fw-light"> {formValues.contactNo}</span></p></Col>
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">Graduation:<span className="fw-light"> {formValues.graduation}</span></p></Col>
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">Specialization:<span className="fw-light"> {formValues.specialization}</span></p></Col>
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">MRN:<span className="fw-light"> {formValues.mrn}</span></p></Col>
          </Row>
          <Row className="mt-5">
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">Registration Year:<span className="fw-light"> {formValues.yearOfRegistration}</span></p></Col>
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">Experience:<span className="fw-light"> {formValues.yoe} years</span></p></Col>
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">Clinic location:<span className="fw-light"> {formValues.hospitalLocation}</span></p></Col>
            <Col xl={6} xs={12}> <p className="fs-4 fw-semibold">Clinic Name:<span className="fw-light"> {formValues.hospitalName}</span></p></Col>
          </Row>
          <Row className="mt-3">
            <Col> </Col>      
          </Row>
          <Button type={"primary"} onClick={handleEdit}>
                  Edit
          </Button>
        </Container>
    
      </div>
    );
}

export default Updateuser;