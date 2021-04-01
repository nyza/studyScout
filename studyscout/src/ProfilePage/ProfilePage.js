import React, {Component} from 'react'
import { Multiselect } from 'multiselect-react-dropdown';

class ProfilePage extends Component{
    constructor(props) {
        super(props);
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
        return(
            <div className="Profile">
           <form>
            <div class="row">
              <div class="column">
                <input className="display_box" type="text" name="Name" value={this.state.Name} onChange={this.handleChange} placeholder="Name"/>
                <input className="display_box" type="text" name="EmailAddress" value={this.state.EmailAddress} onChange={this.handleChange} placeholder="Email"/>
                <input className="display_box" type="text" name="Password" value={this.state.Password} onChange={this.handleChange} placeholder="Password"/>
                <input className="display_box1" type="text" name="Bio" value={this.state.Bio} onChange={this.handleChange} placeholder="Bio"/>
              </div>

              <div class="column">
              <h3 className="heading">Class List</h3>
              <input className="display_box2" type="display" name="ClassList" value={this.state.ClassList} onChange={this.handleChange} placeholder="" />
                <select  className="display_box" value={this.state.drop} name="ClassList" onChange={this.handleChange}>
                   <option value="">Select</option>
                   {
                       ["ITCS-2214", 
                        "ITCS-4112", 
                        "ITCS-3162",
                        "STAT-3150",
                        "ITIS-3130"]
                        .map((i,j)=>{
                            return <option key={i} value={i}>{i}</option>
                        })
                   }
                </select>
              </div>    
            </div>
            </form>
        </div>
        )
    }
}
export default ProfilePage;