import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import GetPatientProfile from "../../api-service/GetPatientProfile";
import './PatientNavbar.css'

function PatientNavBar(props) {
  const [patientusers] = GetPatientProfile();
  return (
    <>
         <div className="text-center">
              <img src={patientusers.patientImage} style={{"width":"250px"}}></img> 
             <div className="p-4">
          
           
             </div>
             <hr/>
             <div style={{"color":"blue"}}>
            
             </div>
         <div className="p-4" style={{"padding":"10px"}}>
             {/* <i className="fa fa-file" aria-hidden="true"></i>  */}
             <Nav defaultActiveKey="/" className="flex-column">
             <Nav.Link as={Link} to="appointment">
             <div style={{"display":"flex","flexDirection":"row"}}>
             <i className="fas fa-file-alt"></i>
             <p>View Appointment</p>
             </div>
               </Nav.Link>
             <Nav.Link eventKey="link-1" as={Link} to="bookslot">
             <div style={{"display":"flex","flexDirection":"row"}}>
             <i className="fas fa-file-alt"></i>
             <p>Create Slots</p>
             </div>
             </Nav.Link>
             <Nav.Link eventKey="link-1" as={Link} to="profile">
             <div style={{"display":"flex","flexDirection":"row"}}>
             <i className="far fa-user-circle"></i>
             <p>View your profile</p>
             </div>
             </Nav.Link>
             <Nav.Link eventKey="link-2" as={Link} to="availabledoctors">
             <div style={{"display":"flex","flexDirection":"row"}}>
             <i className="fas fa-info-circle"></i>
             {/* <i class="fas fa-search"></i> */}
             <p>Book Appointment</p>
             </div>
             </Nav.Link>
             </Nav>
            
             </div>
    </div>
    </>
   );
}

export default PatientNavBar;