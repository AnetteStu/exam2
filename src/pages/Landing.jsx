import * as React from 'react';

import { Card, Col, Row } from "react-bootstrap"
import { Box, TextField, Button, Slider } from "@mui/material"

import style from "../styling/css/landing.module.css";
import { Link } from "react-router-dom";

import { user } from "../constants/API";
import { useState } from 'react';


export default function Landing() {
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
    if(inputs.textInput === undefined) {
      inputs.textInput = ""
    }
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
            <Button 
              variant="contained" 
              className="defaultButton"
              id="defaultButton"
              href="/venues"              
              >Get started 
              <i className="fa-solid fa-plane-departure" />
            </Button>

        </section>
        
        <Row className="justify-content-md-center" >
          <Col md="auto" >            
              <Card 
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
              </Box>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
