import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as Services from '../services/services';
import MegazordForm from './MegazordForm';
import './MegazordDetail.css';

const MegazordDetail = ({ isFormOpen, handleFormView }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [megazordDetails, setMegazordDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch the megazord record
      const megazord = await Services.fetchMegazordDetails(id);
      if (megazord.err) throw new Error(megazord.err);

      // 2. Get all Rangers and filter to those piloting this megazord
      const allRangers = await Services.fetchCharacters();
      const rangers = (allRangers || []).filter(r => r.megazordPiloted === id);

      // 3. Merge existing pilots with any new ones
      const existingPilots = megazord.pilotedBy || [];
      const newPilots = rangers.filter(r => !existingPilots.some(old => old._id === r._id));
      const combinedPilots = [...existingPilots, ...newPilots];

      // 4. Get all Seasons and filter those that include this megazord
      const allSeasons = await Services.fetchSeasons();
      const seasons = (allSeasons || []).filter(s => (s.magozord || []).includes(id));

      // 5. Assemble merged payload
      const merged = {
        ...megazord,
        pilotedBy: combinedPilots,
        seasons
      };
      console.log('Merged payload →', merged);
      setMegazordDetails(merged);
    } catch (err) {
      console.error(err);
      setError('Error fetching Megazord.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this Megazord?')) return;
    await Services.deleteMegazord(id);
    navigate('/megazords');
  };

  const handleFormSubmit = () => {
    handleFormView();    // close form
    fetchDetails();      // refresh updated data
  };

  if (loading) return <div>Loading Megazord...</div>;
  if (error || !megazordDetails) return <div>{error || 'No data found.'}</div>;

  return (
    <div className="megazord-detail-container">
      <div className="megazord-info">
        <h1>{megazordDetails.name}</h1>

        {megazordDetails.pictureLink && (
          <img
            src={megazordDetails.pictureLink}
            alt={megazordDetails.name}
            className="megazord-image"
          />
        )}

        <p><strong>Combined Megazord:</strong> {megazordDetails.combinedMegazord || 'None'}</p>

        <p>
          <strong>Season:</strong>{' '}
          {megazordDetails.seasons && megazordDetails.seasons.length > 0 ? (
            megazordDetails.seasons.map(s => (
              <Link key={s._id} to={`/seasons/${s._id}`}>{s.name}</Link>
            ))
          ) : (
            <span>None listed</span>
          )}
        </p>

        <div>
          <strong>Piloted By:</strong>
          {megazordDetails.pilotedBy && megazordDetails.pilotedBy.length > 0 ? (
            <ul>
              {megazordDetails.pilotedBy.map(r => (
                <li key={r._id}>
                  <Link to={`/characters/${r._id}`}>{r.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pilot data.</p>
          )}
        </div>

        <Link to="/megazords">← Back to Megazords</Link>

        <button onClick={handleFormView}>
          {isFormOpen ? 'Close Form' : 'Edit Megazord'}
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete Megazord
        </button>
      </div>

      {isFormOpen && (
        <div className="megazord-form-wrapper">
          <MegazordForm existingData={megazordDetails} onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default MegazordDetail;
