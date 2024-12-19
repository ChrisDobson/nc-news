import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeProvider';
import Header from './components/Header';
import Home from './components/Home';
import SingleArticle from './components/SingleArticle';
import TopicArticles from './components/TopicArticles';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import './App.css'

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`App ${theme}`}>
     <Header toggleTheme={toggleTheme}/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/articles/:article_id' element={<SingleArticle/>}/>
      <Route path='/topics/:topic' element={<TopicArticles/>}/>
      <Route path='*' element={<NotFound/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}