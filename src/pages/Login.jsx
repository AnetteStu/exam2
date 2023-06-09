import { TextField, Button, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from "@mui/material"
import { Link } from "react-router-dom"
import { BASE_URL, LOGIN } from "../constants/API"
import { useState } from 'react';

import { user } from "../constants/API";

export async function login (url, data) {
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

    if(json.accessToken) {
      const accessToken = json.accessToken;
      const username = json.name
      const manager = json.venueManager
      const avatar = json.avatar
      const email = json.email

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('username', username )
      localStorage.setItem('manager', manager)
      localStorage.setItem('avatar', avatar)
      localStorage.setItem('email', email)
      
      window.location.replace(`/profile`);
    }

    if(json.statusCode === 401 || json.statusCode === 400) {
      window.alert(`Login attempt failed, please try with another email/password! Message: ${json.errors[0].message}`)
    }
    
  } catch (error) {
    console.log(error);
  }
}


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if(user) {
    window.location.replace("/")
  }

  document.title = `Login`
    
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();
    setInputs(values => ({...values, [name]: value}))
    console.log(inputs);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login(`${BASE_URL}${LOGIN}`, inputs);
  }

  return (
  <form onSubmit={handleLogin} className="form">
    <h2>Welcome back!</h2>

    <div className="textfieldInputsGroup">
      <div className="textfieldInputsGroup2">
        <TextField
          required
          fullWidth
          autoFocus={true}
          id="outlined-multiline-flexible"
          label="Email"
          name="email" 
          // inputProps={{pattern: "/^\S+@\S+\.\S+$/" }}
          placeholder="name@domain.com"
          value={inputs.email || ""} 
          onChange={handleChange}
        />
      </div>
      <div className="textfieldInputsGroup2">
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" style={{margin:0}}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            required
            name="password"
            id="password"
            value={inputs.password} 
            onChange={handleChange}
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
        Login
      </Button>
    </div>
        Don't have an account? <Link to="/register"> Register!</Link>  
  </form>
  )
}
