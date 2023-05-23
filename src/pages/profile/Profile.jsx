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