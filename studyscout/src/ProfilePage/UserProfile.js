import React, {Component} from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import avatar from '../images/avatar.png'
import {createUser} from '../graphql/mutations'
import { Auth } from 'aws-amplify'
import API, { graphqlOperation } from '@aws-amplify/api';



class ProfilePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            EmailAddress: "",
            Password: "",
            Bio: "",
            ClassList: "",
            Joined_Cards:[],
            email:Auth.user.attributes.email,
            Profile_Pic:"",
            users:[],
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

    createUser = async () =>{
        console.log("inside create users")
       
        const {Name, email, Profile_Pic, Joined_Cards, Bio} =this.state
      
        if( Name==='') return

        try{
            
            const user = {Name, email, Bio, Profile_Pic, Joined_Cards}
            const users = [...this.state.users, user]
            this.setState({
                users, Name:'',email:'',Bio:'', Joined_Cards:'', Profile_Pic:''})
            await API.graphql(graphqlOperation(createUser, {input:user}))
                     
            user.Creator = Auth.user.attributes.email
            console.log("Name",Name)
            console.log("email",email)
            console.log("Bio",Bio)
            console.log("joined",Joined_Cards)
            console.log("profile",Profile_Pic)

         
           // console.log(card._version)
          /* Remove this line of code when we figure out how subscriptions work */
        //  window.location.reload();
        }catch(err){
            console.log('error: ', err)
        }
    }


    render() {
        return(
            <div className="Profile">
          
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
                <img src={avatar} className="profile_photo" width="200" height="200" alt={avatar}/>
                <input id="image" type="file" className="profile_photo" placeholder="Photo" capture></input> 
                </div>
            </div>
            <button type="Save" onClick={this.createUser} className="button" value="Save">Save</button>
            <button type="Cancel" className="button1" value="Cancel">Cancel</button>
        </div>
        )
    }
}
export default ProfilePage;
