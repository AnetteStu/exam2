import { Route, Routes } from 'react-router-dom';
import Container from "@mui/material/Container"
import './styling/css/customMUI.css'

// Ract Router Elements
import Layout from './components/Layout';

import Landing from './pages/Landing';
import Venues from './pages/Venues';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Details from './pages/Details';
import Profile from './pages/profile/Profile';
import Bookings from './pages/profile/Bookings';
import Settings from './pages/profile/Settings';
import Overview from './pages/manager/Overview';
import NewVenue from './pages/manager/NewVenue';
import EditVenue from './pages/manager/EditVenue';
import BookingPage from './pages/BookingPage';
import BookingSuccess from './components/BookingSuccess';
import Navigation from './components/Navigation';
import NoPage from './pages/NoPage';
import Booking from './pages/profile/Booking';


function App() {
  return (
    <>

      <Navigation/>
      <Container maxWidth="lg">
        <div className="App">
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Landing/>}/>
              <Route path='/venues' element={<Venues/>}/>
              <Route path='/venues/:id' element={<Details/>}/>
              <Route path='/about' element={<About/>}/>

              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>

              <Route path='/profile/' element={<Profile/>}/>
              <Route path='/bookings/' element={<Bookings/>}/>
              <Route path='/bookings/:id' element={<BookingSuccess/>} />
              <Route path='/settings/' element={<Settings/>}/>

              <Route path='/newbooking/:id' element={<BookingPage/>} />
              <Route path='/booking/:id' element={<Booking/>} />
              
              <Route path='/overview/' element={<Overview/>}/>
              <Route path='/new/' element={<NewVenue/>}/>
              <Route path='/edit/:id' element={<EditVenue/>} />
              <Route path='*' element={<NoPage/>} />
              <Route path='/venues/*' element={<NoPage/>} />
            </Route>
          </Routes>
        </div>
      </Container>
    </>
  );
}

export default App;
