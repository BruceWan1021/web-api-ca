import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
    username: {type: String, required: true},
    movieId: {type: String, required: true},
})

WatchlistSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Watchlist', WatchlistSchema);