
const clothCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  basePrice: { type: Number, required: true }
});

module.exports = mongoose.model('ClothCategory', clothCategorySchema);



// const mongoose = require('mongoose');


// const categorySchema = new mongoose.Schema({
//     name : {
//         type: String,
//         default : ""
//     },
//     image : {
//         type: String,
//         default: ""
//     }
// },{
//     timestamps : true
// })

// const CategoryModel = mongoose.model('Category',categorySchema)

// module.exports = CategoryModel