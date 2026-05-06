import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import workoutRoutes from './routes/workout.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas conectado com sucesso!'))
  .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err.message));

// Rotas
app.use('/api/workouts', workoutRoutes);

// Rota de teste raiz
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Servidor PumPinscher rodando com sucesso!',
    mongodb: mongoose.connection.readyState === 1 ? '✅ Conectado' : '❌ Desconectado'
  });
});

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📡 API de treinos disponível em http://localhost:${PORT}/api/workouts`);
});