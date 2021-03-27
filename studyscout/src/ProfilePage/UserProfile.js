import React, {Component} from 'react'

class UserProfile extends Component{
    constructor(props) {
        super(props)

        this.state = {
            Name: "",
            EmailAddress: "",
            Password: "",
            Bio: "",
            ClassList: "",
        };
        this.handleChange=this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="UserProfile">
                <form>
               <input className="display_box" type="text" name="Name" value={this.state.Name} onChange={this.handleChange} placeholder="Name"/>
               <br/>
               <input className="display_box" type="text" name="Email Address" value={this.state.EmailAddress} onChange={this.handleChange} placeholder="Email Address"/>
               <br/>
               <input className="input_box" type="text" name="Password" value={this.state.Password} onChange={this.handleChange} placeholder="Password"/>
               <br/>
               <input className="input_box" type="text" name="Bio" value={this.state.Bio} onChange={this.handleChange} placeholder="User Bio"/>
               <br/>
               <input className="Submit" type="Submit" value="Save" />
               <br/>
               <input className="Submit" type="Submit" value="Cancel" />
                </form>
            </div>
        )
    }

}

export default UserProfile

