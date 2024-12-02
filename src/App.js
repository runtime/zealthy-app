import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from './components/Card';
import ContextProvider from './context/ContextProvider';
import CreateUser from './components/CreateUser';
import Admin from './components/Admin';
import ShowUsers from './components/ShowUsers';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Complete from './components/Complete';
import Breadcrumbs from './components/Breadcrumbs';
import Header from './components/Header';

const App = () => {
  return (
      <ContextProvider>
        <Router>
          <Header />
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-account" element={<CreateUser />} />
            <Route path="/user-onboarding-1" element={<Card step={0} />} />
            <Route path="/user-onboarding-2" element={<Card step={1} />} />
            <Route path="/user-onboarding-3" element={<Complete />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/users" element={<ShowUsers />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ContextProvider>
  );
};

export default App;



