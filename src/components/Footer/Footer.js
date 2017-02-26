import React from 'react'
import './Footer.scss'

export const Footer = () => (
  <footer className='bt footer__border dib w-100 fl-ns'>
    <div className='flex'>
      <div className='footer__brand--logo ml2' />
    </div>
    <div className='fl w-50'>
      <ul className='list pl1'>
        <li className='mr2'><a href='#' className='f6 f5-ns b db pa2 link dim mid-gray'>About</a></li>
        <li className='mr2'><a href='#' className='f6 f5-ns b db pa2 link dim mid-gray'>Privacy Policy</a></li>
        <li className='mr2'><a href='#' className='f6 f5-ns b db pa2 link dim mid-gray'>Terms Of Service</a></li>
      </ul>
    </div>
    <div className='fl w-50'>
      <ul className='list pl1'>
        <li className='mr2'><a href='#' className='f6 f5-ns b db pa2 link dim mid-gray'>Pricing</a></li>
      </ul>
    </div>
  </footer>
)

export default Footer
