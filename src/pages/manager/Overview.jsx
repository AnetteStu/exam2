import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileNav from "../../components/ProfileNav";
import { BASE_URL, PROFILES, ISBOOKED, isManager, user, token } from "../../constants/API"

export default function Overview() {
  if(!token) {
    window.location.replace("/")
  }
  if(!isManager) {
    window.location.replace("/profile")
  }

  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let {id} = useParams();

useEffect(() => {
  async function getVenues(url) {

    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

  try {
    setIsError(false);
    setIsLoading(true);
    const res = await fetch(url,fetchOptions);
    const json = await res.json();
    setVenues(json);
    setIsLoading(false);

  } catch (error) {
    setIsLoading(false);
    setIsError(true);
  }
}getVenues(`${BASE_URL}${PROFILES}${user}/venues${ISBOOKED}`)
}, [id]);

// console.log(`${BASE_URL}${PROFILES}${user}/venues${ISBOOKED}` );

  document.title = `Overview`
  // console.log(id);

  console.log(venues);
  // venues.forEach(Venue) 

  if (isLoading) {
    return (<i className="fa-solid fa-circle-notch fa-spin"></i>)
  }
  
  if (isError) {
    return (
      <>
      <i className="fa-solid fa-circle-exclamation"></i>
      <div>Error loading data!</div>
      </>
    )
  }   

  return (
    <>
      <div className="profileContent">
      <ProfileNav/>
        <div>
          <h2>Your Venues</h2>
          {venues.length === 0 ? <div>No venues yet</div> : venues.map((venue) => (
            
            <div key={venue.id}>
              <Link to={`/venues/${venue.id}`} >
                <div><Link to={`/edit/${venue.id}`}><i className="fa-solid fa-file-pen"></i></Link> {venue.name}</div>
              </Link>
              {venue.bookings === [] 
                ? "" 
                : <div> BOOKINGS {venue.bookings.length} </div>
              }
            </div>
          ))}
        </div>
      </div>
      
    </>
  )
}
