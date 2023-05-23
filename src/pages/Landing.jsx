import * as React from 'react';

import { Card, Col, Row } from "react-bootstrap"
import { Box, TextField, Button, Slider } from "@mui/material"

import style from "../styling/css/landing.module.css";
import { Link } from "react-router-dom";

import { user } from "../constants/API";
import { useState } from 'react';

// function valuetext(value) {
//   return `${value}`;
// }
// const minDistance = 10;


export default function Landing() {

  // const [value2, setValue2] = React.useState([0, 37]);

  // const handleChange = (event, newValue, activeThumb) => {
  //   if (!Array.isArray(newValue)) {
  //     return;
  //   }

  //   if (newValue[1] - newValue[0] < minDistance) {
  //     if (activeThumb === 0) {
  //       const clamped = Math.min(newValue[0], 100 - minDistance);
  //       setValue2([clamped, clamped + minDistance]);
  //     } else {
  //       const clamped = Math.max(newValue[1], minDistance);
  //       setValue2([clamped - minDistance, clamped]);
  //     }
  //   } else {
  //     setValue2(newValue);
  //   }
  // };


  document.title = `Home`

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();
    setInputs(values => ({...values, [name]: value}))
    console.log(inputs);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs.textInput);
    window.location.replace(`/venues?${inputs.textInput}`)
  }
  return (
    <>
      <div className={style.bgOverlay}></div>
      <div className={style.landingBackground}></div>
      <div className={style.content}>

        <section className={style.section}>
            <div className={style.landingTxt}>
              Explore the world with <span>Holidaze</span>
            </div>
            <div className={style.slogan}>
              Check out our most popular destinations
            </div>
            {/* <div type="button" className="button">Get started <i className="fa-solid fa-plane-departure"></i></div> */}
            <Button 
              variant="contained" 
              className="defaultButton"
              id="defaultButton"
              href="/venues"
              // style=""
              
              >Get started 
              <i className="fa-solid fa-plane-departure" />
            </Button>

        </section>
        
        <Row className="justify-content-md-center" >
          <Col md="auto" >            
              <Card 
                // style={{ width: '25rem' }}
                className="text-center">
                <Card.Title></Card.Title>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className="defaultForm"
                onSubmit={handleSubmit}
                >
                <div className="textfieldInputsGroup">
                  <TextField
                    fullWidth
                    autoFocus={true}
                    id="firstInput outlined-multiline-flexible"
                    label="Your destination"
                    // sx={{
                    //   width: "100%",
                    // }}
                    style={{ width: '97%' }}
                    color="primary"
                    name='textInput'
                    onChange={handleChange}
                  />
                  <div className="textfieldInputsGroup3">
                    <TextField
                      fullWidth 
                      id=""
                      label="Guests"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      placeholder="Number of guests attending"
                      style={{ width: '97%' }}
                    />
                  </div>
                  {/* <div className="textfieldInputsGroup2">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Your destination"
                    />
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Your destination"
                    />
                  </div> */}

                  {/* <Slider
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={value2}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                  /> */}
                  
                  <Button 
                      size="small"
                      variant="contained" 
                      className="defaultButton"
                      id="defaultButton"
                      type="submit"
                      >
                      Search Venues
                    </Button>
                </div>
                {user ? <div>Check your bookings <Link to="/bookings">here</Link>!</div> : <div>Already have an account? <Link to="/login"> Log in</Link></div>}
                {/* Already have an account? <Link to="/login"> Log in</Link> */}
              </Box>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
