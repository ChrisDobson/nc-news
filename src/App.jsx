import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SingleArticle from './components/SingleArticle';
import Footer from './components/Footer';
import './App.css'

export default function App() {
  return (
    <div className='App'>
     <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/articles/:article_id' element={<SingleArticle/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}