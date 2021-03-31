import React, {Component} from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import { Link } from 'react-router-dom'


class ProfilePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            EmailAddress: "",
            Password: "",
            Bio: "",
            ClassList: "",
            options: [{name: 'ITCS-2214-011', id: 1},{name: 'ITCS-4112-012', id: 2},{name: 'ITCS-3162-001', id: 3},
                       {name: 'STAT-3150-045', ID:4},{name: 'ITIS-3130-003', id: 5}],
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
            {/* <form> */}
            <div class="row">
              <div class="column">
                <input className="display_box" type="text" name="Name" value={this.state.Name} onChange={this.handleChange} placeholder="Name"/>
                <input className="display_box" type="text" name="EmailAddress" value={this.state.EmailAddress} onChange={this.handleChange} placeholder="Email"/>
                <input className="display_box" type="text" name="Password" value={this.state.Password} onChange={this.handleChange} placeholder="Password"/>
                <textarea className="display_box1" type="text" name="Bio" value={this.state.Bio} onChange={this.handleChange} placeholder="Bio"/>
              </div>

              <div class="column">
              <h3 className="heading">Class List</h3>
              {/* <input className="display_box2" type="display" name="ClassList" value={this.state.ClassList} onChange={this.handleChange} placeholder="" /> */}
              {/* <select  className="display_box" value={this.state.drop} name="ClassList" onChange={this.handleChange}>
                   {/*<option value="">Select</option>
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
                </select> */} 
                
                <Multiselect
                options={this.state.options} 
                name="ClassList"
                selectedValues={this.state.selectedValue} 
                onSelect={this.onSelect} 
                onRemove={this.onRemove} 
                displayValue="name" 
                /> 
              </div>  
              <div class="column">
                <label class="header"></label>
                <img src="./images/avatar.png" className="profile_photo" width="200" height="200" alt="ProfilePicture"/>
                <input id="image" type="file" className="profile_photo" placeholder="Photo" capture></input> 
                </div>
            </div>
            <button type="Save" className="button" value="Save">Save</button>
            <button type="Cancel" className="button1" value="Cancel">Cancel</button>
            {/* </form> */}
        </div>
        )
    }
}
export default ProfilePage;
