import "../styling/css/details.css"

import placeholder from "../assets/placeholder.png"

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, BOOKING_OWNER, VENUES, token, user } from "../constants/API";
import Rating from "../components/Rating";
import { Button } from "@mui/material";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function Details() {
  const [venue, setVenue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let {id} = useParams();
  const url = BASE_URL+VENUES+id+BOOKING_OWNER

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await fetch (url);
        const json = await res.json();
        setVenue(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData()
  }, [url]);
  document.title = `${venue.name}`

  if (isLoading || !venue) {
    return (<i className="fa-solid fa-gear fa-spin"></i>)
  }

  if (isError) {
    return (
      <>
        <i className="fa-solid fa-circle-exclamation"></i>
        <div>Error loading data! Please refresh</div>
      </>
    )
  }

  if(venue.statusCode === 404 || venue.statusCode === 400) {
    window.location.replace(`/${VENUES}`)
  }

  if (venue) {
    return (
      <RenderVenue
        id = {venue.id}
        name = {venue.name}
        description = {venue.description}
        price = {venue.price}
        guests = {venue.maxGuests}
        images = {venue.media ? venue.media.map((image) => (
          <img src={image ? image : placeholder} alt="Images of the venue" key={image} className="image"/>
        )): []}
        meta = {venue.meta}
        location = {venue.location}
        owner = {venue.owner}
        rating = {venue.rating}
        bookings = {!venue.bookings 
          ? <div>No current bookings!</div> 
          :  venue.bookings.map(booking => 
            <div className="bookedDates" key={booking.id}> 
              Venue Is booked at:
              <div title="Date from">{booking.dateFrom.split("T")[0]}</div> 
              <div title="Date to">{booking.dateTo.split("T")[0]}</div>
            </div> 
          )}
      />
    )
  }
  return (<div>Nothing to be returned</div>)
}

function RenderVenue({id, name, description, price, guests, images, meta, location, bookings, owner, rating}) {
  
  const navigate = useNavigate()
  const handleBooking = () => navigate(`/newbooking/${id}`)
  
  if(id) {
    function handleDeleteVenue() {
      if(window.confirm("sure?")) {
        deleteVenueWithToken()
      }
    }
    async function deleteVenueWithToken() {
      try {
        const fetchOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        };
        
        const res = await fetch(`${BASE_URL}${VENUES}${id}`, fetchOptions);
        const json = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        window.location.replace("/overview");
      }
    }
    if(id) {
        return (
          <>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/venues/`}}>Venues</Breadcrumb.Item>
            <Breadcrumb.Item active>{name}</Breadcrumb.Item>
          </Breadcrumb>
            <div className="venue">
              <div className="images">{images}</div>
              <div className="venueHeader">
                <h1 className="venueName">
                  {name}
                </h1>
                <div>
                  <Rating stars={rating}/> ({rating}) 
                </div>
              </div>
              <div className="venueDetails">
                <div>
                  {price},-
                </div>
                <div className="venueMeta">
                  {meta.wifi ? <i className="fa-solid fa-wifi fa-lg" title="Wi-Fi Access"></i> : ""}
                  {meta.parking ? <i className="fa-solid fa-square-parking fa-lg" title="Available Parking"></i> : ""}
                  {meta.breakfast ? <i className="fa-solid fa-utensils fa-lg" title="Breakfast included"></i> : ""}
                  {meta.pets ? <i className="fa-solid fa-dog fa-lg" title="Pets Allowed"></i> : ""}<br/>
                </div>
                <div>
                  Max Guests {guests}
                </div>
              </div>
    
              <div className="venueSubDetails">
                  {location.address === "" || location.address === "Unknown" || location.address === "unknown" ? "Address Unavailable, contact support" : <p>{location.address}, {location.city}, {location.country}</p>}
              </div>
              <p className="venueDescription">
                {description}
              </p> 
            </div>
    
            <div className="detailsButton">
              <Button size="small"
                      variant="contained" 
                      className="defaultButton"
                      id="defaultButton" 
                      onClick={handleBooking}
              >Book Venue</Button>
            </div>
            {owner.name === user 
            ? 
              <div className="venueOwnerOptions"> 
                <div><Link to={`/edit/${id}`}>
                  <i className="fa-solid fa-file-pen fa-xl"></i></Link>
                </div>
                <div>
                  <i className="fa-solid fa-trash fa-xl" onClick={handleDeleteVenue}></i>
                </div>
              </div> 
              : ""}

            <div>View available Booking times</div>
            <div className="bookings">{bookings}</div>
          </>
        )
      }
    }
}

// import Calendar from "../components/Calendar";

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup
// } from 'https://cdn.esm.sh/react-leaflet'


 {/* <Calendar start={bookings.dateFrom} end={bookings.dateTo}/> */}
// const [position, setPosition] = useState([0])
// setPosition = [51.505, -0.09]
{/* <div>View in map</div>    
<MapContainer center={position} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>  */}