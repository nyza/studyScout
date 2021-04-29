import React, { Component } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import avatar from '../images/avatar.png'
import { createUser, updateUser } from '../graphql/mutations'
import { Auth } from 'aws-amplify'
import API, { graphqlOperation } from '@aws-amplify/api';
import { getUser } from '../graphql/queries';
import { Link } from 'react-router-dom'
import { listUsers } from '../graphql/queries'
import S3FileUpload from 'react-s3'
import { Uploading } from '../components/Uploading'



class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            id: "",
            EmailAddress: "",
            Password: "*********",
            Bio: "",
            ClassList: "",
            Joined_Cards: [],
            email: Auth.user.attributes.email,
            Profile_Pic: "",
            users: [],
            options: [{ name: 'ITCS-2214-011', id: 1 }, { name: 'ITCS-4112-012', id: 2 }, { name: 'ITCS-3162-001', id: 3 },
            { name: 'STAT-3150-045', ID: 4 }, { name: 'ITIS-3130-003', id: 5 }],
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    async componentWillMount() {
        const userEmail = Auth.user.attributes.email
        const returnedUser = await API.graphql(graphqlOperation(listUsers, {
            filter: {
                email: {
                    eq: userEmail
                }
            }
        }))
        localStorage.setItem('userid', returnedUser.data.listUsers.items[0].id);
        const { Name, Bio, ClassList, email, Profile_Pic } = this.state
        try {
            const apiData = await API.graphql(graphqlOperation(getUser, { id: localStorage.getItem('userid') }));
            const user = { Name, Bio, ClassList, email, Profile_Pic }
            const users = [...this.state.users, user]
            this.setState({
                users,
                id: apiData.data.getUser.id,
                Name: apiData.data.getUser.Name,
                ClassList: apiData.data.getUser.ClassList,
                email: apiData.data.getUser.email,
                Bio: apiData.data.getUser.Bio,
            })
        } catch (err) {
            console.log('error: ', err)
        }
    }

    updateUser = async () => {
        const { id, Name, ClassList, email, Bio } = this.state
        if (id === '' || email === '') return
        try {
            const user = { id, Name, ClassList, email, Bio }
            const users = [...this.state.users, user]
            this.setState({
                users, id: '', Name: '', ClassList: '', Bio: '', email: ''
            })
            user.email = Auth.user.attributes.email
            user.id = localStorage.getItem('userid');
            await API.graphql(graphqlOperation(updateUser, { input: user }))
        } catch (err) {
            console.log('error: ', err)
        }
    }

    render() {
        return (
            <div className="Profile">
                <div class="row">
                    <div class="column">
                        <div>
                            <h2 className="heading">    {this.state.email}</h2>
                        </div>
                        <input className="display_box" type="text" name="Name" value={this.state.Name} onChange={this.handleChange} placeholder="Name" />
                        <textarea className="display_box1" type="text" name="Bio" value={this.state.Bio} onChange={this.handleChange} placeholder="Bio" />
                    </div>
                    <div class="column2">
                        {/* <h2 className="heading">Class List</h2>
                        <Multiselect
                            options={this.state.options}
                            name="ClassList"
                            selectedValues={this.state.selectedValue}
                            onSelect={this.onSelect}
                            onRemove={this.onRemove}
                            displayValue="name"
                        /> */}
                    </div>
                    <div class="column">
                        <div>{Uploading()}</div>
                    </div>
                </div>

                <button className="submit">
                    <Link to="/" onClick={this.updateUser} style={{ color: "black", textDecoration: 'none' }}> Update Card </Link>
                </button>
                <button className="cancel">
                    <Link to="/" style={{ color: "black", textDecoration: 'none' }}> Cancel </Link>
                </button>

            </div>
        )
    }
}
export default ProfilePage;
