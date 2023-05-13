import { Card, Col, Container, Row } from "react-bootstrap"
import { Box, TextField, Button } from "@mui/material"

export default function Contact() {
  document.title = `Contact`
  return (
    <Container>
      <h1>Got any questions, here you can contact our staff directly</h1>
      <p>Please note that ansers might take up to 7 working days.</p>
      <Row className="justify-content-md-center">
        <Col md="auto">

          <div className="text-center">
              <Card 
                style={{ width: '20rem' }}
                className="text-center">
                    {/* <Card.Body>
                      <Card.Title>Contact Form</Card.Title>
                      <TextField id="outlined-basic" label="Name" variant="outlined" />
                      <TextField id="outlined-basic" label="Email" variant="outlined" />
                      <TextField id="outlined-basic" label="Text" variant="outlined" />
                    </Card.Body> */}
              <Card.Title>Contact Form</Card.Title>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className="defaultForm"
                >
                <div>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Your name *"
                    placeholder="Write your name"
                    multiline
                    maxRows={4}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Your Email *"
                    placeholder="Write your Email"
                    multiline
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="Subject *"
                    multiline
                    rows={4}
                    placeholder="Please write a brief explanation of your question"
                  />
                  <Button 
                        size="small"
                        variant="contained" 
                        className="defaultButton"
                        id="defaultButton"
                        >
                        Submit Form
                      </Button>
                </div>
              </Box>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>

    
  )
}
