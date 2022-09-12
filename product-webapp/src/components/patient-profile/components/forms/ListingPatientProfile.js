import axios from "axios"
import React, { useEffect, useState } from "react"
import GetPatientProfile from "../../../api-service/GetPatientProfile"


const ListingPatientProfile = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [patientusers] = GetPatientProfile();

//   const fetchData = () => {
//     setIsLoading(true)
//     fetch("http://localhost:8585/user/api/v1/patient/patientEmail/asdf@gmail.com")
//       .then(response => {
//         return response.json()
//       })
//       .then(data => {
//         setIsLoading(false)
//         setUsers(data)
//       },5000)
//   }


  if(isLoading){
    return "hello"
  }
  if(users.length>0){
    return (
        <div>
         
         {
                    patientusers.length>0?(
                        patientusers.map((user)=>{
                            const {id, firstName,contactNum,lastName,age,height,weight,bloodGroup,gender} = user;
                            return(
                               
                                <div key={id} className="shadow-sm p-3 mb-5 bg-body rounded border-top-0 border-opacity-25">
                                  <h2 className="text-uppercase text-center">
                                    View Profile:
                                  </h2>
                                  <div className="card-body p-4 p-md-5">
                                    <form >
                                      <div className="row">
                                        <div className="col-md-6 ">
                                          <div className="form-outline">
                                          <h4 className="h3 text-primary">
                                          First Name:
                                            </h4>
                                            <h4 className='text-bold'>
                                             
                                              {firstName}
                                            </h4>
                                          
                                          </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                          <div className="form-outline">
                                          <h4 className="h3">
                                          Last Name:
                                            </h4>
                                            <h4 className='text-bold'>
                                             
                                              {lastName}
                                            </h4>
                                           
                                          </div>
                                        </div>
                                      </div>
                                
                                      <div className="row">
                                        <div className="col-md-3 mb-4 pb-2">
                                          <div className="form-outline">
                                          <h4 className="h3">
                                          Age:
                                            </h4>
                                            <h4 className='text-bold'>
                                             
                                              {age}
                                            </h4>
                                            
                                          </div>
                                        </div>
                                        <div className="col-md-3 mb-4 pb-2">
                                          <div className="form-outline">
                                          <h4 className="h3">
                                          Gender:
                                            </h4>
                                            <h4 className='text-bold'>
                                             
                                              {gender}
                                            </h4>
                                           
                                          </div>
                                        </div>
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                          <div className="form-outline w-100">
                                          <h4 className="h3">
                                          Contact Number:
                                            </h4>
                                            <h4 className='text-bold'>
                                             
                                              {contactNum}
                                            </h4>
                                          </div>
                                        </div>
                                      </div>
                                
                                      <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                          <div className="form-outline">
                                          <h4 className="h3">
                                         Blood Group:
                                            </h4>
                                            <h4 className='text-bold'>
                                             
                                              {bloodGroup}
                                            </h4>
                                           
                                          </div>
                                        </div>
                                        <div className="col-md-3 mb-4 pb-2">
                                          <div className="form-outline">
                                          <h4 className="h3">
                                          Weight:
                                            </h4>
                                            <h4 className='text-bold'>
                                             
                                              {weight}
                                            </h4>
                                          </div>
                                        </div>
                                        <div className="col-md-3 mb-4 pb-2">
                                          <div className="form-outline">
                                          <h4 className="h3">
                                         Height:
                                            </h4>
                                            <h4 className='text-bold'>
                                             
                                              {height}
                                            </h4>
                                            
                                          </div>
                                        </div>
                                      </div>
                                
                                      {/* <div className="mt-4 pt-2 text-center">
                                        <button className="btn btn-info btn-lg" onClick={() => {props.editUser(id, user) ; props.viewPatient(false)}}>
                                          Edit Profile
                                        </button>
                                       
                                      </div> */}
                                    </form>
                                  </div>
                                </div>
                             
                                
                                
                            )
                        })
                    ):(
                        <li>no user found</li>
                    )
                }
               
        </div>
      )
  }

}

export default ListingPatientProfile
