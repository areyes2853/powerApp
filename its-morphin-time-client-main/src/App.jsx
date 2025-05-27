// src/App.jsx
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import NavBar from './components/navbar/navbar';
import Home from './components/home/home';
import SeasonList from './components/season/SeasonList';
import SeasonDetail from './components/season/SeasonDetail';
import SeasonForm from './components/season/SeasonForm';
import CharactersPage from './components/characters/CharactersPage';
import CharacterDetail from './components/characters/CharacterDetail';
import CharacterForm from './components/characters/CharacterForm';
import MegazordPage from './components/megazord/MegazordPage';
import MegazordDetail from './components/megazord/MegazordDetail';
import MegazordForm from './components/megazord/MegazordForm';
import Footer from './components/footer/footer';

import * as Services from './components/services/services';
import { getAllRangers } from './services/rangerService';
import { getAllMegazords } from './services/megazordService';

const MegazordFormRoute = () => {
  return <MegazordForm onSubmit={() => window.location.href = "/megazords"} />;
};


const AppWrapper = () => {
  const navigate = useNavigate();

  const [seasons, setSeasons] = useState([]);
  const [rangers, setRangers] = useState([]);
  const [megazords, setMegazords] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const fetchedSeasons = await Services.fetchSeasons();
        const fetchedRangers = await getAllRangers();
        const fetchedMegazords = await getAllMegazords();
        setSeasons(fetchedSeasons || []);
        setRangers(fetchedRangers || []);
        setMegazords(fetchedMegazords || []);
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    };

    fetchAllData();
  }, []);

  const handleFormView = () => setIsFormOpen(!isFormOpen);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            seasons={seasons}
            characters={rangers}
            megazords={megazords}
          />
        }
      />
      <Route path="/seasons" element={<SeasonList />} />
      <Route
        path="/seasons/:id"
        element={<SeasonDetail isFormOpen={isFormOpen} handleFormView={handleFormView} />}
      />
      <Route
        path="/seasons/new"
        element={<SeasonForm onSubmit={() => navigate("/seasons")} />}
      />
      <Route path="/characters" element={<CharactersPage characters={rangers} />} />
      <Route
        path="/characters/:id"
        element={<CharacterDetail isFormOpen={isFormOpen} handleFormView={handleFormView} />}
      />
      <Route
        path="/characters/new"
        element={<CharacterDetail isFormOpen={true} handleFormView={() => {}} />}
      />
      <Route path="/megazords" element={<MegazordPage key={Date.now()} />} />
      <Route
        path="/megazords/:id"
        element={<MegazordDetail isFormOpen={isFormOpen} handleFormView={handleFormView} />}
      />
      <Route
        path="/megazords/new"
        element={<MegazordFormRoute />}
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <NavBar />
      <AppWrapper />
      <Footer />
    </Router>
  );
};

export default App;