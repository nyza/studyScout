
import React, {Component}from 'react'
import DateAndTimePickers from "./time_picker";

class StudyCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            topic: "",
            time: "",
            info:"",
            capacity:"",
            drop: ""
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className="study_card">
           <form>
               <h3 className="text_study">Create a new study card</h3>
               <select  className="drop_box" value={this.state.drop} name="drop" onChange={this.handleChange} >
                   <option value="" disabled>Select Class</option>
                   {
                       ["ITCS-4155", "ITCS-4325", "ITCS-5432"].map((i,j)=>{
                           return <option key={i} value={i}>{i}</option>
                       })
                   }
                </select>
                <br/>
               <input className="input_box" type="text" name="topic" value={this.state.topic} onChange={this.handleChange} placeholder="     Topic"/>
               <br/>
               <DateAndTimePickers/>
               <br/>
               <input className="input_box" type="text" name="info" value={this.state.info} onChange={this.handleChange} placeholder="     Meeting Information"/>
               <br/>
               <input className="input_box" type="text" name="capacity"value={this.state.capacity} onChange={this.handleChange} placeholder="     Number Of People"/>
               <br/>
               <input className="submit" type="submit" value="Create" />
           </form>
           </div>
        )
    }
}
export default StudyCard
