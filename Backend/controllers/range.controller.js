


// const UserModel = require('../models/user.model'); // path to your User model


// const findWashermenWithinRange = async (req, res) => {
//   try {
//     const { latitude, longitude, searchRadius = 600 } = req.query;

//     if (!latitude || !longitude) {
//       return res.status(400).json({ message: 'Latitude and longitude required' });
//     }

//     const washermen = await UserModel.aggregate([
//       {
//         $geoNear: {
//           near: {
//             type: 'Point',
//             coordinates: [parseFloat(longitude), parseFloat(latitude)]
//           },
//           distanceField: 'dist.calculated',
//           spherical: true,
//           maxDistance: parseInt(searchRadius),
//           query: { role: 'washerman' }
//         }
//       }
//     ]);

//     const filteredWashermen = washermen.filter(w => {
//       const range = w.range || 500;
//       return w.dist.calculated <= range;
//     });

//     res.json({ washermen: filteredWashermen });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// module.exports = { findWashermenWithinRange };