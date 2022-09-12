import React, { useState,useEffect } from 'react';
import { useUserContext } from "../context/userContext";


const GetPatientProfileAPI = () => {
    const { user, logOut } = useUserContext();

    // 1
    const [patientusers, usersSet] = useState([]);
  
    useEffect(() => {
      async function fetchPatientDetails() {
        const fullResponse = await fetch(`http://localhost:8585/user/api/v1/patient/patientEmail/julie@gmail.com`);
        const responseJson = await fullResponse.json();
        console.log(responseJson);
        usersSet(responseJson);
      }
  
      fetchPatientDetails();
    }, []);
  
    // 2
  
    
    return [patientusers];
  };
  export default GetPatientProfileAPI;

