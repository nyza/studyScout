
import React, {Component}from 'react'
import { Link } from 'react-router-dom'
import {createCards} from '../graphql/mutations'
import API, { graphqlOperation } from '@aws-amplify/api';
import {onCreateCards} from '../graphql/subscriptions'
import TextField from '@material-ui/core/TextField';

class StudyCard extends Component{
    constructor(props){
        super(props);
        this.state = {
             hostName:'',
             contentName:'',
            courseName:'',
            meetingLink:'',
            date:'',
            cards:[],
            capacity:'',
           
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
    //                     )
    //                 }),
    //                 card
    //             ]
    //             this.setState([cards])
    //         }
    //     })
    // }

    // componentWillUnmount(){
    //     this.subscription.unsubscribe()
    // }
    
    createCards = async () =>{
        console.log("inside createCards")
        const {hostName, courseName, contentName, meetingLink, date,capacity} =this.state
        if( contentName==='' || meetingLink==='' ||  capacity==='' || hostName=== '' || courseName ==="" || date ==='') return
        try{
            const card = {hostName, courseName, contentName, capacity, date,meetingLink}
            const cards = [...this.state.cards, card]
            this.setState({
                cards, hostName:'',contentName:'', courseName:'', capacity:'',meetingLink:'',date:''})
            await API.graphql(graphqlOperation(createCards, {input:card}))
            
            console.log('cards created')

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
               <select  className="drop_box" value={this.state.courseName} name="courseName" onChange={this.onChange} >
                   <option value="" disabled>Select Class</option>
                   {
                       ["ITCS-4155", "ITCS-4325", "ITCS-5432"].map((i,j)=>{
                           return <option key={i} value={i}>{i}</option>
                       })
                   }
                </select>
                <br/>
               <input className="input_box" type="text" name="hostName" value={this.state.hostName} onChange={this.onChange} placeholder="     host name"/>
               <br/>
               <input className="input_box" type="text" name="contentName" value={this.state.contentName} onChange={this.onChange} placeholder="     Topic"/>
               <br/>
               <TextField   type="datetime-local" className="input_box" name="date" onChange={this.onChange} value={this.state.date} InputLabelProps={{shrink: false,}}/>
               <br/>
               <input className="input_box" type="text" name="meetingLink" value={this.state.meetingLink} onChange={this.onChange} placeholder="     Meeting Information"/>
               <br/>
               <input className="input_box"  name="capacity" value={this.state.capacity} onChange={this.onChange} placeholder="     Number Of People"/>
               <br/>
               <button className="submit">
                    <Link to='' onClick={this.createCards} style={{ color: "black",  textDecoration: 'none' }}> Create Card </Link>
               </button>
           </div>
           </div>
        )
    }
}
export default StudyCard
