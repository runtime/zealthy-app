import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MaterialTheme from './styles/MaterialTheme';
import ContextProvider from './context/ContextProvider';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import CreateUser from './components/CreateUser';
import Card from './components/Card';
import Admin from './components/Admin';
import ShowUsers from './components/ShowUsers';

const App = () => {
  return (
      <MaterialTheme> {/* Wrap everything with MaterialTheme */}
        <ContextProvider>
          <Router>
            <Header />
            <Breadcrumbs />
            <Routes>
              <Route path="/create-account" element={<CreateUser />} />
              <Route path="/create-account-2" element={<Card step="2" />} />
              <Route path="/create-account-3" element={<Card step="3" />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/users" element={<ShowUsers />} />
            </Routes>
          </Router>
        </ContextProvider>
      </MaterialTheme>
  );
};

export default App;
