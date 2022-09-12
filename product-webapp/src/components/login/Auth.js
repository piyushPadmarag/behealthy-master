import React from "react";
import { useUserContext } from "../context/userContext";
import Login2 from "./Login2";
import PatientLanding from "../patient-profile/pateintlanding/PatientLanding";

const Auth = () => {
  const { user } = useUserContext();
  return <>{user.isGuestUser ? <Login2 /> : <PatientLanding />}</>;
};

export default Auth;