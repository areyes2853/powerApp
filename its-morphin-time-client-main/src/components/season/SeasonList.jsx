import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Services from '../services/services';
import './SeasonList.css'; // optional for styling

const SeasonList = () => {
  const [seasons, setSeasons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasons = async () => {
      const data = await Services.fetchSeasons();
      if (data && !data.err) {
        setSeasons(data);
      } else {
        setError(data ? data.err : 'Failed to load seasons.');
      }
    };

    fetchSeasons();
  }, []);

  if (error) return <div>Error loading seasons: {error}</div>;

  return (
    <div className="season-list-container">
      <h1>Power Rangers Seasons</h1>
      <Link to="/seasons/new">+ Add New Season</Link>
      <ul className="season-list">
        {seasons.map((season) => (
          <li key={season._id}>
            <Link to={`/seasons/${season._id}`}>Season {season.seasonNumber}</Link>
          </li>
        ))}
      </ul>
      
    </div> 
  );
};

export default SeasonList;
