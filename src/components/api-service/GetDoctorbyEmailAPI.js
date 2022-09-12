import React from 'react';
import { useUserContext } from "../context/userContext";

const GetDoctorbyEmailAPI= () => {
    const { user, logOut } = useUserContext();

    // 1
    const [users, usersSet] = React.useState([]);
  
    React.useEffect(() => {
      async function fetchDoctorDetails() {
        const fullResponse = await fetch(`http://localhost:8585/user/api/v1/doctor/doctorEmail/alex@gmail.com`);
        const responseJson = await fullResponse.json();
        
        usersSet(responseJson.data);
      }
  
      fetchDoctorDetails();
    }, []);
  
    // 2
    return [users];
  };
  export default GetDoctorbyEmailAPI;

