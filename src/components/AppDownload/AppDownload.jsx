import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
export default function AppDownload() {
  return (
    <div className='app-download' id='app-download'>
     <p>For Better Experience Download <br /> QuickBite App</p>
     <div className="app-download-plateforms">
          <a target='_blank' href="https://play.google.com/store/apps/details?id=com.application.zomato&hl=en_IN&pli=1">
            <img src={assets.play_store} alt="" />
            </a>
          <a target='_blank' href="https://apps.apple.com/in/app/zomato-food-delivery-dining/id434613896">
            <img src={assets.app_store} alt="" />
            </a>
     </div>
    </div>
  )
}
