import React, { useContext } from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import './Sidebar.css'
import { useUserContext } from "../context/userContext";
import MultiStepFormContext from "../doctor-profile/Multiformcontext";
import useUsers from '../api-service/GetDoctorProfile';


function Sidebar(props) {
  const { user, logOut } = useUserContext();
  const { profileDetails } = useContext(MultiStepFormContext);
  const [users] = useUsers();

  if(!user.name===undefined){
    var username=user.name.substring(0, user.name.lastIndexOf("@"))}
    else{
      var username=" ";
    }
    return (
      <>
           <div className="text-center">
               {/* <img src={myImage} style={{"width":"250px"}}></img> */}
               <div className="p-4">
             <i className="far fa-user-circle my-3" style={{"fontSize":"100px"}}></i>
             
               <p><b>Email :</b> {user.name}</p>
               </div>
               <hr/>
               <div style={{"color":"blue"}}>
              
               </div>
           <div className="p-4" style={{"padding":"10px"}}>
               {/* <i className="fa fa-file" aria-hidden="true"></i>  */}
               <Nav defaultActiveKey="/" className="flex-column">
               <Nav.Link as={Link} to="viewslot">
               <div style={{"display":"flex","flexDirection":"row"}}>
               <i className="fas fa-file-alt"></i>
               <p>View Slots</p>
               </div>
                 </Nav.Link>
               <Nav.Link eventKey="link-1" as={Link} to="createslot">
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
               <Nav.Link eventKey="link-2" as={Link} to="viewappointment">
               <div style={{"display":"flex","flexDirection":"row"}}>
               <i className="fas fa-info-circle"></i>
               {/* <i class="fas fa-search"></i> */}
               <p>View Appointments</p>
               </div>
               </Nav.Link>
               </Nav>
              
               </div>
      </div>
      </>
     );
   }

    


export default Sidebar;
