import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Services from '../services/services';
import './MegazordPage.css';

const MegazordPage = () => {
  const [megazords, setMegazords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMegazords = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Services.fetchMegazords();
        if (data && !data.err) {
          setMegazords(data);
        } else {
          setError(data ? data.err : 'Failed to load megazords.');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllMegazords();
  }, []);

  if (loading) return <div>Loading megazords...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="megazords-page-container">
      <h1>Power Rangers Megazords</h1>
      <Link to="/megazords/new">+ Add New Megazord</Link>
      <div className="megazords-list">
        {!megazords.length ? (
          <p>No megazords available.</p>
        ) : (
          <ul className="megazords">
            {megazords.map((megazord) => (
              <li key={megazord._id} className="megazord-item">
                <Link to={`/megazords/${megazord._id}`}>{megazord.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MegazordPage;
