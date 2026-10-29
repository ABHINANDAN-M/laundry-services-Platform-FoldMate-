// const cloudinary = require("cloudinary").v2;
// const fs = require('fs')

// const uploadOnCloudinary = async (filepath) => {
//     cloudinary.config({
//         cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET
//     })
//     try {
//         if(!filepath) {
//             return null
//         }
//         const uploadResult = await cloudinary.uploader.
//         upload(filepath)
//             fs.unlinkSync(filepath)
//             return uploadResult.secure_url
//     } catch (err) {
//         fs.unlinkSync(filepath)
//         console.error("Cloudinary Upload Error", err);
  
//     }
// };


// module.exports = uploadOnCloudinary





// const cloudinary = require("cloudinary").v2;
// const fs = require('fs');

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (filepath) => {
//     try {
//         if (!filepath) {
//             return null;
//         }

//         const uploadResult = await cloudinary.uploader.upload(filepath);
//         fs.unlinkSync(filepath); // delete file after upload
//         return uploadResult.secure_url;

//     } catch (err) {
//         // Attempt to clean up file even on failure
//         try {
//             if (fs.existsSync(filepath)) {
//                 fs.unlinkSync(filepath);
//             }
//         } catch (unlinkErr) {
//             console.error("File deletion error:", unlinkErr);
//         }

//         console.error("Cloudinary Upload Error:", err);
//         return null;
//     }
// };

// module.exports = uploadOnCloudinary;









// config/cloudinary.js

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );

      stream.end(fileBuffer); // pass buffer to cloudinary stream
    });
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    return null;
  }
};

module.exports = uploadOnCloudinary;


