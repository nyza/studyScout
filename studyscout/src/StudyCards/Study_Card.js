import React, {Component}from 'react'
import { Link } from 'react-router-dom'
import {createCards} from '../graphql/mutations'
import API, { graphqlOperation } from '@aws-amplify/api';
import {onCreateCards} from '../graphql/subscriptions'
import TextField from '@material-ui/core/TextField';
import { Auth, Amplify } from 'aws-amplify'

class StudyCard extends Component{
   
    constructor(props){
        super(props);
        this.state = {
            HostName:'',
            ContentName:'',
            CourseName:'',
            MeetingInfo:'',
            Time:'',
            count:0,
            cards:[],
            Capacity:'',
            Creator:Auth.user.attributes.email,
        };
         this.onChange = this.onChange.bind(this);

    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
      }

    // async componentDidMount(){
    //     this.subscription = API.graphql(graphqlOperation(onCreateCards)).subscribe({
    //         next: cardsDate => {
    //             const card = cardsDate.value.data.onCreateCards
    //             const cards = [
    //                 ...this.state.cards.filter(r => {
    //                     return(
    //                         r.hostName !== card.hostName && r.courseName !== card.courseName &&
    //                         r.cotentName !== card.cotentName && r.meetingLink !== card.meetingLink
    //                         && r.date !== card.date && r.capacity !== card.capacity 
    //        //         }
    //     })
    // }

    // componentWillUnmount(){
    //     this.subscription.unsubscribe()
    // }             )
    //                 }),
    //                 card
    //             ]
    //             this.setState([cards])
    
    
    createCards = async () =>{
        console.log("inside createCards")
       
        const {HostName, CourseName, ContentName, MeetingInfo, Time,Capacity,count, Creator} =this.state
      
        if( ContentName==='' || MeetingInfo==='' ||  Capacity=== '' || HostName=== '' || CourseName ==="" || Creator ==='') return

        try{
            
            const card = {HostName, CourseName, ContentName,count, Capacity, Time,MeetingInfo, Creator}
            const cards = [...this.state.cards, card]
            this.setState({
                cards, HostName:'',ContentName:'', CourseName:'', Capacity:'',MeetingInfo:'',Time:'', Creator:'', count:''})

            card.count=1
            card.Creator = Auth.user.attributes.email
            await API.graphql(graphqlOperation(createCards, {input:card}))
            console.log("host",HostName)
            console.log("Topic",ContentName)
            console.log("class",CourseName)
            console.log("Meetin",MeetingInfo)
            console.log("Time",Time)
            console.log("Capacity",Capacity)
            console.log("creator", Creator)
            console.log("count", count)
            console.log('cards created')

        // DELAY HERE
     
        window.location.href = "/"
                
        }catch(err){
            console.log('error: ', err)
        }
    }


    render(){
        console.log("inside new create card render")
        return(
            <div>
            <div className="study_card">
               <h3 className="text_study">Create a new study card</h3>
               <select  className="drop_box" value={this.state.CourseName} name="CourseName" onChange={this.onChange} >
                   <option value="" disabled>Select Class</option>
                   {
                       ["ECGR-3183", "ECGR-4146", "ITCS-3145", "ITCS 3166", "ITCS-3688", "ITCS-4155", "ITCS-4325", "ITCS-5432", "ITIS-3200", "MATH-2164", "STAT-2122"].map((i,j)=>{
                           return <option key={i} value={i}>{i}</option>
                       })
                   }
                </select>
                <br/>
               <input className="input_box" type="text" name="HostName" value={this.state.HostName} onChange={this.onChange} placeholder="     host name"/>
               <br/>
               <input className="input_box" type="text" name="ContentName" value={this.state.ContentName} onChange={this.onChange} placeholder="     Topic"/>
               <br/>
               <TextField   type="datetime-local" className="input_box" name="Time" onChange={this.onChange} value={this.state.Time} InputLabelProps={{shrink: false,}}/>
               <br/>
               <input className="input_box" type="text" name="MeetingInfo" value={this.state.MeetingInfo} onChange={this.onChange} placeholder="     Meeting Information"/>
               <br/>

               <input className="input_box" type="number" name="Capacity" value={this.state.Capacity} onChange={this.onChange} placeholder="     Number Of People"/>
               <br/>
               <button className="submit" onClick={this.createCards} > Create Card </button>
               
           </div>
           </div>
        )
    }
}
export default StudyCard