import React from "react";
import "./Home.css";
import heroBg1 from "../assets/images/hero-bg1.jpg";
import heroBg2 from "../assets/images/hero-bg2.jpg";
import heroBg3 from "../assets/images/hero-bg3.jpg";

const Home = () => {
  return (
    <section id="home" className="home">
      <div className="hero">
        <div className="hero-text">
          <h1>
            WELCOME TO <span>WR</span> RESTO
          </h1>
          <p>Delicious Food, made fresh for you!</p>
          <a href="#menu" className="btn">
            View Menu
          </a>
        </div>
        <div className="hero-images">
          <img src={heroBg1} alt="Bg 1" />
          <img src={heroBg2} alt="Bg 2" />
          <img src={heroBg3} alt="bg 3" />
        </div>
      </div>
    </section>
  );
};

export default Home;
