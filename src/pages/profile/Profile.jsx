import { email, user, token, isManager } from "../../constants/API"
import ProfileNav from "../../components/ProfileNav"
import { Avatar } from "../../constants/variables"

import "../../styling/css/profile.css"

export default function Profile() {
  if(!token) {
    window.location.replace("/login")
    return
  }
  document.title = `Profile`

  // const user = localStorage.getItem("username")
  // const avatar = localStorage.getItem("avatar")
  return (
    <div className="profileContainer">

      <div className="profileContent">
        <ProfileNav/>
        <div>
          <h2>Hello {user}! {isManager === "false" ? "" : <i className="fa-solid fa-star" title="Venue Manager"></i>}</h2> 
          <Avatar/>

          <ul>
            <li>Username: {user}</li>
            <li>Email: {email}</li>
            <li>Manager: {isManager === "true" ? "Yes" : "No"}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// async function avatarUpdate (data) {

//   console.log(data);
//   // window.location.href(`/profile/+ ${user}`)
//   try {
//     const postData = {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     };
    
//     const res = await fetch(url, postData);
//     const json = await res.json();
//     console.log(json);

//     const accessToken = json.accessToken;
//     const username = json.name
//     const manager = json.venueManager
//     const avatar = json.avatar

//     localStorage.setItem('accessToken', accessToken)
//     localStorage.setItem('username', username )
//     localStorage.setItem('manager', manager)
//     localStorage.setItem('avatar', avatar)
    
//     // const user = localStorage.getItem('username')
//     if(accessToken) {
//       window.location.reload();
//     }
    
//   } catch (error) {
//     console.log(error);
//   }
// }