import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL, BOOKINGS, PROFILE, token } from '../constants/API';

export default function BookingSuccess() {
  document.title = `Booking succeeded`
  const [booking, setBooking] = useState("");
  // const [search, setSearch] = useState("")
  let {id} = useParams()

  const url = BASE_URL+PROFILE+"/"+BOOKINGS+"?_venue=true"

  console.log(url);

  useEffect(() => {
    async function getWithToken(url) {
      try {
        // console.log(url);
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
  },[]);


  return (
    <div>
      Booking successfull! <br/>
      Booking id {id}
      {/* From {booking.dateFrom} */}

      {/* {booking.filter((aBooking) => {
          return search === '' ? 
          "" : 
          aBooking.id.includes(id)
        }).map((aBooking) => (
        <div>{aBooking.id}</div>
      ))} */}

      <br/>
      <Link to="/bookings/">To all bookings</Link>

    </div>
  )
}
