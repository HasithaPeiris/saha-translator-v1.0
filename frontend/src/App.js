import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Layout from './components/Layout';
import FullDictionary from './components/FullDictionary';
import Translate from './components/Translate/Translate'
import CheckerDemo from './components/GrammerCheck/CheckerDemo'
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';

function App() {
  return(

<BrowserRouter>
<Routes>
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home />} />
    <Route path="dictionary" element={<FullDictionary />} />
    <Route path="translator" element={<Translate/>}/>
    <Route path= "grammerCheck" element={<CheckerDemo/>}/>
    <Route path="contactUs" element={<ContactUs/>}/>
    <Route path="aboutUs" element={<AboutUs/>}/>
  </Route>
</Routes>
</BrowserRouter>
  );
}

export default App;
