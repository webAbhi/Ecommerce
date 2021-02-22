import React from 'react';
import Menu from './Menu';
const Base = ({
  title="My title",
  description = "My description",
  className="bd-dark text-white p-4",
  children
}) => {

    return(
        <div>
        <Menu />
          <div className="container-fluid">
          
            <div className="jumbotron bg-dark text-white text-center">
                <h2 className= "display-4">{title}</h2>
                <p className="lead">{description}</p>
            </div>

            <div className={className}> {children} </div>
        
          </div>
          <footer className="footer bg-dark mt-auto py-3">
          <div className="container-fluid bg-success text-white text-center">
            <h5> Please contact for any question</h5>
            <button className="btn btn-warning btn-large">Contact Us</button>
          </div>
          <div className="container text-center">
           <span className="text-muted ">
               An place to buy unique tshirts  
           </span>  
          </div>      
          </footer>        
        </div>
    )
}

export default Base;