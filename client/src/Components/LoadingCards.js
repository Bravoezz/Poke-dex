import React, { useState, useEffect } from "react";
import "../Styles/Components_s/LoadingCards.css";

const LoadingCards = () => {
  const [state, setState] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setState(false)
      }, 6000);
    }, [state,setState])
    

  return (
    <>
      {state ? (
        <div className="loader">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      ) : <h1>Vacio...</h1>
      }
    </>
  );
};

export default LoadingCards;
