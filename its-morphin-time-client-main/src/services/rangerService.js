import { cache } from "react";

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

export async function getAllRangers() {
  try{
  const res = await fetch(`${BASE_URL}/rangers`);
  // if (!res.ok) throw new Error("Failed to fetch rangers");
  return res.json();
  }
  catch(err){
    console.error("Error fetching Ranger", err)
    return[];
  }
}



// export const getAllMegazords = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/megazords");
//     return await response.json();
//   } catch (err) {
//     console.error("Error fetching Megazords:", err);
//     return [];
//   }
// };