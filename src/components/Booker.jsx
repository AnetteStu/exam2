import { useState } from "react";
import { token } from "../constants/API"
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import style from "../styling/css/bookings.module.css"

let id = ""
let maxGuests = 0
export default function Booker(params) {
  id = params.id
  maxGuests = params.maxGuests


  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(0);

  const [dayDifference, setDayDifference] = useState(0)

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

    const fromDateCheck = new Date(dateFrom)
    const toDateCheck = new Date(dateTo)
    
    const timeDifference = toDateCheck.getTime() - fromDateCheck.getTime()
    setDayDifference (timeDifference / (1000 * 60 * 60 * 24)) 
    console.log(dayDifference);
  }

  const inputs = {
    dateFrom: dateFrom,
    dateTo: dateTo,
    guests: Number(guests),
    venueId: id
  }

  const handleBooking = (e) => {
    e.preventDefault();
    // console.log(inputs);
    console.log(dayDifference);
    // window.location.replace("/newbooking")
    // bookWithToken(`${BASE_URL}${BOOKINGS}`, inputs); 
  }

  const today = new Date().toISOString().split("T")[0];
  
  return (

    <div>
      <Link to={`/venues/${id}`}>Back</Link>

      <div className={style.checkoutTotal}>
        <div>
          Price: {params.price} Max Guests: {params.maxGuests}
        </div>

        <div>
          Days: {dayDifference} <br/>
          Guests: {inputs.guests} <br/>
          Total: {inputs.guests === 0 && dayDifference === 1 || dayDifference === 1 || inputs.guests === 0 ? params.price : (params.price*inputs.guests)*(1 + dayDifference)} 
        </div>
      </div>

  
      <form onSubmit={handleBooking} className={style.bookingInput}>
        <label>From:
            <input 
              type="date" 
              name="dateFrom" 
              value={inputs.dateFrom} 
              min={today}
              onChange={handleChange}
            />
        </label>
        <label>To:
            <input 
              type="date" 
              name="dateTo" 
              value={inputs.dateTo} 
              min={dateFrom}
              onChange={handleChange}
            />
        </label>
        <label title={`Max Guests ${guests}`}>Guests:
            <input 
              type="number" 
              name="guests" 
              defaultValue={inputs.guests} 
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