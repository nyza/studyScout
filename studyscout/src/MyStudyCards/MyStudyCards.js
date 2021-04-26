import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getCards, listUsers, listCardss } from '../graphql/queries'
import { deleteCards, updateCards, updateUser } from '../graphql/mutations'
import { onDeleteCards } from '../graphql/subscriptions';
import { Auth } from 'aws-amplify'

class MyStudyCards extends Component {
    constructor() {
        super()
        this.state = {
            cards: [],
            cards2: [],
            counter: 0,
            buttonText: "Join Session"
        }
    }

    async componentDidMount() {
        console.log("inside component did mount")
        try {
            // query a list of all the cards that the user has created
            const apiData = await API.graphql(graphqlOperation(listCardss, {
                filter: {
                    Creator: {
                        eq: Auth.user.attributes.email
                    }
                }
            }))
            const response = apiData.data.listCardss.items
            console.log("response",response)
            this.setState({
                cards: response
            })
            // query a list of the user's Joined_Cards []
            const userEmail = Auth.user.attributes.email
            const returnedUser = await API.graphql(graphqlOperation(listUsers, {
                filter: {
                    email: {
                        eq: userEmail
                    }
                }
            }))
            var arrayList = returnedUser.data.listUsers.items[0].Joined_Cards
            // query all the cards
            const cardList = await API.graphql(graphqlOperation(listCardss))
            const arrayLength = cardList.data.listCardss.items.length
            // FOR each card compare to Joined_Cards[0,1,2,3]
            var addarray = []
            if(arrayLength !== 0){
                for (var i = 0; i < arrayLength; i++){
                    var tempid = cardList.data.listCardss.items[i].id
                    if (arrayList.includes(tempid)){
                       var tempcard = await API.graphql(graphqlOperation(getCards, { id: tempid }))
                        addarray.push(tempcard.data.getCards)
                    }
                }
            }
            const response2 = apiData.data.listCardss.items
            this.setState({
                cards2: addarray
            })
        } catch (err) {
            console.log('error : ', err)
        }

    }
    editCards = async (id) => {
        if (id === '') return
        try {
            localStorage.setItem('cardid', id);
            window.location.href = "/EditCard"
        } catch (err) {
            console.log('error: ', err)
        }
    }

    deleteCards = async (id) => {
        if (id === '') return
        try {
            const input = { id };
            const newCardArray = this.state.cards.filter(card => card.id !== id);
            this.state.cards = [newCardArray]
            await API.graphql(graphqlOperation(deleteCards, { input: input }));
            window.location.reload();
        } catch (err) {
            console.log('error: ', err)
        }
    }

    joinCard = async (id) => {

        const card = await API.graphql(graphqlOperation(getCards, { id: id }))
        const userEmail = Auth.user.attributes.email
        const returnedUser = await API.graphql(graphqlOperation(listUsers, {
            filter: {
                email: {
                    eq: userEmail
                }
            }
        }))
        var arrayList = returnedUser.data.listUsers.items[0].Joined_Cards
        if (arrayList === null) {
            arrayList = [];
        }
        if (arrayList.includes(id)) {
            //true
           window.confirm('You have alread joined this card')
        } else {
            //false
            arrayList.push(id);
            await API.graphql(graphqlOperation(updateUser, { input: { id: returnedUser.data.listUsers.items[0].id, Joined_Cards: arrayList } }))
            var newcount = card.data.getCards.count + 1
            await API.graphql(graphqlOperation(updateCards, { input: { id: id, count: newcount } }))
            window.location.reload(false);
        }
    }

    leaveCard = async (id) => {
        const card = await API.graphql(graphqlOperation(getCards, { id: id }))
        const userEmail = Auth.user.attributes.email
        const returnedUser = await API.graphql(graphqlOperation(listUsers, {
            filter: {
                email: {
                    eq: userEmail
                }
            }
        }))

        var arrayList = returnedUser.data.listUsers.items[0].Joined_Cards

        if (arrayList === null || !arrayList.includes(id)) {
            window.confirm('You have not joined this card')
        } else {
            arrayList.pop(id)
        
            //Update Joined_Cards

            await API.graphql(graphqlOperation(updateUser, { input: { id: returnedUser.data.listUsers.items[0].id, Joined_Cards: arrayList } }))

            //Update count

            const card = await API.graphql(graphqlOperation(getCards, { id: id }))
    
            var newcount = card.data.getCards.count - 1

            await API.graphql(graphqlOperation(updateCards, { input: { id: id, count: newcount } }))
            window.location.reload(false);

        }
    }

    renderButton(creator, id) {

        if (Auth.user.attributes.email === creator) {
            return [
                <button key="uniqueId1" className="submit" onClick={() => this.editCards(id)}> Edit </button>,
                <button key="uniqueId2" className="submit" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCards(id) }}> Remove </button>
            ]
        } else {
            return [
                <button key="uniqueId3" className="submit" onClick={() => this.joinCard(id)}> Join </button>,
                <button key="uniqueId4" className="submit" onClick={() => this.leaveCard(id)}> Leave </button>
            ]
        }
    }

    render() {

        return (
       
            <div >
                     <h1>My Study Cards</h1>
                <h2>Created Cards:</h2>
                {this.state.cards.map((card, i) => (
                    <div key={i} className="container2">
                        <h3 className="text_study">{card.CourseName}</h3>
                        <h3 className="text_study">{card.ContentName}</h3>
                        <h3 className="text_study">Hosted by {card.HostName}</h3>
                        <h3 className="text_study">{card.Time}</h3>
                        <h3 className="text_study">Meeting Link:</h3>
                        <h3 className="text_study">{card.MeetingInfo}</h3>
                        <h3 className="text_study" style={{ paddingTop: 15, fontSize: 15 }}>{card.Capacity-card.count} Spots Remaining</h3>
                        {this.renderButton(card.Creator, card.id)}
                    </div>
                ))}
            <h2>Joined Cards:</h2>
                {this.state.cards2.map((card, i) => (
                    <div key={i} className="container2">
                        <h3 className="text_study">{card.CourseName}</h3>
                        <h3 className="text_study">{card.ContentName}</h3>
                        <h3 className="text_study">Hosted by {card.HostName}</h3>
                        <h3 className="text_study">{card.Time}</h3>
                        <h3 className="text_study">Meeting Link:</h3>
                        <h3 className="text_study">{card.MeetingInfo}</h3>
                        <h3 className="text_study" style={{ paddingTop: 15, fontSize: 15 }}>{card.Capacity-card.count} Spots Remaining</h3>
                        {this.renderButton(card.Creator, card.id)}
                    </div>
                ))}
            </div>
        )
    }
}
export default MyStudyCards