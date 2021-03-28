

import React, {Component}from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listCardss } from '../graphql/queries'
import {deleteCards} from '../graphql/mutations'
import {onDeleteCards} from '../graphql/subscriptions';




class PopOut extends Component{
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
        try{
            const apiData = await API.graphql(graphqlOperation(listCardss))
            const response = apiData.data.listCardss.items
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
            const input = {id};
            const newCardArray  = this.state.cards.filter(card => card.id !==id);
            this.state.cards= [newCardArray]
          await API.graphql(graphqlOperation(deleteCards, {input:input}));

        }catch(err){
            console.log('error: ', err)
        }
    }

    
    render(){
      
        return(
            <div >
               {this.state.cards.map((card, i)=>(
                <div key={i} className="container2">
               <h3 className="text_study">{card.courseName}</h3>
               <h3 className="text_study">{card.contentName}</h3>
               <h3 className="text_study">Hosted by {card.hostName}</h3>
               <h3 className="text_study">{card.date}</h3>
               <h3 className="text_study">Meeting Link:</h3>
               <h3 className="text_study">{card.meetingLink}</h3>
               <h3 className="text_study" style={{paddingTop:15, fontSize:15}}>{this.state.counter}/{card.capacity} Spots Remaining</h3>
               <button className="submit" onClick={this.handleClick} > {this.state.buttonText}</button>
               <button className="submit" onClick={()=> this.deleteCards(card.id)}> Remove </button>
               
               </div>
           ))}
           
           </div>
        
        )
        
    }
}
export default PopOut

