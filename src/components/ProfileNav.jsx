import { Link } from "react-router-dom"
import { isManager } from "../constants/API"

export default function ProfileNav() {
  return (
    <div className="profileNav">
        <ul> Profile
          <li><Link to="/profile">Account</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
        </ul>

          {isManager === "true" 
          ? <ul>Venues
              <li><Link to="/overview/">Overview</Link> </li>
              {/* <li><Link to="/managevenue">Manage</Link> </li> */}
              <li><Link to="/new/">Create Venue</Link> </li>
          </ul> 
          : ""}
      </div>
  )
}
