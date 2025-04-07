

// BrainWareChallengesResume.js
import React from 'react';
import { Text, View } from 'react-native';
import styles from './BrainwareChallengesResume.style';

const BrainWareChallengesResume = ({ challenges }) => {
    console.log(challenges);
    
    // Get today's date in ISO string without time
    const todayDate = new Date().toISOString().slice(0, 10);

    // Calculate the total number of rules completed today across all challenges
    const totalCompletedRulesToday = challenges.reduce((total, challenge) => {
        // Filter progress for today's date
        const progressToday = challenge.progress.filter(progress => progress.date.slice(0, 10) === todayDate);
        // Sum the number of completed rules (HECHO or NA) for each progress entry
        const completedRulesToday = progressToday.reduce((acc, progress) => {
            // Filter rules based on their status
            const validRules = progress.completedRules.filter(rule => rule.status === 'HECHO' || rule.status === 'NA');
            return acc + validRules.length;
        }, 0);
        return total + completedRulesToday;
    }, 0);

    // Calculate the total number of rules for each challenge
    const totalRulesPerChallenge = challenges.map(challenge => challenge.rules.length);

    // Sum up the total number of rules for all challenges
    const totalRulesAllChallenges = totalRulesPerChallenge.reduce((total, rules) => total + rules, 0);

    return (
        <View style={styles.counter}>
            <Text style={styles.title}>COMPORTAMIENTOS DE DIA</Text>
            <Text style={styles.parr}>
                Estos son los comportamientos diarios que has cumplido hoy de todos tus desafíos. 
            </Text>
            <Text style={styles.count}>{totalCompletedRulesToday} / {totalRulesAllChallenges}</Text>
        </View>
    );
};

export default BrainWareChallengesResume;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';

// const AdminUserDashboard = () => {
//   // Extract the dynamic slug from the URL (e.g., /user/[slug])
//   const { slug } = useParams();
//   const [user, setUser] = useState(null);
//   const [challenges, setChallenges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//     console.log(slug);
    
//   useEffect(() => {
//     if (!slug) return;
//     console.log("Checking user for slug:", slug);

//     const fetchUserAndChallenges = async () => {
//       try {
//         // Fetch user data by filtering with the username (slug)
//         const userResponse = await axios.get(`http://localhost:9090/api/user?username=${slug}`);
//         // Assume the API returns an array of users; take the first one
//         const userData = Array.isArray(userResponse.data) ? userResponse.data[0] : userResponse.data;
//         setUser(userData);

//         // Fetch challenges for that user using the user id
//         if (userData && userData._id) {
//           const challengesResponse = await axios.get(`http://localhost:9090/api/challenges?userId=${userData._id}`);
//           setChallenges(challengesResponse.data);
//         }
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserAndChallenges();
//   }, [slug]);

//   // Calculate overall daily progress across all challenges
//   const calculateDailyProgress = () => {
//     const todayDate = new Date().toISOString().slice(0, 10);
//     const totalCompletedRulesToday = challenges.reduce((total, challenge) => {
//       if (!challenge.progress) return total;
//       const progressToday = challenge.progress.filter(
//         (prog) => prog.date && prog.date.slice(0, 10) === todayDate
//       );
//       const completedRulesToday = progressToday.reduce((acc, prog) => {
//         const validRules = (prog.completedRules || []).filter(
//           (rule) => rule.status === 'HECHO' || rule.status === 'NA'
//         );
//         return acc + validRules.length;
//       }, 0);
//       return total + completedRulesToday;
//     }, 0);

//     const totalRulesAllChallenges = challenges.reduce((total, challenge) => {
//       return total + (challenge.rules ? challenge.rules.length : 0);
//     }, 0);

//     return `${totalCompletedRulesToday} / ${totalRulesAllChallenges}`;
//   };

//   // Calculate individual challenge progress for today
//   const calculateChallengeProgress = (challenge) => {
//     const todayDate = new Date().toISOString().slice(0, 10);
//     const progressToday = (challenge.progress || []).filter(
//       (prog) => prog.date && prog.date.slice(0, 10) === todayDate
//     );
//     const completedRulesToday = progressToday.reduce((acc, prog) => {
//       const validRules = (prog.completedRules || []).filter(
//         (rule) => rule.status === 'HECHO' || rule.status === 'NA'
//       );
//       return acc + validRules.length;
//     }, 0);
//     const totalRules = challenge.rules ? challenge.rules.length : 0;
//     return `${completedRulesToday} / ${totalRules}`;
//   };

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
//   }

//   if (!user) {
//     return <div className="min-h-screen flex items-center justify-center">Usuario no encontrado</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header Section with user information */}
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col items-center text-center">
//         <div className="relative w-24 h-24 mb-4">
//           <a href="#">
//             <Image
//               src={user.profileImage || 'https://via.placeholder.com/150'}
//               alt="Foto de perfil"
//               layout="fill"
//               className="rounded-full object-cover"
//             />
//           </a>
//         </div>
//         <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
//         <p className="text-gray-500">
//           {user.companyCode ? `Equipo: ${user.companyCode}` : 'Sin equipo asignado'}
//         </p>
//       </div>

//       {/* Daily Progress Section */}
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-center">
//         <h2 className="text-2xl font-semibold text-gray-800">COMPORTAMIENTOS DE DÍA</h2>
//         <p className="text-gray-600 mt-2">
//           Estos son los comportamientos diarios que ha cumplido hoy en todos sus desafíos.
//         </p>
//         <p className="text-green-600 font-bold text-xl mt-4">{calculateDailyProgress()}</p>
//       </div>

//       {/* Challenges Section */}
//       <div className="w-full bg-white shadow-md rounded-lg p-6 mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Desafíos</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {challenges.map((challenge) => (
//             <div key={challenge._id} className="bg-gray-50 shadow-md rounded-lg p-4">
//               <div className="relative w-full h-32 mb-4">
//                 <a href="#">
//                   <Image
//                     src={challenge.image || 'https://via.placeholder.com/300x200'}
//                     alt="Imagen del desafío"
//                     layout="fill"
//                     className="rounded-lg object-cover"
//                   />
//                 </a>
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">{challenge.title}</h3>
//               <p className="text-sm text-gray-600">{challenge.description}</p>
//               <p className="text-sm text-gray-700 mt-2">Comportamientos</p>
//               <p className="text-green-600 font-bold">{calculateChallengeProgress(challenge)}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Support Section */}
//       <div className="w-full bg-white shadow-md rounded-lg p-4 text-center">
//         <p className="text-gray-700">
//           <span className="text-green-600">ℹ️</span> Si llega a tener algún problema con su licencia, contacte a{' '}
//           <a href="mailto:soporte@brainware.com" className="text-blue-600">
//             soporte@brainware.com
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminUserDashboard;

