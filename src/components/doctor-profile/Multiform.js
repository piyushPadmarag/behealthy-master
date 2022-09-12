import React, { useState,useEffect } from "react";
import { Steps } from "antd";
import { Provider } from "./Multiformcontext";
import ExperienceInfo from "./ExperienceInfo";
import ClinicInfo from "./ClinicInfo";
import PersonalInfo from "./PersonalInfo";
import ListDoctorInfo from "./ListDoctorInfo";
import axios from 'axios';
import { useUserContext } from "../context/userContext";
import { BackTop, Button, Col, Row,Container } from "antd";
import Updateuser from "./Updateuser";


const { Step } = Steps;




const detailsInitialState = {
  firstName: "",
  lastName: "",
  address:"",
  contactNo:"",
  age:"",
  mail:"",
  gender:"",
  img:""
  
};

const experienceInitialState = {
  graduation: "",
  specialization: "",
  mrn: "",
  registrationYr:""
};

const clinicInitialState = {
    experience: "",
    location: "",
    hospitalName: ""
  };

const renderStep = (step) => {
  switch (step) {
    case 0:
      return <PersonalInfo />;
    case 1:
      
      return <ExperienceInfo />;
    case 2:
      return <ClinicInfo />;
    case 3:
        return <ListDoctorInfo />;
    default:
      return null;
  }
};

const Multiform = ({userPhoto}) => {
  const detailsInitialState = {
    firstName: "",
    lastName: "",
    address:"",
    contactNo:"",
    age:"",
    mail:"",
    gender:"",
    img:""
    
  };
  const [personal, setPersonal] = useState(detailsInitialState);
  const [experience, setExperience] = useState(experienceInitialState);
  const [clinic, setClinic] = useState(clinicInitialState);
 
  const [currentStep, setCurrentStep] = useState(0);
  const [oldUser, setOldUser] = useState(false);
   const [profileDetails,setProfile]=useState({});
   const { user, logOut } = useUserContext();

  useEffect(()=>{
 
    async function doGetProfile() {
        let res = await axios.get(`http://localhost:8585/user/api/v1/doctor/doctorEmail/${user.name}`);
        setProfile(res.data);
        localStorage.setItem("docImg",res.data.doctorImage);
      }doGetProfile()
  },[])

  
  
 
  const next = () => {
    if (currentStep === 3) {
      setCurrentStep(0);
      setPersonal(detailsInitialState);
      setExperience(experienceInitialState);
      setClinic(clinicInitialState)
      
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  const prev = () => setCurrentStep(currentStep - 1);
  if(oldUser){
   
    return(<>
    
     <Updateuser/>
    </>
    
   )
   
  }else 
  return (
    
    <>
    <Provider value={{ personal, setPersonal, next, prev, experience, setExperience,clinic,setClinic ,setProfile,profileDetails,userPhoto}}>
    <Steps current={currentStep}>
        <Step title={"Personal details"} />
        <Step title={"Experience details"} />
        <Step title={"Clinic details"} />
        <Step title={"View Profile details"} />
      </Steps>
     {renderStep(currentStep)}
    </Provider>
    </>
  );
};
export default Multiform;