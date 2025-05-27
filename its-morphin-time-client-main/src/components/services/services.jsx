const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

// SEASONS
// READ - All seasons
const fetchSeasons = async () => {
  try {
    const res = await fetch(`${BASE_URL}/seasons`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching seasons:", err);
    return { err: "Failed to fetch seasons" };
  }
};

// READ - Single season
const fetchSeasonDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/seasons/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching season details:", err);
    return { err: "Failed to fetch season details" };
  }
};

// CREATE - New season
const createSeason = async (seasonData) => {
  try {
    const res = await fetch(`${BASE_URL}/seasons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seasonData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error creating season:", err);
    return { err: "Failed to create season" };
  }
};

// UPDATE - Season by ID
const updateSeason = async (id, seasonData) => {
  try {
    const res = await fetch(`${BASE_URL}/seasons/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seasonData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error updating season:", err);
    return { err: "Failed to update season" };
  }
};

// DELETE - Season by ID
const deleteSeason = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/seasons/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error deleting season:", err);
    return { err: "Failed to delete season" };
  }
};

// CHARACTERS (Rangers)
const fetchCharacters = async () => {
  try {
    const res = await fetch(`${BASE_URL}/rangers`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching characters:", err);
    return { err: "Failed to fetch characters" };
  }
};

const fetchCharacterDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/rangers/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching character details:", err);
    return { err: "Failed to fetch character details" };
  }
};

// CREATE - New Character
const createCharacter = async (characterData) => {
  try {
    const res = await fetch(`${BASE_URL}/rangers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(characterData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error creating Character:", err);
    return { err: "Failed to create Character" };
  }
};

// UPDATE - Character by ID
const updateCharacter = async (id, characterData) => {
  try {
    const res = await fetch(`${BASE_URL}/rangers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(characterData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error updating Character:", err);
    return { err: "Failed to update Character" };
  }
};

// DELETE - character by ID
const deleteCharacter = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/rangers/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error deleting character:", err);
    return { err: "Failed to delete character" };
  }
};

// MEGAZORDS
const fetchMegazords = async () => {
  try {
    const res = await fetch(`${BASE_URL}/megazords`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching megazords:", err);
    return { err: "Failed to fetch megazords" };
  }
};


const fetchMegazordDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/megazords/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching megazord details:", err);
    return { err: "Failed to fetch megazord details" };
  }
};

// CREATE - New megazord
const createMegazord = async (megazordData) => {
  try {
    const res = await fetch(`${BASE_URL}/megazords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(megazordData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error creating Megazord:", err);
    return { err: "Failed to create Megazord" };
  }
};

// UPDATE - Megazord by ID
const updateMegazord = async (id, megazordData) => {
  try {
    const res = await fetch(`${BASE_URL}/megazords/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(megazordData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error updating Megazord:", err);
    return { err: "Failed to update Megazord" };
  }
};

// DELETE - megazord by ID
const deleteMegazord = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/megazords/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error deleting Megazord:", err);
    return { err: "Failed to delete Megazord" };
  }
};


export {
  fetchSeasons,
  fetchSeasonDetails,
  createSeason,
  updateSeason,
  deleteSeason,
  fetchCharacters,
  fetchCharacterDetails,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  fetchMegazords,
  fetchMegazordDetails,
  createMegazord,
  updateMegazord,
  deleteMegazord
};
