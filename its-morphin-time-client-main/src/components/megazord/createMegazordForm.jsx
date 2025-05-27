

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const CreateMegazordForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     pictureLink: '',
//     pilotedBy: [],
//     firstAppearedInSeason: '',
//     combinedMegazord: ''
//   });

//   const [rangers, setRangers] = useState([]);
//   const [seasons, setSeasons] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [rangerRes, seasonRes] = await Promise.all([
//           axios.get('/api/rangers'),
//           axios.get('/api/seasons')
//         ]);
//         setRangers(rangerRes.data);
//         setSeasons(seasonRes.data);
//       } catch (err) {
//         console.error('Error loading reference data:', err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'pilotedBy') {
//       const selected = Array.from(e.target.selectedOptions, option => option.value);
//       setFormData({ ...formData, pilotedBy: selected });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/megazords', formData);
//       setMessage(`✅ Megazord "${res.data.name}" created!`);
//       setFormData({
//         name: '',
//         pictureLink: '',
//         pilotedBy: [],
//         firstAppearedInSeason: '',
//         combinedMegazord: ''
//       });
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.error || '❌ Error creating Megazord.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded space-y-4">
//       <h2 className="text-2xl font-bold text-center">Create a Megazord</h2>

//       <input
//         type="text"
//         name="name"
//         placeholder="Megazord Name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//         className="w-full p-2 border rounded"
//       />

//       <input
//         type="url"
//         name="pictureLink"
//         placeholder="Image URL"
//         value={formData.pictureLink}
//         onChange={handleChange}
//         required
//         className="w-full p-2 border rounded"
//       />

//       <label className="block font-semibold">Piloted By</label>
//       <select
//         name="pilotedBy"
//         multiple
//         value={formData.pilotedBy}
//         onChange={handleChange}
//         required
//         className="w-full p-2 border rounded h-32"
//       >
//         {rangers.map(r => (
//           <option key={r._id} value={r._id}>{r.name}</option>
//         ))}
//       </select>

//       <label className="block font-semibold">First Appeared In Season</label>
//       <select
//         name="firstAppearedInSeason"
//         value={formData.firstAppearedInSeason}
//         onChange={handleChange}
//         required
//         className="w-full p-2 border rounded"
//       >
//         <option value="">-- Select a Season --</option>
//         {seasons.map(s => (
//           <option key={s._id} value={s._id}>{s.name}</option>
//         ))}
//       </select>

//       <input
//         type="text"
//         name="combinedMegazord"
//         placeholder="Combines into..."
//         value={formData.combinedMegazord}
//         onChange={handleChange}
//         required
//         className="w-full p-2 border rounded"
//       />

//       <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//         Create Megazord
//       </button>

//       {message && <p className="text-center text-sm mt-2">{message}</p>}
//     </form>
//   );
// };

// export default CreateMegazordForm;
