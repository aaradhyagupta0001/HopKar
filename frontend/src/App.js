import React from 'react';
import PostJob from './pages/PostJob';
import VendorFeed from './pages/VendorFeed';
import PartnerFeed from './pages/PartnerFeed';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <h1 style={{textAlign:'center'}}>HopKar 🏃‍♀️ Hyper-local Services</h1>
      <PostJob />
      <VendorFeed />
      <PartnerFeed />
    </div>
  );
}

export default App;
