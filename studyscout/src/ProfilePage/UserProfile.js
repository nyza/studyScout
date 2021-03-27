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
        this.handleSave=this.handleSave.bind(this)
    }

    handleSave(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="UserProfile">
                <form>
               <input className="display_box" type="text" name="Name" value={this.state.Name} onSave={this.handleSave} placeholder="Name"/>
               <br/>
               <input className="display_box" type="text" name="Email Address" value={this.state.EmailAddress} onSave={this.handleSave} placeholder="Email Address"/>
               <br/>
               <input className="input_box" type="text" name="Password" value={this.state.Password} onSave={this.handleSave} placeholder="Password"/>
               <br/>
               <input className="input_box" type="text" name="Bio" value={this.state.Bio} onSave={this.handleSave} placeholder="User Bio"/>
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

