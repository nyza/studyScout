import React, {Component}from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listCardss } from '../graphql/queries'
import {deleteCards} from '../graphql/mutations'
import {onDeleteCards} from '../graphql/subscriptions';
import { Auth } from 'aws-amplify'


class MyStudyCards extends Component{
    constructor(){
        super()
        this.state={
            cards:[],
            counter:0,
            buttonText:"Join Session"
        }
    }

    handleClick = () => {
      
        switch (this.state.buttonText) {
          case "Join Session":
            this.setState({buttonText:"Leave Session"});
            this.setState({counter:this.state.counter+1})
            break;
          default:
            this.setState({buttonText:"Join Session"});
            this.setState({counter:this.state.counter-1})
            break;
        }
      };

    async componentDidMount(){
        console.log("inside component did mount")
        try{
           // changed the query
           // listCardss(filter: {Creator: {contains: }})
            const apiData = await API.graphql(graphqlOperation(listCardss, {
                filter: {
                    Creator: {
                        eq: Auth.user.attributes.email
                    }
                }
            }))
            console.log(apiData)


            const response = apiData.data.listCardss.items
           console.log(response)
            this.setState({
                cards:response
            })
        }catch(err){
            console.log('error : ', err)
        }

    }
    editCards = async (id) =>{
        if( id==='') return
        try{
            console.log("inside edit");
            localStorage.setItem('cardid', id);
            console.log(localStorage.getItem('cardid'));
            window.location.href = "/EditCard"
        }catch(err){
            console.log('error: ', err)
        }
    }

    deleteCards = async  (id) =>{
        if( id==='') return
        try{
            console.log("inside delete");
            console.log(id);
            //console.log();
            const input = {id};
            const newCardArray  = this.state.cards.filter(card => card.id !==id );
            this.state.cards= [newCardArray]
          await API.graphql(graphqlOperation(deleteCards, {input:input}));
          /* Remove this line of code when we figure out how subscriptions work */
          window.location.reload();
        }catch(err){
            console.log('error: ', err)
        }
    }

    render(){
      
        return(
            <div >
               {this.state.cards.map((card, i)=>(
                <div key={i} className="container2">
               <h3 className="text_study">{card.CourseName}</h3>
               <h3 className="text_study">{card.ContentName}</h3>
               <h3 className="text_study">Hosted by {card.HostName}</h3>
               {/* <h3 className="text_study">Hosted by {card.Creator}</h3> */}
               <h3 className="text_study">{card.Time}</h3>
               <h3 className="text_study">Meeting Link:</h3>
               <h3 className="text_study">{card.MeetingInfo}</h3>
               <h3 className="text_study" style={{paddingTop:15, fontSize:15}}>{this.state.counter}/{card.Capacity} Spots Remaining</h3>
              {/* Edit Button */}
             {/*  <button className="submit" onClick> Edit </button> */}
             <button className="submit" onClick={()=>  this.editCards(card.id)}> Edit </button>
              {/* <button className="submit" onClick={this.handleClick} > {this.state.buttonText}</button> */}
               <button className="submit" onClick={()=>  {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCards(card.id)}}> Remove </button>
               
               </div>
           ))}
           
           </div>
        
        )
        
    }
}
export default MyStudyCards