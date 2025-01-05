import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    author: { type: String, required: true },
    movieId: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

ReviewSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Review', ReviewSchema);