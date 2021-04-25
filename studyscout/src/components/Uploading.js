import React from 'react';
import { render } from 'react-dom';
import S3FileUpload from 'react-s3'
import avatar from '../images/avatar.png'
import { updateUser } from '../graphql/mutations'
import Auth from '@aws-amplify/auth';
import API, { graphqlOperation } from '@aws-amplify/api';

export function Uploading() {
    console.log("Inside Uploading Component")
    const config = {
        bucketName: 'studyscout7cd0119a23d74e2ca4dbd50b3fd47127161706-dev',
        dirName: 'profilepics', /* optional */
        region: 'us-east-1',
        accessKeyId: 'AKIA4HIKE6B3ORQG7XJL',
        secretAccessKey: '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'
    }

    const upload = (e) => {
        console.log("Inside upload sub")
        S3FileUpload.uploadFile(e.target.files[0], config)
            .then((data) => {
                console.log(data.location)
                console.log("DATA!!!!")

                //write datalocation to the users picture string
                console.log("UEmail:", Auth.user.attributes.email)
                console.log("Uid", localStorage.getItem('userid'))

                localStorage.setItem('profilepicurl', data.location);
                API.graphql(graphqlOperation(updateUser, { input: { id: localStorage.getItem('userid'), Profile_Pic: data.location } }))
                window.location.reload(false);


            })
            .catch((err) => {
                alert(err)
                console.log("ERROR!!!!")
            })
        // <img src={avatar} style={{borderWidth: 3, borderColor: "black", width: 80, height: 80, borderRadius: 10, overflow: "hidden"}} />
    }

    return (
        <>
            <div>
                <div>
                    <h3>Profile Picture</h3>
                    <input type="file" onChange={upload} />
                    <img src={localStorage.getItem('profilepicurl')} alt={avatar} style={{ borderWidth: 3, borderColor: "black", width: 400, height: 400
                    , borderRadius: 10, overflow: "hidden" }} />
                </div>
            </div>
        </>
    )
}

