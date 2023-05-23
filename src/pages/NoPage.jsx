import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div>
      <h1>Ops! Seems like you're lost!</h1>
      <Link to="/">Take me back to safe ground!</Link>
    </div>
  )
}
