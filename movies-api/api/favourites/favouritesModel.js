import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
    userId: {type: String, required: true},
    movieId: {type: String, required: true},
})

FavouriteSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Favourites', FavouriteSchema);