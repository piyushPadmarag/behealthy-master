import React,{useEffect,useState} from 'react';

function EditPatientProfile(props) {


    useEffect(() => {
        setUser(props.currentUser)
        console.log(props.currentUser);
    }, [props])


      
    const [user, setUser] = useState(props.currentUser);
  
      // const [blood, setGroupValue] = useState(props.currentUser.blood);
      // const [gender, setGender] = useState(props.currentUser.gender);
      const [formErrors, setFormErrors] = useState({});
      const [isSubmit, isSubmitted] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value});
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(setValidate(user));
        isSubmitted(true);
        props.updateUser(user);
        props.viewPatient(true);
      };
    
   
      const setValidate = (values) => {
        const errors = {};
    
        if (!values.firstName) {
          errors.firstName = "First name is required";
        }
        if (!values.lastName) {
          errors.lastName = "Last name is required";
        }
        if (!values.age) {
          errors.age = "Age is required";
        }
        if (!values.contactNo) {
          errors.contactNo = "Contact number is required";
        }
    
        if (!values.height) {
          errors.height = "Height is required";
        }
        if (!values.weight) {
          errors.weight = "Weight is required";
        }
        return errors;
      };
    
    return (
        <>
            <div className="col-xxl-12 col-lg-9 col-xl-7 col-xs-12">
              <div className="shadow-sm p-3 mb-5 bg-body rounded border-top-0 border-opacity-50">
                <h3 className="text-uppercase text-center">
                  Edit Profile:
                </h3>
                <div className="card-body p-4 p-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="form-outline">
                          <input
                          
                            id="firstName"
                            name="firstName"
                            className="form-control form-control-lg"
                            value={user.firstName}
                            onChange={handleChange}
                          />
                          <label className="form-label float-start mx-2">
                            First Name
                          </label>
                          <p className="text-danger mt-4 text-start">
                            {formErrors.firstName}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                           
                            id="lastName"
                            name="lastName"
                            className="form-control form-control-lg"
                            value={user.lastName}
                            onChange={handleChange}
                          />
                          <label className="form-label float-start mx-2">
                            Last Name
                          </label>
                          <p className="text-danger mt-4 float-start">
                            {formErrors.lastName}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="number"
                            id="age"
                            className="form-control form-control-lg"
                            name="age"
                            value={user.age}
                            onChange={handleChange}
                          />
                          <label className="form-label float-start mx-2">
                            Age
                          </label>
                          <p className="text-danger mt-2 float-start">
                            {formErrors.age}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 pb-2">
                        <div className="form-outline">
                          <select
                            className="form-select form-select-lg"
                            aria-label="Default select example"
                            defaultValue={user.gender}
                            name="gender"
                            onChange={handleChange}
                          >
                            <option value="">Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                          </select>
                          <p className="text-danger mt-2 float-start">
                            {formErrors.gender}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline w-100">
                          <input
                            type="number"
                            id="contactNo"
                            className="form-control form-control-lg"
                            name="contactNum"
                            value={user.contactNum}
                            onChange={handleChange}
                          />
                          <label className="form-label float-start mx-2">
                            Contact No
                          </label>
                          <p className="text-danger mt-4 float-start">
                            {formErrors.contactNo}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <select
                            className="form-select form-select-lg"
                            aria-label="Default select example"
                            defaultValue={user.bloodGroup}
                            name="bloodGroup"
                            onChange={handleChange}
                          >
                            <option value="">Select the Blood group</option>
                            <option value="APositive">A+</option>
                            <option value="ANegative">A-</option>
                            <option value="BPositive">B+</option>
                            <option value="BNegative">B-</option>               
                            <option value="ABPositive">AB+</option> 
                            <option value="ABNegative">AB-</option> 
                            <option value="OPositive">O+</option>
                            <option value="ONegative">O-</option>
                            <option value="other">Other</option>
                          </select>
                          <p className="text-danger mt-4 float-start">
                            {formErrors.bloodGroup}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="number"
                            id="weight"
                            className="form-control form-control-lg"
                            name="weight"
                            value={user.weight}
                            onChange={handleChange}
                          />
                          <label className="form-label float-start mx-2">
                            Weight
                          </label>
                          <p className="text-danger mt-2 float-start">
                            {formErrors.weight}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="tel"
                            id="height"
                            className="form-control form-control-lg"
                            name="height"
                            value={user.height}
                            onChange={handleChange}
                          />
                          <label className="form-label float-start mx-2">
                            Height
                          </label>
                          <p className="text-danger mt-2 float-start">
                            {formErrors.height}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 text-center">
                      <button className="btn btn-primary btn-lg">
                        Save Profile
                      </button>
                     
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </>
    );

}

export default EditPatientProfile;