import React, { useContext } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input,InputNumber} from "formik-antd";
import MultiformContext from "./Multiformcontext";

const ClinicInfo = () => {
    const { clinic, setClinic, next, prev,profileDetails } = useContext(MultiformContext);



    return (
      <Formik
      enableReinitialize={true}
      initialValues={profileDetails }
        onSubmit={(values) => {
          setClinic(values);
          
          next();
         
        }}
        validate={(values) => {
          const errors = {};
          if (!values.yoe) errors.yoe = "Experience is required";
          if (!(values.yoe<50 && values.yoe>0)) errors.yoe = "Provide valid experience";
          if (!values.hospitalLocation) errors.hospitalLocation = "Location is required";
          if (!(/^[a-zA-Z](\s?[a-zA-Z]){2,16}$/).test(values.location)) errors.location="Provide valid location";   
          if (!values.hospitalName) errors.hospitalName = "Hospital name is required";
          if (!(/^[a-zA-Z](\s?[a-zA-Z]){2,16}$/).test(values.hospitalName)) errors.hospitalName="Provide valid Hospital/clinic name";   
          return errors;
        }}
      >
        {({ handleSubmit, errors }) => {
          return (
            <>
             <div className={"details__wrapper"}>
            <div className="container">
              <div className="row">
                <div className="col-xxl-6 leftImg">
                  <img src="https://media.istockphoto.com/vectors/happy-diverse-students-celebrating-graduation-from-school-vector-id1227151024?k=20&m=1227151024&s=612x612&w=0&h=LixPEQebppS7yyIOiGWVUwrk3sHTctZ8sb65EmXTs64=" className="rounded" style={{position:'relative',bottom:'67px',right:'80px'}}></img>
                </div>
                <div className="col-xxl-6 col-sm-12 col-xs-12">
                <h3>Clinic Details:</h3>
                <div className="row">
             <div className="col-md-6">
               <div className={`form__item ${errors.yoe && "input__error"}`}>
                 <label>Experience</label>
                 <Input name={"yoe"}  className="form-control"/>
                 <p className={"error__feedback"}>{errors.yoe}</p>
               </div>
             </div>
             <div className="col-md-6">
               <div className={`form__item ${errors.hospitalLocation && "input__error"}`}>
                 <label>Hospital/Clinic Location</label>
                 <Input name={"hospitalLocation"}  className="form-control"/>
                 <p className={"error__feedback"}>{errors.hospitalLocation}</p>
               </div>
             </div>
           </div>
           <div className="row">
            
             <div className="col-md-6">
               <div className={`form__item ${errors.hospitalName && "input__error"}`}>
               <label>Hospital/Clinic Name</label>
               <Input name={"hospitalName"}  className="form-control"/>
                        
                 <p className={"error__feedback"}>{errors.hospitalName}</p>
               </div>
               <div
             className={"form__item button__items d-flex justify-content-end"}
            >
              <Button type={"default"} onClick={prev} className="mx-3">
                Back
              </Button>
              <Button type={"primary"} onClick={handleSubmit}>
                Next
              </Button>
            </div>
             </div>
           </div>
                </div>





         
           </div>
       
           </div>
         </div>


        
            </>
          );
        }}
      </Formik>
    );
};

export default ClinicInfo;
