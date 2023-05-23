import { Link, useLocation } from "react-router-dom";
import { BASE_URL, VENUES } from "../constants/API";
import placeholder from "../assets/placeholder.png"

import { useEffect, useState } from "react"
import Rating from "../components/Rating";
import { TextField } from "@mui/material";

import "../styling/css/venues.css"

export default function Venues() {
  document.title = `Venues`;
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const query = useLocation();

  const venueSearch = query.search.split("?")[1]

  useEffect(() => {
    async function getData(url) {
    try {
      setIsError(false);
      setIsLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setVenues(json);
      setIsLoading(false);
      if(!venueSearch == "") {
        setSearchText(venueSearch)
      }

    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }getData(`${BASE_URL}${VENUES}`);
}, []);

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
    <div className="venuesResultPage">
      <TextField
        label="Search" 
        value={searchText} 
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
      />
      <div className="venues">

        {venues.filter((venue) => {
          return searchText.toLowerCase() === '' ? 
          venue :
          venue.name.toLowerCase().includes(searchText)
        })
          .map((venue) => (
          <Link to={venue.id} key={venue.id} className="venueLink">
            <div className="venueCard">
              <div className="venueDetails">
                <div className="venuesName">
                  {venue.name} 
                </div>
                {venue.price},-
              </div>
              <div className="venueSubDetails">
                <div className="venueMeta">
                  {venue.meta.wifi ? <i className="fa-solid fa-wifi" title="Wi-Fi Access"></i> : ""}
                  {venue.meta.parking ? <i className="fa-solid fa-square-parking" title="Available Parking"></i> : ""}
                  {venue.meta.breakfast ? <i className="fa-solid fa-utensils" title="Breakfast included"></i> : ""}
                  {venue.meta.pets ? <i className="fa-solid fa-dog" title="Pets Allowed"></i> : ""}<br/>
                </div>
                <div>
                  <Rating stars={venue.rating} />
                </div>
              </div>
              <img src={!venue.media[0] || venue.media[0] === [] ? placeholder : venue.media[0]} className="venueHeaderImage" alt={venue.name} />
            </div>

          </Link>
        ))}
      </div>
    </div>
  )
}
