


export default function Rating(props) {
  let rating = props.stars
  
  // console.log(rating);
  return Array.from(Array(5)).map((item, index) => {
    if(index < rating) {
      return (<i className="fa-solid fa-star" key={index}></i>)
    } return (<i className="fa-regular fa-star" key={index}></i>)
  })  
}
