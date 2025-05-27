// src/components/characters/CharacterForm.jsx
import { useState, useEffect } from 'react';
import * as Services from '../services/services';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './CharacterForm.css';

const CharacterForm = ({ existingData = null, onSubmit }) => {
  // Form data state - keep rangerID for potential display during edit
  const [formData, setFormData] = useState({
    // Keep for edit display, but won't be sent on create
    name: '',
    fullName: '',
    zord: '',
    gender: '',
    color: '',
    homeworld: '',
    firstAp: '',
    lastAp: '',
    numberOfAp: '',
    actor: '',
    img: '',
    season: '',
    megazordPiloted: '',
  });

  // State for dropdown options
  const [allSeasons, setAllSeasons] = useState([]);
  const [allMegazords, setAllMegazords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Seasons and Megazords on component mount (no changes needed here)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const seasonsData = await Services.fetchSeasons();
        const megazordsData = await Services.fetchMegazords();
        if (seasonsData && seasonsData.err) throw new Error(`Failed to fetch seasons: ${seasonsData.err}`);
        if (megazordsData && megazordsData.err) throw new Error(`Failed to fetch megazords: ${megazordsData.err}`);
        setAllSeasons(seasonsData || []);
        setAllMegazords(megazordsData || []);
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
        setError(err.message || "Failed to load selection data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Populate form when editing existing data (no changes needed here for rangerID population)
  useEffect(() => {
    if (existingData) {
      setFormData({
        rangerID: existingData.rangerID || '', // Populate for display
        name: existingData.name || '',
        fullName: existingData.fullName || '',
        zord: Array.isArray(existingData.zord) ? existingData.zord.join(', ') : existingData.zord || '',
        gender: existingData.gender || '',
        color: existingData.color || '',
        homeworld: existingData.homeworld || '',
        firstAp: existingData.firstAp || '',
        lastAp: existingData.lastAp || '',
        numberOfAp: existingData.numberOfAp || '',
        actor: existingData.actor || '',
        img: existingData.img || '',
        season: existingData.season?._id || existingData.season || '',
        megazordPiloted: existingData.megazordPiloted?._id || existingData.megazordPiloted || '',
      });
    } else {
      // Reset form for creation - rangerID is reset but won't be shown/sent
      setFormData({
        name: '',
        fullName: '',
        zord: '',
        gender: '',
        color: '',
        homeworld: '',
        firstAp: '',
        lastAp: '',
        numberOfAp: '',
        actor: '',
        img: '',
        season: '',
        megazordPiloted: '',
      });
    }
  }, [existingData]);

  // Handle changes in form inputs and selects (no changes needed here)
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setError(null);

    // Base prepared data excluding rangerID initially
    const preparedData = {
      name: formData.name,
      fullName: formData.fullName || undefined, // Send undefined if empty
      zord: formData.zord.split(',').map((z) => z.trim()).filter(z => z),
      gender: formData.gender,
      color: formData.color,
      homeworld: formData.homeworld,
      firstAp: formData.firstAp,
      lastAp: formData.lastAp,
      numberOfAp: formData.numberOfAp ? parseInt(formData.numberOfAp, 10) : undefined,
      actor: formData.actor,
      img: formData.img || undefined, // Send undefined if empty
      season: formData.season || undefined, // Send undefined if empty/not selected
      megazordPiloted: formData.megazordPiloted || undefined, // Send undefined if empty/not selected
      // DO NOT INCLUDE rangerID here initially
    };

    // Basic client-side validation
    if (!preparedData.name || !preparedData.color /* ... etc */) {
        setError("Please fill in all required fields.");
        return;
    }

    try {
      let result;
      if (existingData) {
        // Update operation - Backend uses existingData._id from the URL/params
        // We don't need to send rangerID in the payload unless API specifically requires it for update
        result = await Services.updateCharacter(existingData._id, preparedData);
      } else {
        // Create operation - DO NOT send rangerID
        result = await Services.createCharacter(preparedData);
      }

      // Check for errors returned from service
      if (result && result.err) {
        throw new Error(result.err);
      }

      if (onSubmit) onSubmit(); // Optional callback on success

    } catch (submitError) {
      console.error("Error submitting character form:", submitError);
      setError(`Failed to save Ranger: ${submitError.message || 'Please try again.'}`);
    }

  };

  // Display loading indicator
  if (isLoading) return <p>Loading form data...</p>;

  return (
    <div className="characterForm">
      <form onSubmit={handleSubmit}>
        <h2>{existingData ? 'Edit' : 'Add'} Ranger</h2>

        {/* Display Form Errors */}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {/* Ranger ID - ONLY display when editing */}
        {existingData && (
          <>
            <label htmlFor="rangerID">Ranger ID</label>
            <input
              type="number"
              id="rangerID"
              name="rangerID"
              value={formData.rangerID}
              readOnly // Always read-only
            />
          </>
        )}

        {/* Other Fields (No changes needed below) */}
        <label htmlFor="name">Ranger Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="fullName">Full Name</label>
        <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />

        <label htmlFor="zord">Zords (comma-separated)</label>
        <input id="zord" name="zord" value={formData.zord} onChange={handleChange} required />

        <label htmlFor="gender">Gender</label>
        <input id="gender" name="gender" value={formData.gender} onChange={handleChange} required />

        <label htmlFor="color">Ranger Color</label>
        <input id="color" name="color" value={formData.color} onChange={handleChange} required />

        <label htmlFor="homeworld">Homeworld</label>
        <input id="homeworld" name="homeworld" value={formData.homeworld} onChange={handleChange} required />

        <label htmlFor="firstAp">First Appearance</label>
        <input id="firstAp" name="firstAp" value={formData.firstAp} onChange={handleChange} required />

        <label htmlFor="lastAp">Last Appearance</label>
        <input id="lastAp" name="lastAp" value={formData.lastAp} onChange={handleChange} required />

        <label htmlFor="numberOfAp"># of Appearances</label>
        <input type="number" id="numberOfAp" name="numberOfAp" value={formData.numberOfAp} onChange={handleChange} required />

        <label htmlFor="actor">Actor</label>
        <input id="actor" name="actor" value={formData.actor} onChange={handleChange} required />

        <label htmlFor="img">Image URL</label>
        <input id="img" name="img" value={formData.img} onChange={handleChange} />

        {/* Season Dropdown */}
        <label htmlFor="season">Season</label>
        <select
          id="season"
          name="season"
          value={formData.season}
          onChange={handleChange}
          disabled={allSeasons.length === 0}
        >
          <option value="">-- Select a Season (Optional) --</option>
          {allSeasons.map((season) => (
            <option key={season._id} value={season._id}>
              {season.name}
            </option>
          ))}
        </select>

        {/* Megazord Piloted Dropdown */}
        <label htmlFor="megazordPiloted">Megazord Piloted</label>
        <select
          id="megazordPiloted"
          name="megazordPiloted"
          value={formData.megazordPiloted}
          onChange={handleChange}
          disabled={allMegazords.length === 0}
        >
          <option value="">-- Select a Megazord (Optional) --</option>
          {allMegazords.map((megazord) => (
            <option key={megazord._id} value={megazord._id}>
              {megazord.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={isLoading}>
          {existingData ? 'Update' : 'Create'} Ranger
        </button>
        <div>
        <Link to="/characters">Back to Characters</Link>
        </div>
       
      </form>
     
     
    </div>
  );
};

export default CharacterForm;