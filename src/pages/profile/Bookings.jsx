import { useEffect, useState } from "react"
import ProfileNav from "../../components/ProfileNav"
import { BASE_URL, USER_BOOKINGS, PROFILES, token, BOOKINGS } from "../../constants/API"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

import "../../styling/css/userBookings.css" ;

export default function Bookings() {
  if(!token) {
    window.location.replace("/")
  }
  
  document.title = `Bookings`
  
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [id, setId] = useState("");
  
  useEffect(() => {
    async function getBookings(url) {
  
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
      setBookings(json);
      setIsLoading(false);
      console.log(bookings);
  
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }getBookings(`${BASE_URL}${PROFILES}${USER_BOOKINGS}?_customer=true&_venue=true`)
  }, [bookings]);

  if (isLoading) {
    return (<i className="fa-solid fa-circle-notch fa-spin"></i>)
  }
  
  if (isError) {
    return (
      <>
      <i className="fa-solid fa-circle-exclamation"></i>
      <div>Error loading data, please refresh!</div>
      </>
    )
  }   

  function handleDelete(e) {
    const value = e.target.value;
  
    if(e.target.name === 'delete') {
      setId(value)
    }
  }
  function ConfirmDelete(e) {
    e.preventDefault();
    if(window.confirm ("Warning, you're about to delete a booking!") === true) {
      deleteBookingWithToken()
    }
  }
  
  async function deleteBookingWithToken() {  
    console.log(id);
    try {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      };
      
      const res = await fetch(`${BASE_URL}${BOOKINGS}${id}`, fetchOptions);
      const json = await res.json();
      console.log(`${BASE_URL}${BOOKINGS}${id}`);
      console.log(json);

    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }    
  }

  return (
    <>
    <div className="profileContent">
      <ProfileNav/>
      <div>
        <h2>Bookings</h2>
        <div className="allBookings">
          {bookings.length === 0 ? <div style={{minWidth:200}}>No bookings</div> : bookings.map((booking) => (
            <div key={booking.id} className="bookingDetails">
              <div >
                <div>
                  {booking.guests} residents
                </div>
                At <Link to={`/venues/${booking.venue.id}`} >{booking.venue.name}</Link> 
              </div>
              <div className="bookingDates">
                {booking.dateFrom.split("T")[0]} - {booking.dateTo.split("T")[0]}
              </div>
              <form onSubmit={ConfirmDelete}>
                <div className="center">
                  <Button 
                    size="small"
                    // variant="contained" 
                    className="defaultButton"
                    id="defaultButton"
                    type="submit"
                    name="delete" 
                    value={booking.id}
                  // data = {booking.id}
                    onClick={handleDelete}
                    >
                    Delete Booking
                  </Button>
                </div>
              </form>
            </div>
          ))}      
        </div>
      </div>
    </div>
    </>
  )
}