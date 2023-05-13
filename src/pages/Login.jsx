import { TextField, Button, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from "@mui/material"
// import VisibilityOff from "@mui/"
import { Link } from "react-router-dom"
import { BASE_URL, LOGIN } from "../constants/API"
import { useState } from 'react';

import { user } from "../constants/API";
export async function login (url, data) {
  console.log(url, data);
  // window.location.href(`/profile/+ ${user}`)
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
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
    console.log(inputs);

    // if(e.target.id === "password") {
    //   console.log(e.target.value);
    // }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(inputs);
    login(`${BASE_URL}${LOGIN}`, inputs);
  }

  return (
  <form onSubmit={handleLogin}>
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
      {/* <TextField
        // required
        fullWidth
        id="outlined-multiline-flexible"
        label="Password"
        name="password" 
        value={inputs.password || ""} 
        onChange={handleChange}
        placeholder="password"
      /> */}

      {/* <label>Enter your email:
        <input 
          type="email" 
          name="email" 
          value={inputs.email || ""} 
          onChange={handleChange}
        />
        </label> */}
      {/* <label>Enter your password:
      <input 
        type="password" 
        name="password" 
        value={inputs.password || ""} 
        onChange={handleChange}
      />
      </label> */}
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
