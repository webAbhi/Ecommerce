import React from "react";
import Menu from "./Menu";
const Base  = ({
  title = "My title",
  description = "My description",
  className = "bd-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>

        <div className={className}> {children} </div>
      </div>
      <footer className="footer mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center">
          <h5> Please contact for any question</h5>
          <button className="btn btn-warning btn-large">Contact Us</button>
          <div className="container-fluid text-center">
            <span className="text-secondary text-muted ">An place to buy unique tshirts</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
