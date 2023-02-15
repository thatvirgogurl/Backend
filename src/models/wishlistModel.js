const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
    userId: { type: ObjectId, required: true, ref: 'User' },
    items: [{ productId: { type: ObjectId, required: true, ref: 'Product' }, quantity: { type: Number } }],
},
{ timestamps: true }
)

module.exports = mongoose.model('cart', cartSchema)