import { model, Schema } from 'mongoose';

const menuItemsSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const restaurantSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemsSchema],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

const Restaurant = model('Restaurant', restaurantSchema);

export default Restaurant;
