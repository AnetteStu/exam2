import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL, BOOKINGS, PROFILE, token } from '../constants/API';

export default function BookingSuccess() {
  document.title = `Booking succeeded`
  const [booking, setBooking] = useState("");
  let {id} = useParams()

  const url = BASE_URL+PROFILE+"/"+BOOKINGS+"?_venue=true"
  useEffect(() => {
    async function getWithToken(url) {
      try {
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        };
    
        const res = await fetch(url, fetchOptions);
        const json = await res.json();
        setBooking(json)
        
        console.log(booking);
    
      } catch(error) {
        console.log(error);
      }
    }
    getWithToken(url)
  },[url]);


  return (
    <div>
      <div>
        <p>Booking successfull!</p> 
        <p>Booking id: {id}</p> 
      </div>
      <Link to="/bookings/">To all bookings</Link>
    </div>
  )
}
