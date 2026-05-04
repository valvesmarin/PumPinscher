import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
  pt: {
    loginTitle: "Bem-vindo ao PumPinscher",
    emailPlaceholder: "Seu email",
    passwordPlaceholder: "Sua senha",
    enterButton: "Entrar",
    registerButton: "Criar conta",
    selectLanguage: "Escolha o idioma",
    dashboard: "Dashboard",
    treinos: "Treinos",
    progresso: "Progresso",
    perfil: "Perfil",
    newWorkout: "Novo Treino",
    exerciseName: "Nome do exercício",
    muscle: "Músculo",
    sets: "Séries",
    reps: "Repetições",
    weight: "Peso (kg)",
    addExercise: "Adicionar Exercício",
    saveWorkout: "Salvar Treino Completo",
    history: "Histórico de Treinos",
    noWorkouts: "Nenhum treino salvo ainda...",
    toastSaved: "Treino salvo com sucesso!",
    toastRegister: "Conta criada com sucesso! Entrando...",
    weeklyTrainings: "TREINOS ESTA SEMANA",
    totalVolume: "VOLUME TOTAL",
    currentStreak: "STREAK ATUAL",
    weeklyProgress: "Progresso Semanal",
    forceDetermination: "— Força e determinação",
    tagline: "o pinscher que não desiste",
    profileComingSoon: "Perfil em desenvolvimento..."
  },
  es: {
    loginTitle: "Bienvenido a PumPinscher",
    emailPlaceholder: "Tu email",
    passwordPlaceholder: "Tu contraseña",
    enterButton: "Entrar",
    registerButton: "Crear cuenta",
    selectLanguage: "Elige el idioma",
    dashboard: "Dashboard",
    treinos: "Entrenamientos",
    progresso: "Progreso",
    perfil: "Perfil",
    newWorkout: "Nuevo Entrenamiento",
    exerciseName: "Nombre del ejercicio",
    muscle: "Músculo",
    sets: "Series",
    reps: "Repeticiones",
    weight: "Peso (kg)",
    addExercise: "Añadir Ejercicio",
    saveWorkout: "Guardar Entrenamiento",
    history: "Historial",
    noWorkouts: "Aún no hay entrenamientos...",
    toastSaved: "¡Entrenamiento guardado!",
    toastRegister: "¡Cuenta creada! Entrando...",
    weeklyTrainings: "ENTRENAMIENTOS ESTA SEMANA",
    totalVolume: "VOLUMEN TOTAL",
    currentStreak: "RÁCHA ACTUAL",
    weeklyProgress: "Progreso Semanal",
    forceDetermination: "— Fuerza y determinación",
    tagline: "el pinscher que no se rinde",
    profileComingSoon: "Perfil en desarrollo..."
  },
  en: {
    loginTitle: "Welcome to PumPinscher",
    emailPlaceholder: "Your email",
    passwordPlaceholder: "Your password",
    enterButton: "Enter",
    registerButton: "Create account",
    selectLanguage: "Choose language",
    dashboard: "Dashboard",
    treinos: "Workouts",
    progresso: "Progress",
    perfil: "Profile",
    newWorkout: "New Workout",
    exerciseName: "Exercise name",
    muscle: "Muscle",
    sets: "Sets",
    reps: "Reps",
    weight: "Weight (kg)",
    addExercise: "Add Exercise",
    saveWorkout: "Save Workout",
    history: "History",
    noWorkouts: "No workouts yet...",
    toastSaved: "Workout saved!",
    toastRegister: "Account created! Logging in...",
    weeklyTrainings: "WORKOUTS THIS WEEK",
    totalVolume: "TOTAL VOLUME",
    currentStreak: "CURRENT STREAK",
    weeklyProgress: "Weekly Progress",
    forceDetermination: "— Strength and determination",
    tagline: "the pinscher that never gives up",
    profileComingSoon: "Profile under development..."
  }
} as const;

type Lang = keyof typeof translations;
type Key = keyof typeof translations['pt'];

