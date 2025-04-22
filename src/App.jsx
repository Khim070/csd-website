import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { API_ENDPOINTS, API } from './Service/APIconfig';
import axios from 'axios';
import PageRenderer from './Component/PageRenderer';

function App() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axios.get(API_ENDPOINTS.getPage)
      .then(res => {
        const pageData = res.data?.data || [];
        setPages(pageData);
      })
      .catch(err => console.error('Error fetching pages:', err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        {pages.map(page => (
          <Route
            key={page.p_id}
            path={page.p_alias}
            element={<PageRenderer page={page} />}
          />
        ))}
      </Routes>
    </Router>
  )
}

export default App
