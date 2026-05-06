import { Router } from 'express';
import { 
  createWorkout, 
  getWorkouts, 
  getWorkoutById, 
  deleteWorkout 
} from '../controllers/workout.controller.js';

const router = Router();

// Rotas
router.post('/', createWorkout);           // Criar treino
router.get('/', getWorkouts);              // Buscar todos os treinos de um usuário
router.get('/:id', getWorkoutById);        // Buscar um treino específico
router.delete('/:id', deleteWorkout);      // Deletar treino

export default router;