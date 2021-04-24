

import React, {Component, useState}from 'react'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { getCards, listCardss } from '../graphql/queries'
import {deleteCards} from '../graphql/mutations'
import {onDeleteCards} from '../graphql/subscriptions';
import {updateCards} from '../graphql/mutations'

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

      
    //   editCards = async (Card,) =>{
         
    //     console.log("inside edit");
    //     localStorage.setItem('cardid', Card.id);
    //     localStorage.setItem('count', Card.count);
    //     console.log("Card", Card)


    //          switch (this.state.buttonText) {
    //          case "Join Session":
    //         this.setState({buttonText:"Leave Session"});
    //         await API.graphql(graphqlOperation(updateCards, {input:{id:localStorage.getItem('cardid'), count:parseInt(localStorage.getItem('count'))+1}}))
    //         break;
    //         case "Leave Session":
    //         this.setState({buttonText:"Join Session"});
    //         if(parseInt(localStorage.getItem('count'))>0){
    //             await API.graphql(graphqlOperation(updateCards,  {input:{id:localStorage.getItem('cardid'), count:parseInt(localStorage.getItem('count'))-1}}))
    //         }
    //         break;
    //         default:

    //     }
    //     window.location.href = "/EditCard"
    // }
       
    joinCard = async (id) =>{
        console.log('join id: ', id)
        const card = await API.graphql(graphqlOperation(getCards, { id:id }))
        // console.log('pulled card: ', card)
        // console.log('pulled card: ', card.data.getCards.HostName)
        var newcount = card.data.getCards.count+1
        console.log('newcount (+1) : ', newcount)
        await API.graphql(graphqlOperation(updateCards, {input:{id:id, count:newcount}}))
        window.location.reload(false);
    } 

    leaveCard = async (id) =>{
        console.log('leave id: ', id)
        const card = await API.graphql(graphqlOperation(getCards, { id:id }))
        
        var newcount = card.data.getCards.count-1
        console.log('newcount (-1) : ', newcount)
        await API.graphql(graphqlOperation(updateCards, {input:{id:id, count:newcount}}))
        window.location.reload(false);
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

     renderButton(creator, id){
        
        if(Auth.user.attributes.email === creator) {
            return [
                    <button key="uniqueId1" className="submit" onClick={()=>  this.editCards(id)}> Edit </button>,
                    <button key="uniqueId2" className="submit" onClick={()=>  {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCards(id)}}> Remove </button>
             ] } else {
                return [
                    <button key="uniqueId3" className="submit" onClick={()=>  this.joinCard(id)}> Join </button>,
                    <button key="uniqueId4" className="submit" onClick={()=>  this.leaveCard(id)}> Leave </button>
                ]
    
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
               <h3 className="text_study" style={{paddingTop:15, fontSize:15}}>{card.Capacity - card.count} Spots Remaining</h3>

               {this.renderButton(card.Creator, card.id)}
              {/* <button className="submit" onClick={()=>  {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCards(card.id)}}> Remove </button> */}
               
            </div>
           ))}
           
           </div>
        
        )
        
    }
}
export default PopOut

// function renderButton(creator, id){
//     if(Auth.user.attributes.email === creator) {
//         return [
//                 <button key="uniqueId1" className="submit" onClick={()=>  this.editCards(id)}> Edit </button>,
//                 <button key="uniqueId2" className="submit" onClick={()=>  {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCards(id)}}> Remove </button>
//          ] } else {
//             return [
//                 <button key="uniqueId3" className="submit" onClick={()=>  this.editCards(id)}> Join </button>,
//                 <button key="uniqueId4" className="submit" onClick={()=>  this.editCards(id)}> Leave </button>
//             ]

//     }
// }

