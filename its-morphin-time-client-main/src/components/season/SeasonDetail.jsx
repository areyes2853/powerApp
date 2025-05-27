import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as Services from '../services/services';
import SeasonForm from './SeasonForm';
import './SeasonDetail.css';

const SeasonDetail = ({ isFormOpen, handleFormView }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch season and assemble rangers + megazords
  const fetchSeason = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get the season (populated with 'rangers' and 'megozords')
      const season = await Services.fetchSeasonDetails(id);
      if (season.err) throw new Error(season.err);

      // 2. Filter all characters for this season
      const allRangers = await Services.fetchCharacters();
      const rangers = (allRangers || []).filter(r => r.season === id);

      // 3. Use populated megozords from the fetched season
      const allMegards = await Services.fetchMegazords()
      const megazords = (allMegards || []).filter(m => m.firstAppearedInSeason === id);

      // 4. Merge into state under 'rangers' and 'megazords'
      const merged = {
        ...season,
        rangers,
        megazords
      };
      console.log('Merged payload →', merged);
      setSeasonDetails(merged);
      
    } catch (err) {
      setError(err.message || 'Failed to load season data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeason();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this season?')) return;
    await Services.deleteSeason(id);
    navigate('/seasons');
  };

  const handleFormSubmit = () => {
    handleFormView();
    fetchSeason();
  };


  if (loading) return <div>Loading season...</div>;
  if (error || !seasonDetails) return <div>{error || 'No data found.'}</div>;

  return (
    <div className="season-detail-container">
      <div className="season-info">
        <h1>{seasonDetails.name} (Season {seasonDetails.seasonNumber})</h1>
        

        {seasonDetails.img && (
          <img
            src={seasonDetails.img}
            alt={seasonDetails.name}
            className="season-image"
          />
        )}
         

        <p><strong>Sentai Name:</strong> {seasonDetails.sentaiName}</p>
        <p><strong>Airing Year:</strong> {seasonDetails.airingYear}</p>
        <p><strong>Number of Episodes:</strong> {seasonDetails.numberOfEpisodes}</p>
        <p><strong>First Episode:</strong> {seasonDetails.firstEpisode}</p>
        <p><strong>Last Episode:</strong> {seasonDetails.lastEpisode}</p>
        <p><strong>Theme:</strong> {seasonDetails.theme}</p>
        <p><strong>Producer:</strong> {seasonDetails.producer}</p>
        <p><strong>Comment:</strong> {seasonDetails.comment || 'None'}</p>

        {/* Megazords */}
        {seasonDetails.megazords && seasonDetails.megazords.length > 0 ? (
          <>
       
            <h3>Megazords</h3>
            <ul>
              {seasonDetails.megazords.map(zord => (
                <li key={zord._id}>
                  <Link to={`/megazords/${zord._id}`}>{zord.name}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p><strong>Megazords:</strong> None listed</p>
        )}

        {/* Rangers */}
        {seasonDetails.rangers && seasonDetails.rangers.length > 0 ? (
          <>
            <h3>Rangers</h3>
            <ul>
              {seasonDetails.rangers.map(ranger => (
                <li key={ranger._id}>
                  <Link to={`/characters/${ranger._id}`}>{ranger.name}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p><strong>Rangers:</strong> None listed</p>
        )}

        <Link to="/seasons">← Back to Seasons</Link>

        <button onClick={handleFormView}>
          {isFormOpen ? 'Close Form' : 'Edit Season'}
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete Season
        </button>
      </div>

      {isFormOpen && (
        <div className="season-form-wrapper">
          <SeasonForm existingData={seasonDetails} onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default SeasonDetail;
