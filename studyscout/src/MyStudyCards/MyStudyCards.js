import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listCardss } from '../graphql/queries'
import { deleteCards } from '../graphql/mutations'
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
            this.setState({
                cards: response
            })

            // query a list of the user's Joined_Cards []

            // query all the cards

            // FOR each card compare to Joined_Cards[0,1,2,3]

            //If match found then push to list


            const apiData2 = await API.graphql(graphqlOperation(listCardss, {
                filter: {
                    Creator: {
                        eq: Auth.user.attributes.email
                    }
                }
            }))
        } catch (err) {
            console.log('error : ', err)
        }

    }
    editCards = async (id) => {
        if (id === '') return
        try {
            console.log("inside edit");
            localStorage.setItem('cardid', id);
            console.log(localStorage.getItem('cardid'));
            window.location.href = "/EditCard"
        } catch (err) {
            console.log('error: ', err)
        }
    }

    deleteCards = async (id) => {
        if (id === '') return
        try {
            console.log("inside delete");
            console.log(id);
            //console.log();
            const input = { id };
            const newCardArray = this.state.cards.filter(card => card.id !== id);
            this.state.cards = [newCardArray]
            await API.graphql(graphqlOperation(deleteCards, { input: input }));
            /* Remove this line of code when we figure out how subscriptions work */
            window.location.reload();
        } catch (err) {
            console.log('error: ', err)
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
                <h2>Created Cards:</h2>
                {this.state.cards.map((card, i) => (
                    <div key={i} className="container2">
                        <h3 className="text_study">{card.CourseName}</h3>
                        <h3 className="text_study">{card.ContentName}</h3>
                        <h3 className="text_study">Hosted by {card.HostName}</h3>
                        <h3 className="text_study">{card.Time}</h3>
                        <h3 className="text_study">Meeting Link:</h3>
                        <h3 className="text_study">{card.MeetingInfo}</h3>
                        <h3 className="text_study" style={{ paddingTop: 15, fontSize: 15 }}>{card.count}/{card.Capacity} Spots Remaining</h3>
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
                        <h3 className="text_study" style={{ paddingTop: 15, fontSize: 15 }}>{card.count}/{card.Capacity} Spots Remaining</h3>
                        {this.renderButton(card.Creator, card.id)}
                    </div>
                ))}
            </div>
        )
    }
}
export default MyStudyCards