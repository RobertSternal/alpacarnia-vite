import React from 'react'
import '../App.css'
import { Button } from './Button'
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      
      <h1>ZWIERZĘTA CZEKAJĄ</h1>
      <p>Nad czym się zastanawiasz?</p>
      <div className="hero-btns">
        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
            ZAREZERUJ
        </Button>
        <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
            ZOBACZ ALPAKI
        </Button>
      </div>
    </div>
  )
}

export default HeroSection
