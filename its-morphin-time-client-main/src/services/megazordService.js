export const getAllMegazords = async () => {
    try {
      const response = await fetch("http://localhost:3000/megazords");
      return await response.json();
    } catch (err) {
      console.error("Error fetching Megazords:", err);
      return [];
    }
  };