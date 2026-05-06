import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  exercises: [{
    name: String,
    muscle: String,
    sets: Number,
    reps: Number,
    weight: Number
  }],
  totalReps: { type: Number, default: 0 }
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;