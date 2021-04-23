

import React, {Component}from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listCardss } from '../graphql/queries'
import {deleteCards} from '../graphql/mutations'
import {onDeleteCards} from '../graphql/subscriptions';
import {updateCards} from '../graphql/mutations'
import { Auth, Amplify } from 'aws-amplify'


class PopOut extends Component{
    constructor(){
        super()
        this.state={
            cards:[],
            count:0,
            buttonText:"Join Session", 
            
     
        };
        
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
      }

      editCards = async (Card,) =>{
         
        console.log("inside edit");
        localStorage.setItem('cardid', Card.id);
        localStorage.setItem('count', Card.count);
        console.log("Card", Card)


             switch (this.state.buttonText) {
             case "Join Session":
            this.setState({buttonText:"Leave Session"});
            await API.graphql(graphqlOperation(updateCards, {input:{id:localStorage.getItem('cardid'), count:parseInt(localStorage.getItem('count'))+1}}))
            break;
            case "Leave Session":
            this.setState({buttonText:"Join Session"});
            if(parseInt(localStorage.getItem('count'))>0){
                await API.graphql(graphqlOperation(updateCards,  {input:{id:localStorage.getItem('cardid'), count:parseInt(localStorage.getItem('count'))-1}}))
            }
            break;
            default:

        }
    }
       

    async componentDidMount(){
        console.log("inside component did mount")
        try{
           
            const apiData = await API.graphql(graphqlOperation(listCardss))
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
               <h3 className="text_study" style={{paddingTop:15, fontSize:15}}>{card.count}/{card.Capacity} Spots Remaining</h3>
               <button className="submit" onClick={()=>  this.editCards(card)} > {this.state.buttonText}</button>
               <button className="submit" onClick={()=>  {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCards(card.id)}}> Remove </button>
               
               </div>
           ))}
           
           </div>
        
        )
        
    }
}
export default PopOut

