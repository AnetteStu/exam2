import { Link, useParams } from "react-router-dom"
import { BASE_URL, BOOKINGS, token } from "../../constants/API";
import { useEffect, useState } from "react";
import ProfileNav from "../../components/ProfileNav";
import { Breadcrumb } from "react-bootstrap";

export default function Booking() {
  document.title = `Booking Details`
  let {id} = useParams();
  const url = `${BASE_URL}${BOOKINGS}${id}`

  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
      setBooking(json);
      setIsLoading(false);

      // console.log(json);
  
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }getBookings(url)
  }, []);

  if (isLoading || !booking) {
    return (<i className="fa-solid fa-gear fa-spin"></i>)
  }

  if (isError) {
    return (
      <>
        <i className="fa-solid fa-circle-exclamation"></i>
        <div>Error loading data!</div>
      </>
    )
  }

  // console.log(booking);

  // const from = booking.dateFrom.split("T"[0])

  if(isLoading === false) {
    return (
      <div className="profileContent">
        <ProfileNav/>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/bookings/`}}>Bookings</Breadcrumb.Item>
            <Breadcrumb.Item active>{id}</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Booking ID:</h1>
          <p>{id}</p>
          <h3>Details:</h3>
          <ul>
            <li>Guests: {booking.guests}</li>
            <li>From: {booking.dateFrom.split("T")[0]}</li>
            <li>To: {booking.dateFrom.split("T")[0]}</li>
          </ul>
          <ul>
            <li>Created: {booking.created.split("T")[0]}</li>
            <li>Last updated: {booking.updated.split("T")[0]}</li>
          </ul>
        </div>
      </div>
    )
  }
}
