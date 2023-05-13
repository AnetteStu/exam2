import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, ISOWNER, VENUES, token, isManager } from "../../constants/API";
import { Button, TextField } from "@mui/material";

export default function EditVenue() {
  if(!token) {
    window.location.replace("/")
  }
  if(!isManager) {
    window.location.replace("/profile")
  }
  const [venue, setVenue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");

  // Location
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");

  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [rating, setRating] = useState(0);
  
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  
  
  let {id} = useParams();
  const url = BASE_URL+VENUES+id+ISOWNER  

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await fetch (url);
        const json = await res.json();
        setVenue(json);

          setName(json.name);
          setDescription(json.description)
          setPrice(json.price)
          setMedia(json.media)
          setMaxGuests(json.maxGuests)
          setRating(json.rating)

          setAddress(json.location.address)
          setCity(json.location.city)
          setZip(json.location.zip)
          setCountry(json.location.country)
          setContinent(json.location.continent)

          if(json.meta.wifi === true) {
            // setWifi(json.meta.wifi)
            setWifi(true)
          }
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData()
  }, [url]);
  document.title = `Edit ${venue.name}`

  if (isLoading || !venue) {
    // checkAmenities()
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

  // Input for Editing
  async function handleChange(e) {
    const value = e.target.value;
    const checked = e.target.checked;
    
    if(e.target.name === 'name') {
      // if(!value) {
      //   value = ""
      // }
      setName(value)
    }
    if(e.target.name === 'description') {
      setDescription(value)
    }
    
    if(e.target.name === 'price') {
      setPrice(Number(value))
    }

    if(e.target.name === 'media') {
      setMedia(value)
    }


    if(e.target.name === 'maxGuests') {
      setMaxGuests(Number(value))
    }
    if(e.target.name === 'rating') {
      setRating(Number(value))
    }
    // Location
    if(e.target.name === 'address') {
      setAddress(value)
    }
    if(e.target.name === 'city') {
      setCity(value)
    }
    if(e.target.name === 'zip') {
      setZip(value)
    }
    if(e.target.name === 'country') {
      setCountry(value)
    }
    if(e.target.name === 'continent') {
      setContinent(value)
    }

    // Meta

    if(e.target.name === 'wifi') {
      // setWifi(checked)
    }
    if(e.target.name === 'parking') {
      setParking(checked)
    }
    if(e.target.name === 'breakfast') {
      setBreakfast(checked)
    }
    if(e.target.name === 'pets') {
      setPets(checked)
    }

    // console.log(venue.id);
  }

  const location = {
    address: address,
    city: city,
    zip: zip,
    country: country,
    continent: continent,
    lat: 0,
    lng: 0
  }
  
  const meta = {
    wifi: wifi,
    parking: parking,
    breakfast: breakfast,
    pets: pets,
  }

  const inputs = {
    name: name,
    description: description,
    media: [media],
    price: price,
    maxGuests: maxGuests,
    rating: rating,
    location, 
    meta,
  }

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(inputs);
    // PutWithToken(`${BASE_URL}${VENUES}${id}`, inputs, id);
  }

  // Destructuring venue for inputs 
  
  return (
    <div>
    <h2>EditVenue</h2>
      <form onSubmit={handleEdit}>
        <div className="textfieldInputsGroup">
          <div className="textfieldInputsGroup2">
            <TextField
              autoFocus={true}
              id="outlined-multiline-flexible"
              label="Name"
              name="name" 
              value={inputs.name || venue.name || ""} 
              onChange={handleChange}
            />

            <TextField
                fullWidth
                id="outlined-multiline-flexible"
                label="Media"
                name="media" 
                value={inputs.media || venue.media || ""} 
                onChange={handleChange}
                placeholder="Img1 img2 img3"
              />
          </div>
          <div className="textfieldInputsGroup3">
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              name="description" 
              value={inputs.description || venue.description || ""} 
              onChange={handleChange}
              multiline
              maxRows={10}
            />
          </div>
          <div className="textfieldInputsGroup2">
            <TextField
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              id="outlined-multiline-flexible"
              label="Price"
              name="price" 
              value={inputs.price || venue.price || 0} 
              placeholder=""
              onChange={handleChange}
              multiline
              maxRows={2}
              type="number"
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Max Guests"
              name="maxGuests" 
              value={inputs.maxGuests || venue.maxGuests || 0} 
              placeholder="Max 100"
              onChange={handleChange}
              multiline
              maxRows={2}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Rating"
              name="rating" 
              value={inputs.rating || venue.rating || 0} 
              placeholder="Max 5"
              onChange={handleChange}
              multiline
              maxRows={2}
            />
          </div>
          <div className="textfieldInputsGroup2">
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              name="address" 
              value={inputs.location.address || location.address || ""} 
              onChange={handleChange}
              multiline
              maxRows={2}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="City"
              name="city" 
              value={inputs.location.city || location.city || ""} 
              onChange={handleChange}
              multiline
              maxRows={2}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Zip"
              name="zip" 
              value={inputs.location.zip || location.zip || ""} 
              placeholder="0000"
              onChange={handleChange}
              multiline
              maxRows={2}
            />
          </div>
          <div className="textfieldInputsGroup2">
            <TextField
              id="outlined-multiline-flexible"
              label="Country"
              name="country" 
              value={inputs.location.country || location.country || ""} 
              onChange={handleChange}
              multiline
              maxRows={2}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Continent"
              name="continent" 
              value={inputs.location.continent || location.continent || ""} 
              onChange={handleChange}
              multiline
              maxRows={2}
            />
          </div>
        </div>
        {/* <label>Name:
            <input 
              type="text" 
              name="name" 
              value={inputs.name || venue.name || ""}
              placeholder={name}
              onChange={handleChange}
            />
        </label> */}
        {/* <label>Description:
            <input 
              type="text" 
              name="description" 
              value={inputs.description || venue.description || ""} 
              placeholder={description}
              onChange={handleChange} 
            />
        </label> */}

        {/* <label>Media:
            <input 
              type="text" 
              name="media" 
              value={inputs.media || venue.media || ""} 
              onChange={handleChange}
              // placeholder="Media1, media2, media3.."
            />
        </label> */}

        {/* <br/>
        <label>Price:
            <input 
              type="number" 
              name="price" 
              value={inputs.price || venue.price || 0} 
              onChange={handleChange}
              min={1}
              max={999999}
            />
        </label>
        <label>Max Guests:
            <input 
              type="number" 
              name="maxGuests" 
              value={inputs.maxGuests || venue.maxGuests || 0} 
              onChange={handleChange}
              min={1}
              max={500}
            />
        </label>
        <label>Rating:
            <input 
              type="number" 
              name="rating" 
              value={inputs.rating || venue.rating || 0} 
              onChange={handleChange}
              max={5}
              min={0}
            />
        </label>

        <br/> */}

        {/* Location */}
        {/* <label>Address:
            <input 
              type="text" 
              name="address" 
              value={inputs.location.address || location.address || ""} 
              onChange={handleChange}
            />
        </label>
        <label>City:
            <input 
              type="text" 
              name="city" 
              value={inputs.city || location.city || ""} 
              onChange={handleChange}
            />
        </label>
        <label>Zip:
            <input 
              type="number" 
              name="zip" 
              value={inputs.zip || location.zip || 0} 
              onChange={handleChange}
              max={9999}
              min={0}
            />
        </label>
        <label>Country:
            <input 
              type="text" 
              name="country" 
              value={inputs.country || location.country || ""} 
              onChange={handleChange}
            />
        </label>
        <label>Continent:
            <input 
              type="text" 
              name="continent" 
              value={inputs.continent || location.continent || ""} 
              onChange={handleChange}
            />
        </label> */}
        {/* Autocomplete for countries and/or continents? https://www.w3schools.com/howto/howto_js_autocomplete.asp */}
        {/* <br/> */}

        {/* Meta */}
        <label>Wifi:
            <input 
              type="checkbox" 
              name="wifi" 
              value={inputs.wifi } 
              onChange={handleChange}
            />
        </label>
        <label>Parking:
            <input 
              type="checkbox" 
              name="parking" 
              value={inputs.parking } 
              onChange={handleChange}
            />
        </label>
        <label>Breakfast:
            <input 
              type="checkbox" 
              name="breakfast" 
              value={inputs.breakfast } 
              onChange={handleChange}
            />
        </label>
        <label>Pets:
            <input 
              type="checkbox" 
              name="pets" 
              value={inputs.pets } 
              onChange={handleChange} 
            />
        </label>
        {/* <label>Wifi:
            <input 
              type="checkbox" 
              name="wifi" 
              value={inputs.wifi || venue.meta.wifi || false} 
              onChange={handleChange}
            />
        </label>
        <label>Parking:
            <input 
              type="checkbox" 
              name="parking" 
              value={inputs.parking || venue.meta.parking || false} 
              onChange={handleChange}
            />
        </label>
        <label>Breakfast:
            <input 
              type="checkbox" 
              name="breakfast" 
              value={inputs.breakfast || venue.meta.breakfast || false} 
              onChange={handleChange}
            />
        </label>
        <label>Pets:
            <input 
              type="checkbox" 
              name="pets" 
              value={inputs.pets || venue.meta.pets || false} 
              onChange={handleChange}
            />
        </label> */}
        <Button 
          size="small"
          variant="contained" 
          className="defaultButton"
          id="defaultButton"
          type="submit"
          >
          Submit New Venue
        </Button>  
      </form>
    </div>
  )
}
