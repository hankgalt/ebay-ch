import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Weather from '../pages/Weather';
import Images from '../pages/Images';

const containerStyle = {
  margin: '2px',
};

const App = () => {
  return (
    <div style={{ height: '100%', minHeight: '90vh', overflowY: 'hidden' }}>
      <Router>
        <div style={containerStyle}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/weather' element={<Weather />} />
            <Route path='/images' element={<Images />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};
export default App;
