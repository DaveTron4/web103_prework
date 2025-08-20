import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/LayoutComponent';
import ShowCreators from './pages/showCreators';
import AddCreator from './pages/addCreator';
import Home from './pages/home';
import EditCreator from './pages/editCreator';
import ViewCreator from './pages/viewCreator';
import './App.css'
import { supabase } from './client';

function App() {

  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase 
        .from('creators')
        .select('*');
      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        console.log('Creators:', data);
        setCreators(data);
      }
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/addCreator" element={<AddCreator />} />
          <Route path="/creators" element={<ShowCreators creators={creators}/>} />
          <Route path="/editCreator/:name" element={<EditCreator />} />
          <Route path="/viewCreator/:name" element={<ViewCreator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
