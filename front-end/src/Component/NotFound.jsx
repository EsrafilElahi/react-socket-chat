import React from "react";
import { Link } from "react-router-dom";


function NotFound() {
  return (
    <div className='not-found'>
      <p>there is nothing here 404 NotFound</p>
      <Link to='/'>Go Home</Link>
    </div>
  );
}

export default NotFound;
