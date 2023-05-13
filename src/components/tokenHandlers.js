import { VENUES, token, user } from "../constants/API";
import Overview from "../pages/manager/Overview";

export async function GetWithToken(url) {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

    const res = await fetch(url, fetchOptions);
    const json = await res.json();

    console.log(json);

  } catch(error) {
    console.log(error);
  }
}

export async function GetVenues(url) {
  // const [venues, setVenues] = useState([])
  try {
    // console.log(url);
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    // setVenues(json)
    console.log(json.id);

    return (
      <>
      {/* <Overview
          id = {json.id}
          name = {json.name}
        /> */}
        <div>
          {json.map((venue) => (
            <Overview key={venue.id}
              id = {venue.id}
              name = {venue.name}
            />
          ))}
        </div>
      </>
    )

  } catch(error) {
    console.log(error);
  } 
}


// export function RenderVenues({id, created, description, location, maxguests, media, meta, name, price, rating, updated }) {
//   return (
//     <div key={id}>
//       title: {name}
//     </div>
//   )
// }

export async function PutWithToken(url, data) {
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

    // if(data.avatar) {
    //   localStorage.setItem('avatar', json.avatar)
    // }
    // window.location.reload()
    window.location.replace(`/${VENUES}${json.id}`)

    
  } catch(error) {
    console.log(error);
  }
}

export async function postWithToken(url, data) {
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
    }

  } catch(error) {
    console.log(error);
  }
}

// export async function bookWithToken(url, data) {
//   try {
//     console.log(url, data);
//     const fetchOptions = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(data)
//     };

//     const res = await fetch(url, fetchOptions);
//     const json = await res.json();

//     console.log(json);

//     window.location.replace("/bookings/")

//   } catch(error) {
//     console.log(error);
//   }
// }

export async function editWithToken(url, data) {
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

    window.location.replace(`/${VENUES}${json.id}`)

  } catch(error) {
    console.log(error);
  }
}

export async function getProfile(url) {

  if(user) { 
    try {
      // console.log(url);
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      };
  
      const res = await fetch(url+user, fetchOptions);
      const json = await res.json();
  
      console.log(json);
  
    } catch(error) {
      console.log(error);
    }
  }
}

export async function deleteWithToken(url, data) {
  try {
    console.log(url, data);
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };

    const res = await fetch(url, fetchOptions);
    const json = await res.json();

    console.log(json);

  } catch(error) {
    console.log(error);
  }
}