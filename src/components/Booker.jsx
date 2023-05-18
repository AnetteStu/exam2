import { useState } from "react";
import { BASE_URL, BOOKINGS, token } from "../constants/API"
// import { bookWithToken, postWithToken } from "./tokenHandlers";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import style from "../styling/css/bookings.module.css"

let id = ""
let maxGuests = 0
export default function Booker(params) {
  id = params.id
  maxGuests = params.maxGuests

  // console.log(param);
  // console.log(id, maxGuests);


  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(0);

  function handleChange(e) {
    const value = e.target.value;

    if(e.target.name === 'dateFrom') {
      setDateFrom(value)
    }
    if(e.target.name === 'dateTo') {
      setDateTo(value)
    }
    if(e.target.name === 'guests') {
      setGuests(value)
    }
  }

  const inputs = {
    dateFrom: dateFrom,
    dateTo: dateTo,
    guests: Number(guests),
    venueId: id
  }

  const handleBooking = (e) => {
    e.preventDefault();
    console.log(inputs);
    // window.location.replace("/newbooking")
    bookWithToken(`${BASE_URL}${BOOKINGS}`, inputs);
    
  }
  
  return (

    <div>
      <Link to={`/venues/${id}`}>Back</Link>

      <div className={style.checkoutTotal}>
        <div>
          Price: {params.price}<br/>
        </div>
        <div>
          Total: {inputs.guests === 0 ? params.price : params.price*inputs.guests}
        </div>
      </div>

  
      <form onSubmit={handleBooking} className={style.bookingInput}>
        <label>From:
            <input 
              type="date" 
              name="dateFrom" 
              value={inputs.dateFrom} 
              onChange={handleChange}
            />
        </label>
        <label>To:
            <input 
              type="date" 
              name="dateTo" 
              value={inputs.dateTo} 
              onChange={handleChange}
            />
        </label>
        <label title={`Max Guests ${guests}`}>Guests:
            <input 
              type="number" 
              name="guests" 
              value={inputs.guests} 
              onChange={handleChange}
              min={1}
              max={maxGuests}
            />
        </label>
        <br/>
        {/* <input type="submit" value="Checkout!" onClick={handleBooking}></input> */}
        {/* <Link to="/newbooking/" value={inputs} > Book Venue!</Link>  */}
      </form>
        <Button 
          size="small"
          variant="contained" 
          className="defaultButton"
          id="defaultButton" 
          onClick={handleBooking}
        >Book Venue</Button>
    </div>
  )
}

// async function handleBooking() {
//   if (!token) {
//     console.log("Login first");
//     return
//   }

//   console.log("Book venue");
//   console.log(id);
// }

async function bookWithToken(url, data) {
  try {
    console.log(url, data);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };

    const res = await fetch(url, fetchOptions);
    const json = await res.json();

    console.log(json);

    window.location.replace(`/bookings/${json.id}`)

  } catch(error) {
    console.log(error);
  }
}