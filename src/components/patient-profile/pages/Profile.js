import React, { useEffect, useState } from "react";

import axios from 'axios';
import Image from "../../doctor-profile/Image";
import "./Profile.css";
import AddPateint from '../components/forms/AddPatientProfile';
import EditPateint from '../components/forms/EditPatientProfile';
import ViewPateint from '../components/forms/ViewPatientProfile';
import { useUserContext } from "../../context/userContext";

function Profile(props) {


  const { user, logOut } = useUserContext();
  const [users, setUsers] = useState([]);
  const [listView, setProfile] = useState(false);
  const [displayVal, setDisplay] = useState("block")
  const [editing, setEditing] = useState(false);
  
  const [profileDetails,setPatient]=useState({});
  const[profilepic,setProfilePic]=useState()
  

  useEffect(()=>{
 
    async function doGetProfile() {
        let res = await axios.get(`http://localhost:8585/user/api/v1/patient/patientEmail/julie@gmail.com`);
        setPatient(res.data);
        console.log(res.data);
       
      }doGetProfile()
  },[])
  


    const addPateint = (userProfile) => {
      
      const url=`http://localhost:8585/user/api/v1/update/patientEmail/julie@gmail.com`;
    
      console.log(profileDetails+" "+profileDetails.patientPassword+" "+profileDetails.userRole);
      let addProfile={
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        age: userProfile.age,
        contactNum:userProfile.contactNo,
        height:userProfile.height,
        weight:userProfile.weight,
        bloodGroup:userProfile.blood,
        gender:userProfile.gender,
        patientEmail:profileDetails.patientEmail,
        patientPassword:profileDetails.patientPassword,
        userRole:profileDetails.userRole,
        patientImage:profilepic
      }
      console.log(addProfile);
      axios.put(url,
       addProfile).then((response)=>{
         
         
          console.log("Data: ", response.data);
          setUsers([response.data])
        });
        setProfile(true);
        setDisplay("none");

      console.log(users);
    };

    const viewPatient=(val)=>{
      setProfile(val);
      setDisplay("none")
      
  }

  const initialUser = { id: null, firstName: "", lastName: "",age:"",height:"",weight:"",blood:"",gender:""};

  const [currentUser, setCurrentUser] = useState(initialUser);

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
    console.log(user);
  };





  const updateUser = (newUser) => {
    console.log("New user"+ newUser);
          
    axios.put(`http://localhost:8585/user/api/v1/update/patientEmail/julie@gmail.com`, newUser)
    .then(response => {
      
        console.log("Data: ", response.data);
        setUsers([response.data])
    }).catch(error => {
        console.error('Something went wrong!', error);
    });

  
setCurrentUser(initialUser);
setEditing(false);
};

const uploadImg=(url)=>{
  
  console.log(url);
  setProfilePic(url);
  
};


  return (
 
    <div>
         
       <div className='container mt-5' >
       <h2 className="text-uppercase text-center">
                  View/Add Profile:
                </h2>
    
    <Image uploadImg={uploadImg}/>
  
  </div>
      <section className="vh-75 vw-75 mt-4 gradient-custom">
        <div className="container-fluid h-100">
          <div className="row h-100">
            {/* <div
              className="col-xxl-4 col-lg-3 col-xl-5 bgImg "
              style={{ zIndex: "-1", position: "relative" }}
            >
              <img
                src="https://media.istockphoto.com/vectors/happy-diverse-students-celebrating-graduation-from-school-vector-id1227151024?k=20&m=1227151024&s=612x612&w=0&h=LixPEQebppS7yyIOiGWVUwrk3sHTctZ8sb65EmXTs64=" alt=""
               
              />
            </div> */}
            
  
    {editing ? (
             
              <EditPateint
              currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
                viewPatient={viewPatient}
              />
          
         
          ) : (
            
             <div className="col-xxl-12 col-lg-9 col-xl-7 col-xs-12" style ={{display: displayVal}}>
              <AddPateint addPateint={addPateint} viewPatient={viewPatient}/>
            </div>
          )}
           {
          listView &&(
            <div className="col-xxl-12 col-lg-9 col-xl-7 col-xs-12">
            <ViewPateint
              users={users}
              viewPatient={viewPatient}
              editUser={editUser}
            />
            </div>
          )
        }
          </div>
         
        </div>
      </section>
    </div>

  );
}

export default Profile;
