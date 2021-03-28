import React, { Component} from "react";
import "../App.css";

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^-_{|}`~]+@[a-zA-Z0-9-]+(?:\.[a-z-Z]+)*$/);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val == null && (valid = false);
    });

    return valid;
};

class Registration extends Component {
    constructor(props) {
        super(props);

            this.state = {
                firstName: null,
                lastName: null,
                password: null,
                email: null,
                addClass: "",
                formErrors: {
                    firstName: "",
                    lastName: "",
                    password: "",
                    email: "",
                }
            };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
            --SUBMITTING--
            First Name: ${this.state.firstName}
            Last Name: ${this.state.lastName}
            Password: $this.state.password}
            Email: $this.state.email}
            `)
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'firstName':
                formErrors.firstName =
                    value.length < 3 && value.length > 0
                        ? "minimum 3 characters required"
                        : "";
                break;
                case 'lastName':
                    formErrors.lastName =
                        value.length < 3 && value.length > 0
                            ? "minimum 3 characters required"
                            : "";
                    break;
                case 'password':
                    formErrors.password =
                        value.length < 6 && value.length > 0
                            ? "minimum 6 characters required"
                            : "";
                    break;
                case 'email':
                    formErrors.email =
                        emailRegex.test(value) && value.length > 0
                            ? ''
                            : 'invalid email address';
                    break; 
                default:
                    break;
        }

        this.setState({formErrors, [name]: value }, () => console.log(this.state)); 
    }

    render() {
        const { formErrors } = this.state;

        return (
          <div className="wrapper">
            <div className="form=wrapper">
                <h1>Registration</h1>
                <form onSubmit={this.handleSubmit} noValidate>  
                  <div className="firstName">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        className={formErrors.firstName.length > 0 ? "error" : null} 
                        placeholder="First Name" 
                        type="text" 
                        name="firstName" 
                        noValidate
                        onChange={this.handleChange}
                    />
                    {formErrors.firstName.length > 0 && (
                        <span className="errorMessage">{formErrors.firstName}</span>
                    )}
                  </div>
                  <div className="lastName">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        className= {formErrors.lastName.length > 0 ? "error" : null}
                        placeholder="Last Name" 
                        type="text" 
                        name="lastName" 
                        noValidate
                        onChange={this.handleChange}
                    />
                    {formErrors.lastName.length > 0 && (
                        <span className="errorMessage">{formErrors.lastName}</span>
                    )}
                  </div>

                  <div className="password">
                    <label htmlFor="password">Password</label>
                    <input 
                        className= {formErrors.password.length > 0 ? "error" : null}
                        placeholder="Password" 
                        type="password" 
                        name="password" 
                        noValidate
                        onChange={this.handleChange}
                    />
                    {formErrors.password.length > 0 && (
                        <span className="errorMessage">{formErrors.password}</span>
                    )}
                  </div>

                  <div className="email">
                    <label htmlFor="email">Email</label>
                    <input 
                        className={formErrors.email.length > 0 ? "error" : null}
                        placeholder="Email" 
                        type="email" 
                        name="email" 
                        noValidate
                        onChange={this.handleChange}
                    />
                    {formErrors.email.length > 0 && (
                        <span className="errorMessage">{formErrors.email}</span>
                    )}
                  </div>

                  <div className="addClass">
                      <select className="drop_box" value={this.state.drop} 
                        name="drop" onChange={this.handleChange} >
                            <option value="graptfruit">Grapefruit</option>
                            <option value="lemon">Lemon</option>
                            <option value="orange">Orange</option>
                            <option value="mango">Mango</option>
                            <option value="avocado">Avocado</option>
                        </select>

                  </div>

                  <div className="createAccount">
                      <button type="submit">Create Account</button>
                      <small>Already Have an Account?</small>
                  </div>
                </form>
            </div>
          </div>
        );

    }



}
export default Registration
