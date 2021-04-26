

import React, { Component, useState } from 'react'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { getCards, listUsers, listCardss } from '../graphql/queries'
import { deleteCards, updateCards, updateUser } from '../graphql/mutations'
import { onDeleteCards } from '../graphql/subscriptions';

class PopOut extends Component {
    constructor() {
        super()
        this.state = {
            cards: [],
            count: 0,
            buttonText: "Join Session",
            filtertext: "",
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
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
            console.log("Already Added this card")
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

    async componentDidMount() {
        try {

            if (localStorage.getItem('filterbool')) {
                const text = localStorage.getItem('filtertext')
                const apiData = await API.graphql(graphqlOperation(listCardss))
                const cards = apiData.data.listCardss.items
                var cardlist = []
                for (var i = 0; i < cards.length; i++) {
                    console.log("CN:", cards[i].CourseName)
                    if (cards[i].CourseName.includes(text)) {
                        cardlist.push(cards[i])
                    }
                }
                this.setState({
                    cards: cardlist
                })

                localStorage.setItem('filterbool', false)
            } else {
                const apiData = await API.graphql(graphqlOperation(listCardss))
                const response = apiData.data.listCardss.items
                this.setState({
                    cards: response
                })
                localStorage.setItem('filterbool', false)
            }

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

    filterButton(text) {
        //Writes text to localStorage and set boolean flag to true
        localStorage.setItem('filtertext', text)
        if (text !== null)
            localStorage.setItem('filterbool', true)
        // refresh page
        window.location.reload();
    }


    render() {
        return (
            <div >
                <div className="row">
                    <input className="input_box_filter" type="text" name="filtertext" value={this.state.filtertext} onChange={this.onChange} placeholder="Filter Classes" />
                    <button className="filter_submit" onClick={() => this.filterButton(this.state.filtertext)}>Filter / Reset</button>
                </div>

                {this.state.cards.map((card, i) => (
                    <div key={i} className="container2">
                        <h3 className="text_study">{card.CourseName}</h3>
                        <h3 className="text_study">{card.ContentName}</h3>
                        <h3 className="text_study">Hosted by {card.HostName}</h3>
                        <h3 className="text_study">{card.Time}</h3>
                        <h3 className="text_study">Meeting Link:</h3>
                        <h3 className="text_study">{card.MeetingInfo}</h3>
                        <h3 className="text_study" style={{ paddingTop: 15, fontSize: 15 }}>{card.Capacity - card.count} Spots Remaining</h3>
                        {this.renderButton(card.Creator, card.id)}
                    </div>
                ))}
            </div>
        )
    }
}
export default PopOut