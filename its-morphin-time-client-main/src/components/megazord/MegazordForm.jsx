// src/components/megazord/MegazordForm.jsx
import { useState, useEffect } from 'react';
import './megazordForm.css';
// Assuming your first service file is correctly located and named 'services.js'
import * as Services from '../services/services';

const MegazordForm = ({ existingData = null, onSubmit }) => {
  // State for the form fields
  const [formData, setFormData] = useState({
    name: '',
    pictureLink: '',
    pilotedBy: [],
    firstAppearedInSeason: '',
    combinedMegazord: '',
  });

  // State to hold the lists fetched from the backend
  const [allRangers, setAllRangers] = useState([]);
  const [allSeasons, setAllSeasons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Rangers (Characters) and Seasons when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Reset error state on new fetch attempt
      try {
        // Use the specific function names from your service file
        const rangersData = await Services.fetchCharacters();
        const seasonsData = await Services.fetchSeasons();

        // Check if the service functions returned an error object
        if (rangersData && rangersData.err) {
          throw new Error(`Failed to fetch rangers: ${rangersData.err}`);
        }
        if (seasonsData && seasonsData.err) {
          throw new Error(`Failed to fetch seasons: ${seasonsData.err}`);
        }

        // Set state only if data is valid
        setAllRangers(rangersData || []);
        setAllSeasons(seasonsData || []);

      } catch (err) {
        console.error("Error fetching data:", err);
        // Use the error message from the caught error or a default
        setError(err.message || "Failed to load selection data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array runs only once on mount

  // Populate form state when existingData is provided (for editing)
  useEffect(() => {
    if (existingData) {
      setFormData({
        name: existingData.name || '',
        pictureLink: existingData.pictureLink || '',
        pilotedBy: existingData.pilotedBy?.map(p => p._id || p) || [],
        firstAppearedInSeason: existingData.firstAppearedInSeason?._id || existingData.firstAppearedInSeason || '',
        combinedMegazord: existingData.combinedMegazord || '',
      });
    } else {
      // Reset form if switching from edit to add mode or no existingData
       setFormData({
        name: '',
        pictureLink: '',
        pilotedBy: [],
        firstAppearedInSeason: '',
        combinedMegazord: '',
      });
    }
  }, [existingData]); // Re-run when existingData changes

  // Handler for standard input/select changes (single value)
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Specific handler for the multi-select Ranger dropdown
  const handleRangerChange = (evt) => {
    const selectedIds = Array.from(evt.target.selectedOptions, option => option.value);
    setFormData(prevData => ({ ...prevData, pilotedBy: selectedIds }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError(null); // Clear previous submission errors

    // Basic validation check
    if (formData.pilotedBy.length === 0 || !formData.firstAppearedInSeason) {
        setError('Please select at least one Ranger and a Season.');
        return; // Prevent submission
    }

    try {
      let result;
      if (existingData) {
         // Use the update function from your service file
        result = await Services.updateMegazord(existingData._id, formData);
      } else {
         // Use the create function from your service file
        result = await Services.createMegazord(formData);
      }

      // Check if the create/update functions returned an error object
      if (result && result.err) {
        throw new Error(result.err);
      }

      if (onSubmit) onSubmit(); // Optional callback after successful submission

    } catch (submitError) {
        console.error("Error submitting form:", submitError);
        setError(`Failed to save Megazord: ${submitError.message || 'Please try again.'}`); // Show error to user
    }
  };

  // Display loading or error messages
  if (isLoading) return <p>Loading form data...</p>;

  return (
    <div className="megazordForm">
      <form onSubmit={handleSubmit}>
        <h2>{existingData ? 'Edit' : 'Add'} Megazord</h2>

        {/* Display Submission Errors */}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <label htmlFor="name">Name:</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="pictureLink">Image Link:</label>
        <input id="pictureLink" name="pictureLink" value={formData.pictureLink} onChange={handleChange} required />

        {/* Season Dropdown */}
        <label htmlFor="firstAppearedInSeason">First Appeared In Season:</label>
        <select
          id="firstAppearedInSeason"
          name="firstAppearedInSeason"
          value={formData.firstAppearedInSeason}
          onChange={handleChange}
          required
          disabled={allSeasons.length === 0} // Disable if seasons haven't loaded
        >
          <option value="">-- Select a Season --</option>
          {allSeasons.map((season) => (
            <option key={season._id} value={season._id}>
              {season.name} {/* Adjust if the display field is different */}
            </option>
          ))}
        </select>

        {/* Ranger (Character) Dropdown */}
        <label htmlFor="pilotedBy">Piloted By:</label>
        <select
          id="pilotedBy"
          name="pilotedBy"
          multiple
          value={formData.pilotedBy}
          onChange={handleRangerChange}
          required
          size={Math.min(allRangers.length, 5)}
          disabled={allRangers.length === 0} // Disable if rangers haven't loaded
        >
          {allRangers.map((ranger) => (
            <option key={ranger._id} value={ranger._id}>
              {ranger.name} {/* Adjust if the display field is different */}
            </option>
          ))}
        </select>
        {allRangers.length > 0 && <small> (Hold Ctrl/Cmd to select multiple)</small>}


        <label htmlFor="combinedMegazord">Combined Zord:</label>
        <input
          id="combinedMegazord"
          name="combinedMegazord"
          value={formData.combinedMegazord}
          onChange={handleChange}
          required // Keep required as it's in your Mongoose schema
         />

        <button type="submit" disabled={isLoading}>
            {existingData ? 'Update' : 'Create'} Megazord
        </button>
      </form>
    </div>
  );
};

export default MegazordForm;