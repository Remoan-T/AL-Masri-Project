import React, { Suspense } from 'react'

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import './customScrollbar.scss'

// ** Router Import
import Router from './router/Router'

const App = () => {
  const options = {
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch']
 
  };

  return (
    <PerfectScrollbar  options={options} className='custom-scrollbar'>
    <Suspense  fallback={null}>
      <Router />
    </Suspense>
    </PerfectScrollbar>
    
  )
}

export default App
