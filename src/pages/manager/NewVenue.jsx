import { useState } from "react";

// import { BASE_URL, VENUES } from "../constants/API"
import { BASE_URL, VENUES, isManager, token } from "../../constants/API";
import ProfileNav from "../../components/ProfileNav";
import { Button, TextField } from "@mui/material";

export default function NewVenue() {
  if(!token) {
    window.location.replace("/")
  }
  if(!isManager) {
    window.location.replace("/profile")
  }
  document.title = `New Venue`

  const [media, setMedia] = useState([]);

  // Location
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);

  const [inputs, setInputs] = useState({})

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;

    setInputs(values => ({...values, [name]: value}))
    // console.log(inputs);
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
      setWifi(checked)
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

    if(e.target.name === "media") {
      let txt = value
      const media = txt.split(",")
      setMedia(media)
      console.log(media);
    }
    
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
  
  // let media = inputs.media
  // let media1
  // if(media) {
  //   media.split(" ")
  //   console.log("mediaFetch = " + typeof(media));
  //   media1 = media[0]
  // }
  // inputs.media = media1

  inputs.media = media
  inputs.location = location
  inputs.meta = meta;

  const handleNewVenue = (e) => {
    e.preventDefault();

    delete inputs["address"];
    delete inputs["city"];
    delete inputs["zip"];
    delete inputs["country"];
    delete inputs["continent"];

    delete inputs["wifi"];
    delete inputs["parking"];
    delete inputs["breakfast"];
    delete inputs["pets"];
    inputs.price = parseFloat(inputs.price) 
    inputs.maxGuests = + parseFloat(inputs.maxGuests) 
    inputs.rating = + parseFloat(inputs.rating) 

    console.log(inputs);
    postWithToken(`${BASE_URL}${VENUES}`, inputs);
  }
  return (
    <>
      <div className="profileContent">
        <ProfileNav/>

        <div>
          <h2>Create a new Venue</h2>
          <form onSubmit={handleNewVenue}>
            <div className="textfieldInputsGroup">
              <div className="textfieldInputsGroup2">
                <TextField
                  autoFocus={true}
                  id="outlined-multiline-flexible"
                  label="Name"
                  name="name" 
                  value={inputs.name} 
                  onChange={handleChange}
                  
                />
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Media"
                  name="media" 
                  value={inputs.media} 
                  onChange={handleChange}
                  placeholder="Img1 img2 img3"
                />
              </div>
              <div className="textfieldInputsGroup3">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Description"
                  name="description" 
                  value={inputs.description} 
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
                  value={inputs.price} 
                  placeholder=""
                  onChange={handleChange}
                  type="number"
                />
                <TextField
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  id="outlined-multiline-flexible"
                  label="Max Guests"
                  name="maxGuests" 
                  value={inputs.maxGuests} 
                  placeholder="Max 100"
                  onChange={handleChange}
                />
                <TextField
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  id="outlined-multiline-flexible"
                  label="Rating"
                  name="rating" 
                  value={inputs.rating} 
                  placeholder="Max 5"
                  onChange={handleChange}
                />
              </div>
              <div className="textfieldInputsGroup2">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Address"
                  name="address" 
                  value={inputs.location.address} 
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="City"
                  name="city" 
                  value={inputs.location.city} 
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Zip"
                  name="zip" 
                  value={inputs.location.zip} 
                  placeholder="0000"
                  onChange={handleChange}
                />
              </div>
              <div className="textfieldInputsGroup2">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Country"
                  name="country" 
                  value={inputs.location.country} 
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Continent"
                  name="continent" 
                  value={inputs.location.continent} 
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="meta">
              {/* Meta */}
              <label>Wifi:
                  <input 
                    type="checkbox" 
                    name="wifi" 
                    value={inputs.wifi} 
                    onChange={handleChange}
                  />
              </label>
              <label>Parking:
                  <input 
                    type="checkbox" 
                    name="parking" 
                    value={inputs.parking} 
                    onChange={handleChange}
                  />
              </label>
              <label>Breakfast:
                  <input 
                    type="checkbox" 
                    name="breakfast" 
                    value={inputs.breakfast} 
                    onChange={handleChange}
                  />
              </label>
              <label>Pets:
                  <input 
                    type="checkbox" 
                    name="pets" 
                    value={inputs.pets} 
                    onChange={handleChange}
                  />
            </label>
            </div>

            <div className="center">
              <Button 
                size="small"
                variant="contained" 
                className="defaultButton"
                id="defaultButton"
                type="submit"
                >
                Submit New Venue
              </Button>
            </div>
          </form>
            {/* Autocomplete for countries and/or continents? https://www.w3schools.com/howto/howto_js_autocomplete.asp */}
        </div>
      </div>
    </>

  )
}


async function postWithToken(url, data) {
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

    if(json.id) {
      window.location.replace(`/${VENUES}${json.id}`)
      return
    }

  } catch(error) {
    console.log(error);
  }
}