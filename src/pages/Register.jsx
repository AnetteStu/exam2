import { TextField, Button, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from "@mui/material"
import { Link } from "react-router-dom"
import { BASE_URL, REGISTER, LOGIN, user } from "../constants/API"

import { useState } from 'react';
import { login } from "./Login";


export default function Register() {

  async function RegisterUser (url, data) {
    // const [error, setError] = useState("")
    console.log(url, data);
    try {
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };
  
      const res = await fetch(url, postData);
      const json = await res.json();
  
      console.log(json);
      
      if(json.statusCode === 400) {
        window.alert(json.errors[0].message)
      }
  
      if(json.id) {
        const loginUrl = `${BASE_URL}${LOGIN}`
        const loginData = {
          email: json.email,
          password: data.password
        }
        login(loginUrl, loginData)
      }
      
  
    } catch (error) {
      console.log(error);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if(user) {
    window.location.replace("/profile/")
  }

  document.title = `Register`
  const [inputs, setInputs] = useState({});

  // const testuser = {
  //   name: "kadstestest",
  //   email: "kadstestest@noroff.no",
  //   avatar: "",
  //   venueManager: true,
  //   password: "someawesomepasswordagain"
  // }
  // console.log(testuser);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.name === "email") {
      console.log(value);
      if(value.toLowerCase().includes("@stud.noroff.no") ) {
        inputs.venueManager = true
        console.log(inputs);
      }
    }
    setInputs(values => ({...values, [name]: value}))
  }

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(inputs);
    RegisterUser(`${BASE_URL}${REGISTER}`, inputs);
  }

  return (
    <>
    <form onSubmit={handleRegister}>
    <h2>Welcome back!</h2>
    <div className="textfieldInputsGroup">
      <div className="textfieldInputsGroup2">
        <TextField
          required
          fullWidth
          autoFocus={true}
          // id="outlined-multiline-flexible"
          label="Name"
          name="name" 
          value={inputs.name || ""} 
          onChange={handleChange}
        />
      </div>
      <div className="textfieldInputsGroup2">
        <TextField
            fullWidth
            // id="outlined-multiline-flexible"
            label="Media"
            name="media" 
            value={inputs.media} 
            onChange={handleChange}
            placeholder="Img1"
          />
      </div>
      <div className="textfieldInputsGroup2">
        <TextField
          required
          fullWidth
          // id="outlined-multiline-flexible"
          label="Email"
          name="email" 
          value={inputs.email || ""} 
          onChange={handleChange}
        />
        </div>
        <div className="textfieldInputsGroup2">
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" style={{margin:0}} required>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              required
              name="password"
              id="password"
              value={inputs.password} 
              onChange={handleChange}
              // id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? "Ø" : "O"}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </div>
      <div className="center">
        <Button 
          size="small"
          variant="contained" 
          className="defaultButton"
          id="defaultButton"
          type="submit"
          >
          Register
        </Button>
      </div>
      Already have an account? <Link to="/login"> Log in!</Link>  
    </form>
    {/* <form onSubmit={handleRegister}>
    To Book a venue, please register!<br/>
      <label>Enter your name:
      <input 
        type="text" 
        name="name" 
        value={inputs.name || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your email:
        <input 
          type="email" 
          name="email" 
          value={inputs.email || ""} 
          onChange={handleChange}
        />
        </label>
      <label>Enter your password:
      <input 
        type="password" 
        name="password" 
        value={inputs.password || ""} 
        onChange={handleChange}
      />
      </label>

      <label>Image:
      <input 
        type="file" 
        name="avatar" 
        value={inputs.avatar || undefined} 
        onChange={handleChange}
      />
      </label>
        <input type="submit" />
        Already have an account? <Link to="/login"> Log in!</Link>  
    </form> */}
    </>
  )
}