const motivationalQuotes = {
  pt: ["Tudo posso naquele que me fortalece. — Filipenses 4:13", "Não temas, pois eu sou contigo. — Isaías 41:10", "O Senhor é a minha força e o meu escudo. — Salmos 28:7", "A dor de hoje é a força de amanhã.", "Disciplina é a ponte entre seus objetivos e suas conquistas."],
  es: ["Todo lo puedo en Cristo que me fortalece. — Filipenses 4:13", "No temas, porque yo estoy contigo. — Isaías 41:10", "El Señor es mi fortaleza y mi escudo. — Salmos 28:7", "El dolor de hoy es la fuerza de mañana.", "La disciplina es el puente entre tus objetivos y tus logros."],
  en: ["I can do all things through Christ who strengthens me. — Philippians 4:13", "Fear not, for I am with you. — Isaiah 41:10", "The Lord is my strength and my shield. — Psalms 28:7", "Today's pain is tomorrow's strength.", "Discipline is the bridge between your goals and your achievements."]
} as const;

const muscleGroups = {
  pt: ["Peito", "Costas", "Ombros", "Braços", "Pernas", "Abdômen", "Panturrilha"],
  es: ["Pecho", "Espalda", "Hombros", "Brazos", "Piernas", "Abdomen", "Pantorrilla"],
  en: ["Chest", "Back", "Shoulders", "Arms", "Legs", "Abs", "Calves"]
} as const;

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentLang, setCurrentLang] = useState<Lang>('pt');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPage, setTargetPage] = useState<string | null>(null);

  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentWorkout, setCurrentWorkout] = useState<any[]>([]);
  const [newExercise, setNewExercise] = useState({ name: '', sets: '', reps: '', weight: '', muscle: '' });
  const [toast, setToast] = useState('');
  const [workoutHistory, setWorkoutHistory] = useState<any[]>([]);

  const t = (key: Key) => translations[currentLang][key] || key;

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (pass: string) => pass.length >= 6;
  const canLogin = isValidEmail(email) && isValidPassword(password);

  const handleLogin = () => { if (canLogin) setIsLoggedIn(true); };
  const handleRegister = () => {
    if (canLogin) {
      setToast(t('toastRegister'));
      setTimeout(() => { setIsLoggedIn(true); setToast(''); }, 1200);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % motivationalQuotes[currentLang].length);
    }, 300000);
    return () => clearInterval(interval);
  }, [currentLang]);

  const changePage = (page: string) => {
    if (page === currentPage || isTransitioning) return;
    setTargetPage(page);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      setTargetPage(null);
    }, 950);
  };

  const addExercise = () => {
    if (!newExercise.name || !newExercise.muscle) return;
    setCurrentWorkout([...currentWorkout, { ...newExercise, id: Date.now() }]);
    setNewExercise({ name: '', sets: '', reps: '', weight: '', muscle: '' });
  };

  const saveWorkout = () => {
    if (currentWorkout.length === 0) return;
    const newEntry = { id: Date.now(), date: new Date().toLocaleDateString('pt-BR'), exercises: [...currentWorkout] };
    const updated = [newEntry, ...workoutHistory];
    setWorkoutHistory(updated);
    localStorage.setItem('workoutHistory', JSON.stringify(updated));
    setToast(t('toastSaved'));
    setTimeout(() => setToast(''), 2800);
    setCurrentWorkout([]);
  };

  const renderLogin = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-black p-6">
      <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-10 shadow-2xl border border-orange-400/10">
        <div className="flex justify-center mb-8">
          <img src="/pinscher-mascot.png" alt="PumPinscher" className="w-32 h-32 object-contain drop-shadow-2xl" />
        </div>
        <h1 className="text-4xl font-black text-center text-white mb-2">{t('loginTitle')}</h1>
        <p className="text-orange-400 text-center mb-10">{t('tagline')}</p>

        <div className="mb-8">
          <label className="block text-orange-300 text-sm mb-3 text-center">{t('selectLanguage')}</label>
          <div className="flex gap-3 bg-zinc-800 p-1 rounded-3xl">
            <button onClick={() => setCurrentLang('pt')} className={`flex-1 py-4 rounded-3xl font-medium transition-all ${currentLang === 'pt' ? 'bg-orange-500 text-white' : 'hover:bg-zinc-700'}`}>🇧🇷 PT</button>
            <button onClick={() => setCurrentLang('es')} className={`flex-1 py-4 rounded-3xl font-medium transition-all ${currentLang === 'es' ? 'bg-orange-500 text-white' : 'hover:bg-zinc-700'}`}>🇪🇸 ES</button>
            <button onClick={() => setCurrentLang('en')} className={`flex-1 py-4 rounded-3xl font-medium transition-all ${currentLang === 'en' ? 'bg-orange-500 text-white' : 'hover:bg-zinc-700'}`}>🇬🇧 EN</button>
          </div>
        </div>

        <input type="email" placeholder={t('emailPlaceholder')} value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-zinc-800 border border-transparent focus:border-orange-400 text-white placeholder-zinc-400 rounded-2xl px-6 py-5 text-lg outline-none mb-4" />
        <input type="password" placeholder={t('passwordPlaceholder')} value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-zinc-800 border border-transparent focus:border-orange-400 text-white placeholder-zinc-400 rounded-2xl px-6 py-5 text-lg outline-none mb-6" />

        <button onClick={handleLogin} disabled={!canLogin} className={`w-full py-5 rounded-3xl font-bold text-xl transition-all mb-4 ${canLogin ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600' : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'}`}>{t('enterButton')}</button>
        <button onClick={handleRegister} className="w-full py-5 rounded-3xl font-bold text-xl border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-all">{t('registerButton')}</button>
      </div>
    </div>
  );

  const renderMainApp = () => (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white">
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-2xl border-b border-orange-500">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/pinscher-mascot.png" alt="PumPinscher" className="w-14 h-14 object-contain drop-shadow-2xl" />
            <div>
              <h1 className="text-4xl font-black tracking-[-2px] bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">PumPinscher</h1>
            </div>
          </div>

          <nav className="flex gap-10 text-sm font-semibold">
            <a onClick={() => changePage('dashboard')} className={`cursor-pointer hover:text-orange-400 transition-colors ${currentPage === 'dashboard' ? 'text-orange-400' : ''}`}>{t('dashboard')}</a>
            <a onClick={() => changePage('treinos')} className={`cursor-pointer hover:text-orange-400 transition-colors ${currentPage === 'treinos' ? 'text-orange-400' : ''}`}>{t('treinos')}</a>
            <a onClick={() => changePage('progresso')} className={`cursor-pointer hover:text-orange-400 transition-colors ${currentPage === 'progresso' ? 'text-orange-400' : ''}`}>{t('progresso')}</a>
            <a onClick={() => changePage('perfil')} className={`cursor-pointer hover:text-orange-400 transition-colors ${currentPage === 'perfil' ? 'text-orange-400' : ''}`}>{t('perfil')}</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {currentPage === 'dashboard' && (
          <>
            <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-3xl p-12 mb-12 shadow-2xl border border-orange-400/30">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-44 h-44 flex items-center justify-center flex-shrink-0">
                  <img src="/pinscher-mascot.png" alt="PumPinscher" className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <div className="flex-1">
                  <p className="text-5xl font-bold leading-tight text-white">
                    {motivationalQuotes[currentLang][currentQuote]}
                  </p>
                  <p className="mt-6 text-orange-100 text-xl">{t('forceDetermination')}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900 border border-orange-500/30 rounded-3xl p-8 hover:border-orange-400 transition-all">
                <p className="text-orange-400 text-sm font-medium">{t('weeklyTrainings')}</p>
                <p className="text-6xl font-black mt-4">4</p>
              </div>
              <div className="bg-zinc-900 border border-orange-500/30 rounded-3xl p-8 hover:border-orange-400 transition-all">
                <p className="text-orange-400 text-sm font-medium">{t('totalVolume')}</p>
                <p className="text-6xl font-black mt-4">18.4t</p>
              </div>
              <div className="bg-zinc-900 border border-orange-500/30 rounded-3xl p-8 hover:border-orange-400 transition-all">
                <p className="text-orange-400 text-sm font-medium">{t('currentStreak')}</p>
                <p className="text-6xl font-black mt-4 text-orange-400">12 🔥</p>
              </div>
            </div>

            <div className="mt-12 bg-zinc-900 rounded-3xl p-8">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-orange-400 font-medium">{t('weeklyProgress')}</span>
                <span className="text-white">75% do objetivo semanal</span>
              </div>
              <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-3 w-[75%] bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
              </div>
            </div>
          </>
        )}

        {currentPage === 'treinos' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-orange-400">{t('newWorkout')}</h2>
            <div className="bg-zinc-900 rounded-3xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder={t('exerciseName')} value={newExercise.name} onChange={e => setNewExercise({...newExercise, name: e.target.value})} className="bg-zinc-800 border border-transparent focus:border-orange-400 text-white rounded-2xl px-6 py-4 outline-none" />
                <select value={newExercise.muscle} onChange={e => setNewExercise({...newExercise, muscle: e.target.value})} className="bg-zinc-800 border border-transparent focus:border-orange-400 text-white rounded-2xl px-6 py-4 outline-none">
                  <option value="">{t('muscle')}</option>
                  {muscleGroups[currentLang].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <input type="number" placeholder={t('sets')} value={newExercise.sets} onChange={e => setNewExercise({...newExercise, sets: e.target.value})} className="bg-zinc-800 border border-transparent focus:border-orange-400 text-white rounded-2xl px-6 py-4 outline-none" />
                <input type="number" placeholder={t('reps')} value={newExercise.reps} onChange={e => setNewExercise({...newExercise, reps: e.target.value})} className="bg-zinc-800 border border-transparent focus:border-orange-400 text-white rounded-2xl px-6 py-4 outline-none" />
                <input type="number" placeholder={t('weight')} value={newExercise.weight} onChange={e => setNewExercise({...newExercise, weight: e.target.value})} className="bg-zinc-800 border border-transparent focus:border-orange-400 text-white rounded-2xl px-6 py-4 outline-none" />
                <button onClick={addExercise} className="bg-orange-500 hover:bg-orange-600 font-semibold rounded-2xl py-4 text-white">{t('addExercise')}</button>
              </div>
            </div>
            {currentWorkout.length > 0 && (
              <button onClick={saveWorkout} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-bold py-5 rounded-3xl text-xl">{t('saveWorkout')}</button>
            )}
          </div>
        )}

        {currentPage === 'progresso' && (
          <div>
            <h2 className="text-4xl font-bold mb-8 text-orange-400">{t('history')}</h2>
            {workoutHistory.length === 0 ? (
              <p className="text-zinc-400 text-center py-12">{t('noWorkouts')}</p>
            ) : (
              workoutHistory.map((w: any) => (
                <div key={w.id} className="bg-zinc-900 rounded-3xl p-8 mb-6">
                  <p className="text-orange-400 text-sm mb-4">{w.date}</p>
                  {w.exercises.map((ex: any) => (
                    <div key={ex.id} className="flex justify-between bg-zinc-800 rounded-2xl p-4 mb-3">
                      <div>
                        <p className="font-medium">{ex.name}</p>
                        <p className="text-orange-400 text-sm">{ex.muscle}</p>
                      </div>
                      <p className="text-zinc-400">{ex.sets}×{ex.reps} • {ex.weight}kg</p>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}

        {currentPage === 'perfil' && <div className="text-center py-20 text-3xl text-orange-400">{t('profileComingSoon')}</div>}
      </main>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="relative w-full max-w-6xl h-[420px] flex items-center">
              <motion.img src="/pinscher-puxando.png" className="w-80 h-80 object-contain drop-shadow-2xl z-10" initial={{ x: 700 }} animate={{ x: 450 }} transition={{ duration: 0.95, ease: "easeInOut" }} />
              <motion.div className="absolute left-[635px] top-[172px] w-[190px] h-6 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full origin-left z-0" initial={{ scaleX: 0.50 }} animate={{ scaleX: 0.80 }} transition={{ duration: 0.95, ease: "easeInOut" }} />
              <motion.div className="absolute right-0 w-1/2 h-full bg-zinc-900 border-l-8 border-orange-400 shadow-2xl flex items-center justify-center text-4xl font-bold text-orange-400 z-20" initial={{ x: 300 }} animate={{ x: 130 }} transition={{ duration: 0.95, ease: "easeInOut" }}>
                {targetPage === 'dashboard' && t('dashboard')}
                {targetPage === 'treinos' && t('treinos')}
                {targetPage === 'progresso' && t('progresso')}
                {targetPage === 'perfil' && t('perfil')}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {toast && <div className="fixed bottom-8 right-8 bg-orange-600 text-white px-8 py-4 rounded-2xl shadow-2xl text-sm font-medium">{toast}</div>}
    </div>
  );

  if (!isLoggedIn) return renderLogin();
  return renderMainApp();
}

export default App;