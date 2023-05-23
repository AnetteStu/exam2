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
  const [avatar, setAvatar] = useState("");

  const handleChange = e => {
    setAvatar(e.target.value)
  }
  const inputs = {
    avatar: avatar
  }

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
              <TextField
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
    if(json.avatar) {
      window.location.reload();
    } else {
      window.confirm(`An error occured: ${json.errors[0].message}`)
    }

    
  } catch(error) {
    console.log(error);
  }
}