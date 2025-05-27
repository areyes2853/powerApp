// src/components/characters/CharactersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Services from '../services/services';
import './CharactersPage.css';

const CharactersPage = ({
  characters,
  existingData = null,       // if you’re editing, pass the character here
  onSubmit: parentCallback,   // optional callback once creation/update succeeds
}) => {
  // --- list state ---
  const [charList, setCharList] = useState(characters || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- form state ---
  const [formData, setFormData] = useState({
    name: existingData?.name || '',
    zord: existingData?.zord?.join(', ') || '',  // store as CSV in the input
  });

  // --- pull full list if no initial data ---
  useEffect(() => {
    if (!characters || characters.length === 0) {
      const fetchAllCharacters = async () => {
        setLoading(true);
        const data = await Services.fetchCharacters();
        if (data && !data.err) {
          setCharList(data);
        } else {
          setError(data?.err || 'Failed to load characters.');
        }
        setLoading(false);
      };
      fetchAllCharacters();
    }
  }, [characters]);

  if (loading) return <div>Loading characters...</div>;
  if (error)   return <div>Error: {error}</div>;

  // --- updates formData when inputs change ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- your existing handleSubmit, now wired to formData & existingData ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // turn CSV into array
    const prepared = {
      ...formData,
      zord: formData.zord
        .split(',')
        .map((z) => z.trim())
        .filter((z) => z.length > 0),
    };

    if (existingData) {
      await Services.updateCharacter(existingData._id, prepared);
    } else {
      await Services.createCharacter(prepared);
    }

    // let a parent know if they passed a callback
    if (typeof parentCallback === 'function') {
      parentCallback();
    }

    // Optional: re-fetch the list so your new/updated character appears
    const all = await Services.fetchCharacters();
    setCharList(all);
  };

  return (
    <div className="characters-page-container">
      <h1>Power Rangers Characters</h1>
      <Link to="/characters">+ Add New Character</Link>
      {/* ─── Your Create/Edit Form ───
      <form className="character-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Megazords (comma‑separated)
          <input
            type="text"
            name="zord"
            value={formData.zord}
            onChange={handleChange}
            placeholder="Mastodon, Triceratops, Sabertooth"
          />
        </label>

        <button type="submit">
          {existingData ? 'Update Character' : 'Create Character'}
        </button>
      </form> */}

      {/* ─── The List Below ─── */}
      <ul className="characters-list">
        {charList.map((character) => (
          <li key={character._id} className="character-item">
            <Link to={`/characters/${character._id}`}>
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default CharactersPage;
