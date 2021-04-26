import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getCards } from '../graphql/queries'
import { updateCards } from '../graphql/mutations'
import API, { graphqlOperation } from '@aws-amplify/api';
import TextField from '@material-ui/core/TextField';
import { Auth } from 'aws-amplify'

class EditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            HostName: '',
            ContentName: '',
            CourseName: '',
            MeetingInfo: '',
            Time: '',
            cards: [],
            Capacity: '',
            Creator: Auth.user.attributes.email,
        };
        this.onChange = this.onChange.bind(this);
    }

    async componentWillMount() {
        console.log("inside component did mount")
        const { HostName, CourseName, ContentName, MeetingInfo, Time, Capacity, Creator } = this.state

        try {
            const apiData = await API.graphql(graphqlOperation(getCards, { id: localStorage.getItem('cardid') }));
            const card = { HostName, CourseName, ContentName, Capacity, Time, MeetingInfo, Creator }
            const cards = [...this.state.cards, card]
            this.setState({
                cards,
                id: apiData.data.getCards.id,
                HostName: apiData.data.getCards.HostName,
                ContentName: apiData.data.getCards.ContentName,
                CourseName: apiData.data.getCards.CourseName,
                Capacity: apiData.data.getCards.Capacity,
                MeetingInfo: apiData.data.getCards.MeetingInfo,
                Time: apiData.data.getCards.Time,
                Creator: apiData.data.getCards.Creator
            })

        } catch (err) {
            console.log('error: ', err)
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    updateCards = async () => {
        console.log("inside updateCards")
        const { id, HostName, CourseName, ContentName, MeetingInfo, Time, Capacity, Creator } = this.state

        if (id === '' || ContentName === '' || MeetingInfo === '' || Capacity === '' || HostName === '' || CourseName === "" || Creator === '') return

        try {
            const card = { id, HostName, CourseName, ContentName, Capacity, Time, MeetingInfo, Creator }
            const cards = [...this.state.cards, card]
            this.setState({
                cards, id: '', HostName: '', ContentName: '', CourseName: '', Capacity: '', MeetingInfo: '', Time: '', Creator: ''
            })
            card.Creator = Auth.user.attributes.email
            card.id = localStorage.getItem('cardid');
            await API.graphql(graphqlOperation(updateCards, { input: card }))
        } catch (err) {
            console.log('error: ', err)
        }
    }

    render() {
        console.log("inside new create card render")

        return (
            <div>
                <h1>My Study Cards</h1>
                <div className="study_card">
                    <h3 className="text_study">Update Study Card Information</h3>
                    <select className="drop_box" value={this.state.CourseName} name="CourseName" onChange={this.onChange} >
                        <option value="" disabled>Select Class</option>
                        {
                            ["ITCS-4155", "ITCS-4325", "ITCS-5432"].map((i, j) => {
                                return <option key={i} value={i}>{i}</option>
                            })
                        }
                    </select>
                    <br />
                    <input className="input_box" type="text" name="HostName" value={this.state.HostName} onChange={this.onChange} placeholder="       HostName  " />
                    <br />
                    <input className="input_box" type="text" name="ContentName" value={this.state.ContentName} onChange={this.onChange} placeholder="     Topic" />
                    <br />
                    <TextField type="datetime-local" className="input_box" name="Time" onChange={this.onChange} value={this.state.Time} InputLabelProps={{ shrink: false, }} />
                    <br />
                    <input className="input_box" type="text" name="MeetingInfo" value={this.state.MeetingInfo} onChange={this.onChange} placeholder="     Meeting Information" />
                    <br />

                    <input className="input_box" type="number" name="Capacity" value={this.state.Capacity} onChange={this.onChange} placeholder="     Number Of People" />
                    <br />
                    <button className="submit">
                        <Link to="/myStudyCards" onClick={this.updateCards} style={{ color: "black", textDecoration: 'none' }}> Update Card </Link>
                    </button>
                </div>
            </div>
        )
    }
}
export default EditCard