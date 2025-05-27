// 1. Import dependencies
import React from 'react';
import './MegazordDetail.css';

// 2. Define component and accept megazords as props
const Megazord = ({ megazords }) => {

  console.log("Megazords:", megazords);

  // 3. Return JSX
  return (
    <div className="megazord-detail-container">
      <h1>Megazord Arsenal</h1>

      {!megazords || !megazords.length ? (
        <h2>No Megazords Available</h2>
      ) : (
        <ul className="megazord-list">
          {megazords.map((megazord) => (
            <li key={megazord._id} className="megazord-info">
              <h2>{megazord.name}</h2>
              <img
                src={megazord.pictureLink || "https://via.placeholder.com/400x200"}
                alt={`${megazord.name} image`}
                className="megazord-image"
              />
              <p><strong>Combined Form:</strong> {megazord.combinedMegazord}</p>
              <p>
                <strong>First Appeared In:</strong>{" "}
                {megazord.firstAppearedInSeason?.name || "Unknown Season"}
              </p>
              <p>
                <strong>Pilot(s):</strong>{" "}
                {megazord.pilotedBy?.length
                  ? megazord.pilotedBy.map(ranger => ranger.name).join(", ")
                  : "Unknown"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 4. Export component
export default Megazord;
