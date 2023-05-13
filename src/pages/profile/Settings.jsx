import { useState } from "react";
import { user, BASE_URL, PROFILE_MEDIA, token } from "../../constants/API";
import ProfileNav from "../../components/ProfileNav";
import { Avatar } from "../../constants/variables";
import { Button, TextField } from "@mui/material";

export default function Settings() {
  document.title = `Settings | ${user}`

  if(!token) {
    window.location.replace("/")
  }

  // const [selectedFile, setSelectedFile] = useState(null);
  const [avatar, setAvatar] = useState("");

  const handleChange = e => {
    // setAvatar(e.target.files[0])
    setAvatar(e.target.value)
  }

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   const file = event.target.files;

  //   setInputs(values => ({...values, [name]: value}))
  // }


  // function handleChange(e) {
    // const value = e.target.value;

    // const value = e.target.value;
    // if(e.target.name === 'avatar') {
    //   setAvatar(value)
    //   const formData = new FormData();
    //   file = avatar.files[0]
    // }
    // if(e.target.name === 'avatar2') {
    //   setAvatar2(value)
    // }

  // }
  
  const inputs = {
    avatar: avatar
  }
  
  // console.log(inputs.avatar);

  const handleAvatarChange = (e) => {
    e.preventDefault();
    putAvatarToken(`${BASE_URL}${PROFILE_MEDIA}`, inputs);
  } 

  return (
    <>

      <div className="profileContent">

        <ProfileNav/>
        <div>
            <h2>Settings</h2>
            <Avatar/>

            <form onSubmit={handleAvatarChange}>
            {/* Set new avatar (link) */}

              {/* <input 
                type="file" 
                name="avatar" 
                // value={""} 
                onChange={handleChange}
                // multiple
              /> */}

              {/* <input 
                type="text" 
                name="avatar" 
                value={inputs.avatar || ""} 
                placeholder="image Url here"
                onChange={handleChange}
              /> */}
              <TextField
                // id="firstInput outlined-multiline-flexible"
                label="Image URL"
                type="text" 
                name="avatar" 
                value={inputs.avatar || ""} 
                placeholder="https://domain.com/name.png"
                onChange={handleChange}
                sx={{
                  width: "100%",
                }}
              />


              {/* <input 
                type="file"
                name="profilePic"
                // value=""
                onChange={handleChange}
                multiple
              /> */}
              <div className="center">
                <Button 
                  size="small"
                  variant="contained" 
                  className="defaultButton"
                  id="defaultButton"
                  type="submit"
                  >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
    </>

  )
}

async function putAvatarToken(url, data) {
  try {
    console.log(url, data);
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };

    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    console.log(json);

    localStorage.setItem('avatar', json.avatar)

    // window.location.reload();
    
  } catch(error) {
    console.log(error);
  }
}