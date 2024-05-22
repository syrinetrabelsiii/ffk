import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Hero.css';
import '../../index.css';
import home from "../../assets/h.gif";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className='paddings innerWidth flexCenter hero-container'>
        <div className='hero-left'>
          <div className='hero-title'>
            <h>Welcome <br/>
              To Our<br/>
              Website<br/>
            </h>
          </div>
          <div className='hero-des'>
            <span>Discover a world of excitement at BidBay, your premier online auction platform.</span>
            <span>BidBay has something for everyone.</span>
          </div>
        </div>
        <div className='flexCenter hero-right'>
          <div className='image-container'>
            <img src={home} alt=''/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

