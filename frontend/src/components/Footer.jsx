import React from 'react'
import { Button } from './Button'
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className="footer-links">
        <div className="footer-link-wrapper">
            <div className="footer-link-items">
                <h2>O nas</h2>
                <Link to='/'>Jak działamy</Link>
                <Link to='/products'>Zwierzęta</Link>
                <Link to='/'>Goście</Link>
                <Link to='/'>Inwestorzy</Link>
                <Link to='/services'>Warunki usług</Link>
            </div>
            <div className="footer-link-items">
                <h2>Oferta</h2>
                <Link to='/products'>Spacery</Link>
                <Link to='/products'>Imprezy</Link>
                <Link to='/'>Grille</Link>
                <Link to='/'>Futro</Link>
                <Link to='/'>Sesje zdjęciowe</Link>
            </div>         
            <div class='footer-link-items'>
                <h2>Social Media</h2>
                <Link to='/'>Instagram</Link>
                <Link to='/'>TikTok</Link>
                <Link to='/'>Facebook</Link>
                <Link to='/'>Youtube</Link>
                <Link to='/'>X</Link>
            </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
            
            <small className="website-rights">ALPACARNIA C 2023</small>
            <div className="social-icons">
                <Link className="social-icon-link facebook"
                to="/"
                target="_blank"
                aria-label="Facebook"
                >
                 <i className="fa fa-facebook"></i>
                </Link>
                <Link className="social-icon-link instagram"
                to="/"
                target="_blank"
                aria-label="Instagram"
                >
                 <i className="fa fa-instagram"></i>
                </Link>
                <Link
                class='social-icon-link youtube'
                to='/'
                target='_blank'
                aria-label='Youtube'
                >
                <i class='fa fa-youtube' />
                </Link>
                <Link
                class='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='Twitter'
                >
                <i class='fa fa-twitter' />
                </Link>
                <Link
                class='social-icon-link linkedin'
                to='/'
                target='_blank'
                aria-label='LinkedIn'
                >
                <i class='fa fa-linkedin' />
                </Link>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
