import placeholderAvatar from "../assets/holidazeplaceholderavatar.png" ;
import { avatar } from "./API";


export function Avatar() {
  return (
    <img src={avatar==="" ? placeholderAvatar: avatar} className="avatar" alt={avatar}/>
  )
}
