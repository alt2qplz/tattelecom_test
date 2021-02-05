import React from 'react'
import preloaderGIF from '../../assets/Ring-Preloader.gif'

const Preloader: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={preloaderGIF} alt="Loading..."/>
    </div>
  )
}

export default Preloader
