import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService"


const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const { id } = useParams();

    const navigator = useNavigate()

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error)
            })
        }
    }, [id])


    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {

            const employee = { firstName, lastName, email }
            console.log(employee)

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator("/employees");
                }).catch(error => {
                    console.log(error)
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error =>{
                    console.log(error)
                })
            }
        }

    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors }

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        }
        else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = ''
        }
        else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = ""
        }
        else {
            errorsCopy.email = "Email is required"
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {

        if (id) {
            return <h2 className="text-center">Update Employee</h2>
        }
        else {
            return <h2 className="text-center">Add Employee</h2>
        }

    }

    return (
        <div className="container ">
            <br />
            <br />
            <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form action="">
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">First Name</label>
                                <input type="text"
                                    placeholder="Enter Your First Name"
                                    name="firstName"
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                >
                                </input>
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">Last Name</label>
                                <input type="text"
                                    placeholder="Enter Your Last Name"
                                    name="lastName"
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                >
                                </input>
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">Email</label>
                                <input type="text"
                                    placeholder="Enter Your Email"
                                    name="email"
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="text-center">
                                <button className="btn btn-success text-center" onClick={saveOrUpdateEmployee}>Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent