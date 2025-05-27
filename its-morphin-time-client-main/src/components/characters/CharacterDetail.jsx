// src/components/characters/CharacterDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as Services from '../services/services';
import CharacterForm from './CharacterForm';
import './CharacterDetail.css';

const CharacterDetail = ({ isFormOpen, handleFormView }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  const fetchCharacter = async () => {
    setLoading(true);
    try {
      const data = await Services.fetchCharacterDetails(id);
      if (data && !data.err) {
        setCharacter(data);
      } else {
        setError('Failed to load character details.');
      }
    } catch {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchCharacter();
  }, [id]);

  const handleFormSubmit = async (formData) => {
    if (id && character) {
      await Services.updateCharacter(id, formData);
      fetchCharacter();
      handleFormView();
    } else {
      await Services.createCharacter(formData);
      navigate("/characters"); // Option 1: always navigate after creation
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this character?");
    if (!confirmDelete) return;

    await Services.deleteCharacter(id);
    navigate("/characters");
  };

  if (loading) return <div>Loading character...</div>;
  if (id && (error || !character)) return <div>{error || "No data found."}</div>;

  return (
    <div className="character-detail-container">
      {id && character && (
        <div className="character-info">
          <h1>{character.name}</h1>
          <img src={character.img} alt={character.name} className="character-image" />
          <p><strong>Full Name:</strong> {character.fullName}</p>
          <p><strong>Color:</strong> {character.color}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Zords:</strong> {character.zord?.join(', ')}</p>
          <p><strong>Actor:</strong> {character.actor}</p>

          <p>
            <strong>Season:</strong>{" "}
            {character.season ? (
              <Link to={`/seasons/${character.season._id || character.season}`}>
                {character.season.name || character.season}
              </Link>
            ) : "Unknown Season"}
          </p>
          <p>
            <strong>Megazord:</strong>{" "}
            {character.megazordPiloted ? (
              <Link to={`/megazords/${character.megazordPiloted._id || character.megazordPiloted}`}>
                {character.megazordPiloted.name || character.megazordPiloted}
              </Link>
            ) : "Unknown Megazord"}
          </p>

          <Link to="/characters">Back to Characters</Link>

          <button onClick={handleFormView}>
            {isFormOpen ? 'Close Form' : 'Edit Character'}
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete Character
          </button>
        </div>
      )}

      {(isFormOpen || !id) && (
        <div className="character-form-wrapper">
          <CharacterForm
            existingData={character}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;