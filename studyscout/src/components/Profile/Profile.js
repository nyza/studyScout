import React, { Component, useState, useEffect } from 'react'
import Amplify, { Analytics, Auth, Storage } from "aws-amplify";
import avatar from '../../images/avatar.png'




const Profile = () => {
    const [image, setImage] = useState(avatar);
   


    Storage.configure({ track: true, level: "private" });

   


    let fileInput = React.createRef();

    const onOpenFileDialog = () => {
      fileInput.current.click();
    };
  
    const onProcessFile = e => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      try {
        reader.readAsDataURL(file);
      } catch (err) {
        console.log(err);
      }
      reader.onloadend = () => {
          
        setImage(reader.result);
      };
      Storage.put("profilePicture.png", file, {
        contentType: "image/png"
      })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    };




    
      const onPageRendered = async () => {
        getProfilePicture();
      };
    
      const getProfilePicture = () => {
        Storage.get("profilePicture.png")
          .then(url => {
            var myRequest = new Request(url);
            fetch(myRequest).then(function(response) {
              if (response.status === 200) {
                setImage(url);
              }
            });
          })
          .catch(err => console.log(err));
      };





        return (
            <div>
                <a href="#">
                    <input
                        type="file"
                        onChange={onProcessFile}
                        ref={fileInput}
                        hidden={true}
                    />
                </a>
                <img src={image} onClick={onOpenFileDialog} />
            </div>
        )
    }
export default Profile;
