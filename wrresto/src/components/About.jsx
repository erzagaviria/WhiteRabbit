import React from "react";
import "./About.css";
import restaurantImage from "../assets/images/restaurant.jpg"; // Pastikan path benar

const About = () => {
  return (
    <section id="about" className="about">
      <img src={restaurantImage} alt="Our Restaurant" />
      <div className="about-text">
        <h2>
          About <span>WR</span> Resto
        </h2>
        <p>
          WR Resto is a modern restaurant dedicated to offering a wide variety
          of meals from around the world. We source the freshest ingredients,
          ensuring that each dish is bursting with flavor and cooked to
          perfection. Our mission is to bring you happiness through delicious
          food and excellent service, creating a place where every meal feels
          like a special occasion.
        </p>
        <p>
          At WR Resto, we believe in providing an unforgettable dining
          experience. Our menu includes a diverse range of meals, from hearty
          steaks to fresh salads, flavorful pastas, and mouth-watering desserts.
          We embrace both traditional recipes and contemporary twists, ensuring
          that there’s something for everyone. Whether you're craving comfort
          food or an exotic dish, our skilled chefs prepare every meal with the
          utmost care and attention to detail.
        </p>
        <p>
          The atmosphere at WR Resto is warm and welcoming, perfect for both
          casual dining and special celebrations. We offer both indoor seating
          and outdoor terraces where guests can enjoy their meals while soaking
          up the view. Our friendly and professional staff are dedicated to
          providing top-notch service, making sure that each visit to our
          restaurant is an enjoyable and memorable one.
        </p>
        <p>
          From lunch to dinner, WR Resto is the place to be for food lovers.
          Come and discover the variety and richness of flavors, and let us take
          you on a culinary journey that will leave you wanting more. We can’t
          wait to welcome you to our restaurant and treat you to an
          unforgettable dining experience!
        </p>
      </div>
    </section>
  );
};

export default About;
