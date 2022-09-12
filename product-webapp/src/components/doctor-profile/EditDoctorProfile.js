import React, { useState } from 'react';
import { BackTop, Button, Col, Row } from "antd";
import MultiformContext from "./Multiformcontext";
import axios from 'axios';
import { Formik } from "formik";
import Container from 'react-bootstrap/Container';
import { useUserContext } from "../context/userContext";
import { Input } from "formik-antd";
import { Select } from "antd";

function EditDoctorProfile(props) {
    const[formValues,setUpdateValue]=useState({});
    const { user, logOut } = useUserContext();
    const { Option } = Select;
    return (
        <div>
                  <Formik
      enableReinitialize={true}
        initialValues={formValues }
        onSubmit={(values) => {
         console.log(values);

         const url=`http://localhost:8585/user/api/v1/doctor/update/doctorEmail/${user.name}`;
         axios.put(url,values
          ).then((res)=>{
             console.log(res);
             setUpdateValue(res.data);
            
           });
         
        }}
      
        validate={(values) => {
          const errors = {};
          if (!values.firstName) errors.firstName = "First Name is required";
          if (!(/^[a-zA-Z](\s?[a-zA-Z]){2,16}$/).test(values.firstName)) errors.firstName="Provide valid first name"   
          if (!values.lastName) errors.lastName = "Last Name is required";
          if (!(/^[a-zA-Z](\s?[a-zA-Z]){2,16}$/).test(values.lastName)) errors.lastName="Provide valid first name"
          if (!values.address) errors.address = "Address is required";
          if (!values.age) errors.age = "Age is required";
         // if (!values.gender) errors.gender = "Gender is required";
          if(!(values.age<100 && values.age>18)) errors.age="provide valid age";
          if (!values.contactNo) errors.contactNo = "Contact Number is required";
          if(!(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(values.contactNo)))  errors.contactNo = "Provide valid mininum 10 number";
          if (!values.graduation) errors.graduation = "Graduation is required";
          if (!values.specialization) errors.specialization = "Specialization is required";
          if(!(/^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/.test(values.mrn)))  errors.mrn = "Provide valid 12 number"
          if (!values.yearOfRegistration) errors.yearOfRegistration = "Year of Registration is required";
          if (!(values.yearOfRegistration>1950 && values.yearOfRegistration<2021)) errors.yearOfRegistration = "Provide valid registration year";
          if (!values.yoe) errors.yoe = "Experience is required";
          if (!(values.yoe<50 && values.yoe>0)) errors.experience = "Provide valid experience";
          if (!values.hospitalLocation) errors.hospitalLocation = "Location is required";
          if (!(/^[a-zA-Z](\s?[a-zA-Z]){2,16}$/).test(values.hospitalLocation)) errors.hospitalLocation="Provide valid location";   
          if (!values.hospitalName) errors.hospitalName = "Hospital name is required";
          if (!(/^[a-zA-Z](\s?[a-zA-Z]){2,16}$/).test(values.hospitalName)) errors.hospitalName="Provide valid Hospital/clinic name";   
          return errors
        }}
      >
        {({ handleSubmit, errors,values }) => {
          return (
          
            <div className={"details__wrapper"}>
              <div className="container">
                <div className="row">
            
                  <div className="col-xxl-12">
                     <h3>Edit Profile:</h3>
                  <div className="row">
                 
                  <div className="col-md-3">
                 
                  <div className={`form__item ${errors.firstName && "input__error"}`}>
                    <label>FirstName</label>
                    <Input name={"firstName"} className="form-control" />
                    <p className={"error__feedback"}>{errors.firstName}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={`form__item ${errors.lastName && "input__error"}`}>
                    <label>LastName</label>
                    <Input name={"lastName"}  className="form-control"/>
                    <p className={"error__feedback"}>{errors.lastName}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={`form__item ${errors.address && "input__error"}`}>
                    <label>Address</label>
                    <Input name={"address"}  className="form-control"/>
                    <p className={"error__feedback"}>{errors.address}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={`form__item ${errors.age && "input__error"}`}>
                    <label>Age</label>
                    <Input name={"age"}  className="form-control"/>
                    <p className={"error__feedback"}>{errors.age}</p>
                  </div>
                </div>
                
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className={`form__item ${errors.gender && "input__error"}`}>
                    <label>Ge</label>
                    <Select
            name={"gender"}
           
            style={{ width: 120 }}
          
        >
          <Option value="MALE">Male</Option>
          <Option value="FEMALe">Female</Option>
        </Select>       
                    <p className={"error__feedback"}>{errors.gender}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={`form__item ${errors.contactNo && "input__error"}`}>
                  <label>Contact Number</label>
                  <Input name={"contactNo"}  className="form-control"/>
                           
                    <p className={"error__feedback"}>{errors.contactNo}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={`form__item ${errors.name && "input__error"}`}>
                  <label>Graduation</label>
                  <Input name={"graduation"}  className="form-control"/>
                           
                    <p className={"error__feedback"}>{errors.graduation}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={`form__item ${errors.name && "input__error"}`}>
                  <label>MRN</label>
                  <Input name={"mrn"}  className="form-control"/>
                           
                    <p className={"error__feedback"}>{errors.mrn}</p>
                  </div>
                </div>
              </div>
  
            
              <div className="row">
                <div className="col-md-2">
                  <div className={`form__item ${errors.specialization && "input__error"}`}>
                    <label>Specialization</label>
                    <Input name={"specialization"}  className="form-control"/>
                    <p className={"error__feedback"}>{errors.specialization}</p>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={`form__item ${errors.yearOfRegistration && "input__error"}`}>
                  <label>Year of Registartion</label>
                  <Input name={"yearOfRegistration"}  className="form-control"/>
                           
                    <p className={"error__feedback"}>{errors.yearOfRegistration}</p>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={`form__item ${errors.name && "input__error"}`}>
                  <label>Year of Experience</label>
                  <Input name={"yoe"}  className="form-control"/>
                           
                    <p className={"error__feedback"}>{errors.yoe}</p>
                  </div>

                  
                </div>
                <div className="col-md-3">
                 
                <div className={`form__item ${errors.hospitalName && "input__error"}`}>
               <label>Hospital/Clinic Name</label>
               <Input name={"hospitalName"}  className="form-control"/>
                        
                 <p className={"error__feedback"}>{errors.hospitalName}</p>
               </div>

                  
                </div>


                <div className="col-md-3">
                  <div className={`form__item ${errors.name && "input__error"}`}>
                  <label>Hospital Location</label>
                  <Input name={"hospitalLocation"}  className="form-control"/>
                           
                    <p className={"error__feedback"}>{errors.hospitalLocation}</p>
                  </div>
                </div>
              </div>
              <div
                className={"form__item button__items d-flex justify-content-end"}
              >
                <Button type={"primary"} onClick={handleSubmit}>
                  Edit
                </Button>
                </div>
              </div>
                    </div>
                </div>
              </div>
      
              
            
        
           
          );
        }}
      </Formik>
        </div>
    );
}

export default EditDoctorProfile;