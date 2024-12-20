import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeProvider';
import Header from './components/Header';
import Home from './components/Home';
import SingleArticle from './components/SingleArticle';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import './App.css'

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [currUser, setCurrUser] = useState('guest');

  return (
    <div className={`App ${theme}`}>
     <Header toggleTheme={toggleTheme} currUser={currUser}/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/articles/:article_id' element={<SingleArticle currUser={currUser}/>}/>
      <Route path='*' element={<NotFound/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}