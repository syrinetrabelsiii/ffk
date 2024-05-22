import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './About.css';

const About = () => {
  return (
    <div id='about' className='about'>
      <Container>
        <Row className='justify-content-center'>
          <Col md={8}>
            <div className='about-title'>
              <h1>About BidBay</h1>
              <p>BidBay is an online auction platform where users can buy and sell a wide range of products through bidding. It provides a user-friendly interface for both buyers and sellers to interact and participate in auctions.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
