import React from 'react';
import S3FileUpload from 'react-s3'
import avatar from '../images/avatar.png'
import { updateUser } from '../graphql/mutations'
import API, { graphqlOperation } from '@aws-amplify/api';

export function Uploading() {
    console.log("Inside Uploading Component")
    require('dotenv').config();
    const config = {
        bucketName: process.env.REACT_APP_BUCKETNAME,
        dirName: process.env.REACT_APP_DIRNAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESSKEYID,
        secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
    }

    const upload = (e) => {
        console.log("Inside upload sub")
        S3FileUpload.uploadFile(e.target.files[0], config)
            .then((data) => {
                console.log(data.location)
                console.log("DATA!!!!")

                localStorage.setItem('profilepicurl', data.location);
                API.graphql(graphqlOperation(updateUser, { input: { id: localStorage.getItem('userid'), Profile_Pic: data.location } }))
                window.location.reload(false);

            })
            .catch((err) => {
                alert(err)
                console.log("ERROR!!!!")
            })
    }
    return (
        <>
            <h2>Profile Picture</h2>
            <input type="file" onChange={upload} />
            <img src={localStorage.getItem('profilepicurl')} alt={avatar} style={{ borderWidth: 8, borderColor: "black", width: 200, height: 200, borderRadius: 20, overflow: "hidden" }} />
        </>
    )
}

