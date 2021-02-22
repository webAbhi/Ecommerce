import React from 'react';
import "../styles.css"
import Base from './Base';
import {API} from "../backend";

export default function Home() {

    return(
        <Base>
          <h1 className="text-white">Hi front end</h1>
          <div className="row">
            <div className="col-4">
              <button className="btn btn-success">TEST</button>

            
            
            </div>
            <div className="col-4">
              <button className="btn btn-success">TEST</button>
               
            
            </div>
            <div className="col-4">

            <button className="btn btn-success">TEST</button>
              
            
            </div>
          </div>
          
        
        </Base>
    )
}