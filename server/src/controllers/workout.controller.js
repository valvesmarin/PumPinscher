import Workout from '../models/Workout.js';

// Criar um novo treino
export const createWorkout = async (req, res) => {
  try {
    const { userEmail, name, exercises } = req.body;

    const workout = new Workout({
      userEmail,
      name,
      exercises,
      totalReps: exercises.reduce((acc, ex) => acc + (ex.reps || 0), 0)
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar todos os treinos de um usuário
export const getWorkouts = async (req, res) => {
  try {
    const { userEmail } = req.query;
    const workouts = await Workout.find({ userEmail }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar um treino específico por ID
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Treino não encontrado' });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deletar um treino
export const deleteWorkout = async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: 'Treino deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};