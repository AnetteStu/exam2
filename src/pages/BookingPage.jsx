import { useParams } from "react-router-dom";
import Booker from "../components/Booker";
import { BASE_URL, BOOKING_OWNER, VENUES } from "../constants/API";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [venue, setVenue] = useState([]);
  let {id} = useParams()
  const url = BASE_URL+VENUES+id+BOOKING_OWNER
  console.log(url);
  
  
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch (url);
        const json = await res.json();
        setVenue(json);
        console.log(venue);
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  });
  
  document.title = `Book ${venue.name}`
  return (
    <div>

      <Booker id={id} maxGuests={venue.maxGuests} price={venue.price}/>
    </div>
  )
}
