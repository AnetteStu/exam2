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
        
        setWifi(json.meta.wifi)
        setParking(json.meta.parking)
        setBreakfast(json.meta.breakfast)
        setPets(json.meta.pets)
        
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
      setName(value)
    }
    if(e.target.name === 'description') {
      setDescription(value)
    }
    
    if(e.target.name === 'price') {
      setPrice(Number(value))
    }

    // if(e.target.name === 'media') {
    //   setMedia(value)
    // }


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

    if(e.target.name === "media") {
      let txt = value
      const media = txt.split(",")
      setMedia(media)
      console.log(media);
    }

    // // Meta

    // if(e.target.name === 'wifi') {
    //   // setWifi(checked)
    // }
    // if(e.target.name === 'parking') {
    //   setParking(checked)
    // }
    // if(e.target.name === 'breakfast') {
    //   setBreakfast(checked)
    // }
    // if(e.target.name === 'pets') {
    //   setPets(checked)
    // }

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
    // media: [media],
    price: price,
    maxGuests: maxGuests,
    rating: rating,
    location, 
    meta,
  }

    inputs.media = media

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(inputs);
    PutWithToken(`${BASE_URL}${VENUES}${id}`, inputs, id);
  }

  function handleDeleteVenue() {
    if(window.confirm("Are you sure you want to delete this venue?")) {
      DeleteVenueWithToken(`${BASE_URL}${VENUES}${id}`)
    }
  }
  
  return (
    <div>
    <h2>EditVenue</h2>
      <form onSubmit={handleEdit}>
        <div className="textfieldInputsGroup">
          <div className="textfieldInputsGroup2">
            <TextField
              fullWidth
              autoFocus={true}
              id="outlined-multiline-flexible"
              label="Name"
              name="name" 
              // value={inputs.name} 
              defaultValue={venue.name }
              onChange={handleChange}
            />
          </div>
          <div className="textfieldInputsGroup3">
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              name="description" 
              // value={inputs.description} 
              defaultValue={venue.description }
              onChange={handleChange}
              multiline
              maxRows={10}
            />
          </div>
          <div className="textfieldInputsGroup2">

           {/* {venue.media.length > 0 
            ? venue.media.map((image) => {
            <div>eee</div>
           }) 
           
           : ""} */}
            <TextField
                fullWidth
                multiline
                id="outlined-multiline-flexible"
                label="Media"
                name="media" 
                // value={inputs.media} 
                defaultValue={venue.media}
                onChange={handleChange}
                placeholder="Img1 img2 img3"
              />
          </div>
          <div className="textfieldInputsGroup2">
            <TextField
              id="outlined-multiline-flexible"
              label="Price"
              name="price" 
              // value={inputs.price || venue.price || 0} 
              defaultValue={venue.price} 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0, max: 99999999 }}
              type="number"
              onChange={handleChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Max Guests"
              name="maxGuests" 
              // value={inputs.maxGuests || venue.maxGuests || 0} 
              defaultValue={venue.maxGuests}
              placeholder="Max 100"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 , max: 100 }}
              type="number"
              onChange={handleChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Rating"
              name="rating" 
              // value={inputs.rating || venue.rating || 0} 
              defaultValue={venue.rating}
              placeholder="Max 5"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0, max: 5 }}
              type="number"
              onChange={handleChange}
            />
          </div>
          <div className="textfieldInputsGroup2">
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              name="address" 
              // value={inputs.location.address || location.address || ""} 
              defaultValue={location.address}
              onChange={handleChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="City"
              name="city" 
              // value={inputs.location.city || location.city || ""} 
              defaultValue={location.city}
              onChange={handleChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Zip"
              name="zip" 
              // value={inputs.location.zip || location.zip || ""} 
              defaultValue={location.zip}
              placeholder="0000"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0, max: 9999 }}
              type="number"
              onChange={handleChange}
            />
          </div>
          <div className="textfieldInputsGroup2">
            <TextField
              id="outlined-multiline-flexible"
              label="Country"
              name="country" 
              // value={inputs.location.country || location.country || ""} 
              defaultValue={location.country}
              onChange={handleChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Continent"
              name="continent" 
              // value={inputs.location.continent || location.continent || ""} 
              defaultValue={location.continent}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Meta */}
        <div className="meta">
          <label>Wifi:
              <input 
                type="checkbox" 
                name="wifi" 
                // value={inputs.wifi } 
                defaultChecked={meta.wifi}
                onChange={handleChange}
              />
          </label>
          <label>Parking:
              <input 
                type="checkbox" 
                name="parking" 
                // value={inputs.parking } 
                defaultChecked={meta.parking}
                onChange={handleChange}
              />
          </label>
          <label>Breakfast:
              <input 
                type="checkbox" 
                name="breakfast" 
                // value={inputs.breakfast } 
                defaultChecked={meta.breakfast}
                onChange={handleChange}
              />
          </label>
          <label>Pets:
              <input 
                type="checkbox" 
                name="pets" 
                // value={inputs.pets } 
                defaultChecked={meta.pets}
                onChange={handleChange} 
              />
          </label>
        </div>
        
        <Button 
          size="small"
          variant="contained" 
          className="defaultButton"
          id="defaultButton"
          type="submit"
          >
          Submit edit
        </Button>
        <i class="fa-solid fa-trash fa-xl" onClick={handleDeleteVenue}></i>  
      </form>
    </div>
  )
}

async function PutWithToken(url, data) {
  console.log(data);
  // let id = useParams();
  try {
    console.log(url, data);
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };

    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    console.log(json);

    if(json.id) {
      window.location.replace(`/${VENUES}${json.id}`)
    }

    
  } catch(error) {
    console.log(error);
  }
}

async function DeleteVenueWithToken(url) {
  try {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    
    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  } finally {
    window.location.replace("/overview");
  }
}