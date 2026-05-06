import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'https://pumpinscher-backend.onrender.com/api/workouts';

const translations = {
  pt: {
    loginTitle: "Bem-vindo ao PumPinscher",
    namePlaceholder: "Seu nome completo",
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
    toastRegister: "Conta criada com sucesso!",
    weeklyTrainings: "TREINOS ESTA SEMANA",
    totalVolume: "REPETIÇÕES TOTAIS",
    currentStreak: "STREAK ATUAL",
    weeklyProgress: "Progresso Semanal",
    forceDetermination: "— Força e determinação",
    logout: "Sair da conta",
    editProfile: "Editar Perfil",
    yourWeight: "Peso (kg)",
    yourHeight: "Altura (cm)",
    yourGoal: "Objetivo",
    yourSex: "Sexo",
    sexMale: "Homem",
    sexFemale: "Mulher",
    restTimer: "Timer de Descanso",
    templates: "Templates Rápidos",
    chestTriceps: "Peito + Tríceps",
    backBiceps: "Costas + Bíceps",
    legs: "Pernas",
    shoulders: "Ombros",
    fullBody: "Full Body",
    workoutName: "Nome do Treino (opcional)",
    addMoreExercises: "Adicionar mais exercícios manualmente",
    startTimer: "Iniciar",
    pauseTimer: "Pausar",
    resetTimer: "Resetar",
    imc: "Seu IMC",
    imcUnderweight: "Baixo peso",
    imcNormal: "Peso normal",
    imcOverweight: "Sobrepeso",
    imcObese: "Obesidade",
    recommendedWorkouts: "Treinos Recomendados para Você",
    bestMuscle: "MELHOR MÚSCULO",
    workoutDetails: "Detalhes do Treino",
    close: "Fechar",
    totalReps: "Repetições Totais",
    dashboardGreeting: "Olá, ",
    dashboardSub: "Vamos treinar hoje?",
    goalGainMass: "Ganho de massa",
    goalLoseFat: "Perda de gordura",
    goalMaintenance: "Manutenção",
    goalStrength: "Força",
    goalEndurance: "Resistência",
    goalOther: "Outro",
    recommendedPushPull6: "Push/Pull/Legs 6 dias",
    recommendedUpperLower4: "Upper/Lower 4 dias",
    recommendedCircuitHIIT: "Circuit Training + HIIT",
    recommendedFullBodyCardio: "Full Body com Cardio"
  },
  es: {
    loginTitle: "Bienvenido a PumPinscher",
    namePlaceholder: "Tu nombre completo",
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
    history: "Historial de Entrenamientos",
    noWorkouts: "Aún no hay entrenamientos...",
    toastSaved: "¡Entrenamiento guardado!",
    toastRegister: "¡Cuenta creada!",
    weeklyTrainings: "ENTRENAMIENTOS ESTA SEMANA",
    totalVolume: "REPETICIONES TOTALES",
    currentStreak: "RÁCHA ACTUAL",
    weeklyProgress: "Progreso Semanal",
    forceDetermination: "— Fuerza y determinación",
    logout: "Cerrar sesión",
    editProfile: "Editar Perfil",
    yourWeight: "Peso (kg)",
    yourHeight: "Altura (cm)",
    yourGoal: "Objetivo",
    yourSex: "Sexo",
    sexMale: "Hombre",
    sexFemale: "Mujer",
    restTimer: "Temporizador de Descanso",
    templates: "Plantillas Rápidas",
    chestTriceps: "Pecho + Tríceps",
    backBiceps: "Espalda + Bíceps",
    legs: "Piernas",
    shoulders: "Hombros",
    fullBody: "Full Body",
    workoutName: "Nombre del Entrenamiento",
    addMoreExercises: "Añadir más ejercicios",
    startTimer: "Iniciar",
    pauseTimer: "Pausar",
    resetTimer: "Reiniciar",
    imc: "Tu IMC",
    imcUnderweight: "Bajo peso",
    imcNormal: "Peso normal",
    imcOverweight: "Sobrepeso",
    imcObese: "Obesidad",
    recommendedWorkouts: "Entrenamientos Recomendados",
    bestMuscle: "MEJOR MÚSCULO",
    workoutDetails: "Detalles del Entrenamiento",
    close: "Cerrar",
    totalReps: "Repeticiones Totales",
    dashboardGreeting: "Hola, ",
    dashboardSub: "Vamos a entrenar hoy?",
    goalGainMass: "Ganancia de masa",
    goalLoseFat: "Pérdida de grasa",
    goalMaintenance: "Mantenimiento",
    goalStrength: "Fuerza",
    goalEndurance: "Resistencia",
    goalOther: "Otro",
    recommendedPushPull6: "Push/Pull/Legs 6 días",
    recommendedUpperLower4: "Upper/Lower 4 días",
    recommendedCircuitHIIT: "Circuit Training + HIIT",
    recommendedFullBodyCardio: "Full Body con Cardio"
  },
  en: {
    loginTitle: "Welcome to PumPinscher",
    namePlaceholder: "Your full name",
    emailPlaceholder: "Your email",
    passwordPlaceholder: "Your password",
    enterButton: "Login",
    registerButton: "Create account",
    selectLanguage: "Select language",
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
    history: "Workout History",
    noWorkouts: "No workouts yet...",
    toastSaved: "Workout saved!",
    toastRegister: "Account created!",
    weeklyTrainings: "WORKOUTS THIS WEEK",
    totalVolume: "TOTAL REPS",
    currentStreak: "CURRENT STREAK",
    weeklyProgress: "Weekly Progress",
    forceDetermination: "— Strength and determination",
    logout: "Logout",
    editProfile: "Edit Profile",
    yourWeight: "Weight (kg)",
    yourHeight: "Height (cm)",
    yourGoal: "Goal",
    yourSex: "Gender",
    sexMale: "Male",
    sexFemale: "Female",
    restTimer: "Rest Timer",
    templates: "Quick Templates",
    chestTriceps: "Chest + Triceps",
    backBiceps: "Back + Biceps",
    legs: "Legs",
    shoulders: "Shoulders",
    fullBody: "Full Body",
    workoutName: "Workout Name",
    addMoreExercises: "Add more exercises",
    startTimer: "Start",
    pauseTimer: "Pause",
    resetTimer: "Reset",
    imc: "Your BMI",
    imcUnderweight: "Underweight",
    imcNormal: "Normal weight",
    imcOverweight: "Overweight",
    imcObese: "Obese",
    recommendedWorkouts: "Recommended Workouts",
    bestMuscle: "BEST MUSCLE",
    workoutDetails: "Workout Details",
    close: "Close",
    totalReps: "Total Reps",
    dashboardGreeting: "Hello, ",
    dashboardSub: "Let's train today?",
    goalGainMass: "Muscle Gain",
    goalLoseFat: "Fat Loss",
    goalMaintenance: "Maintenance",
    goalStrength: "Strength",
    goalEndurance: "Endurance",
    goalOther: "Other",
    recommendedPushPull6: "Push/Pull/Legs 6 days",
    recommendedUpperLower4: "Upper/Lower 4 days",
    recommendedCircuitHIIT: "Circuit + HIIT",
    recommendedFullBodyCardio: "Full Body + Cardio"
  }
} as const;

type Lang = 'pt' | 'es' | 'en';

function App() {
  const [currentLang, setCurrentLang] = useState<Lang>('pt');
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'treinos' | 'progresso' | 'perfil'>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [currentWorkout, setCurrentWorkout] = useState<any[]>([]);
  const [workoutName, setWorkoutName] = useState('');
  const [newExercise, setNewExercise] = useState({ name: '', sets: '', reps: '', weight: '', muscle: '' });
  const [toast, setToast] = useState('');
  const [workoutHistory, setWorkoutHistory] = useState<any[]>([]);

  const [restTime, setRestTime] = useState(180);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPage, setTargetPage] = useState<any>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const t = (key: string) => translations[currentLang][key as keyof typeof translations['pt']] || key;

  const muscleOptions = {
    pt: ["Peito", "Costas", "Pernas", "Braços", "Ombros"],
    es: ["Pecho", "Espalda", "Piernas", "Brazos", "Hombros"],
    en: ["Chest", "Back", "Legs", "Arms", "Shoulders"]
  };

  const motivationalQuotes = {
    pt: ["Tudo posso naquele que me fortalece. — Filipenses 4:13", "Não temas, pois eu sou contigo. — Isaías 41:10", "A dor de hoje é a força de amanhã.", "Disciplina é a ponte entre seus objetivos e suas conquistas.", "Levante-se, sacuda a poeira e continue lutando.", "Seja a versão que você sempre quis ser.", "A raiva é combustível. Use-a para vencer.", "Sofrer agora ou sofrer depois. A escolha é sua.", "Não pare quando estiver cansado. Pare quando estiver feito.", "O corpo conquista o que a mente acredita."],
    es: ["Todo lo puedo en Cristo que me fortalece. — Filipenses 4:13", "No temas, porque yo estoy contigo. — Isaías 41:10", "El dolor de hoy es la fuerza de mañana.", "La disciplina es el puente entre tus objetivos y tus logros.", "Levántate, sacude el polvo y sigue luchando.", "Sé la versión que siempre quisiste ser.", "La rabia es combustible. Úsala para ganar.", "Sufrir ahora o sufrir después. La elección es tuya.", "No pares cuando estés cansado. Para cuando estés hecho.", "El cuerpo conquista lo que la mente cree."],
    en: ["I can do all things through Christ who strengthens me. — Philippians 4:13", "Fear not, for I am with you. — Isaiah 41:10", "Today's pain is tomorrow's strength.", "Discipline is the bridge between your goals and your achievements.", "Get up, shake off the dust and keep fighting.", "Be the version you always wanted to be.", "Anger is fuel. Use it to win.", "Suffer now or suffer later. The choice is yours.", "Don't stop when you're tired. Stop when you're done.", "The body achieves what the mind believes."]
  };

  const fetchWorkouts = async (userEmail: string) => {
    try {
      const res = await fetch(`${API_BASE}?userEmail=${userEmail}`);
      if (res.ok) setWorkoutHistory(await res.json());
    } catch (err) { console.error(err); }
  };

  const saveWorkoutToAPI = async () => {
    if (!currentUser || currentWorkout.length === 0) return;
    const payload = {
      userEmail: currentUser.email,
      name: workoutName.trim() || `Treino ${Date.now()}`,
      exercises: currentWorkout,
      totalReps: currentWorkout.reduce((acc: number, ex: any) => acc + (parseInt(ex.reps) || 0), 0)
    };
    try {
      const res = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) {
        setToast(t('toastSaved'));
        fetchWorkouts(currentUser.email);
        setCurrentWorkout([]);
        setWorkoutName('');
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning && timeLeft > 0) interval = window.setInterval(() => setTimeLeft(t => t - 1), 1000);
    else if (timeLeft === 0) {
      setIsTimerRunning(false);
      setToast("Tempo de descanso finalizado!");
      setTimeout(() => setToast(''), 2200);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isTimerRunning, timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentQuoteIndex(i => (i + 1) % motivationalQuotes[currentLang].length), 5000);
    return () => clearInterval(interval);
  }, [currentLang]);

  const changePage = (newPage: 'dashboard' | 'treinos' | 'progresso' | 'perfil') => {
    if (newPage === currentPage) return;
    setTargetPage(newPage);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
      setTargetPage(null);
    }, 1150);
  };

  const handleRegister = () => {
    if (!name.trim() || !email || !password) return;
    const user = { name: name.trim(), email: email.toLowerCase(), weight: 75, height: 175, goal: "Ganho de massa", sex: "masculino" };
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setIsLoggedIn(true);
    fetchWorkouts(user.email);
    setToast(t('toastRegister'));
  };

  const handleLogin = () => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      const user = JSON.parse(saved);
      if (user.email === email.toLowerCase()) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        fetchWorkouts(user.email);
        return;
      }
    }
    alert("Usuário não encontrado. Crie uma conta.");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setWorkoutHistory([]);
  };

  const getRecommendedWorkouts = () => {
    if (!currentUser) return [t('fullBody')];
    return [t('recommendedPushPull6'), t('recommendedUpperLower4')];
  };

  const loadTemplate = (templateKey: string) => {
    let exercises: any[] = [];
    if (templateKey === 'chestTriceps') exercises = [{ id: Date.now()+1, name: "Supino Reto", muscle: "Peito", sets: "4", reps: "8-10", weight: "70" }];
    if (templateKey === 'backBiceps') exercises = [{ id: Date.now()+1, name: "Barra Fixa", muscle: "Costas", sets: "4", reps: "8-10", weight: "" }];
    if (templateKey === 'legs') exercises = [{ id: Date.now()+1, name: "Agachamento Livre", muscle: "Pernas", sets: "4", reps: "8-10", weight: "90" }];
    if (templateKey === 'shoulders') exercises = [{ id: Date.now()+1, name: "Desenvolvimento Militar", muscle: "Ombros", sets: "4", reps: "8-10", weight: "45" }];
    if (templateKey === 'fullBody') exercises = [{ id: Date.now()+1, name: "Agachamento", muscle: "Pernas", sets: "4", reps: "8", weight: "80" }];
    setCurrentWorkout([...currentWorkout, ...exercises]);
    setToast("Template carregado!");
    setTimeout(() => setToast(''), 2200);
  };

  const addExercise = () => {
    if (!newExercise.name || !newExercise.muscle) return;
    setCurrentWorkout([...currentWorkout, { ...newExercise, id: Date.now() }]);
    setNewExercise({ name: '', sets: '', reps: '', weight: '', muscle: '' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-900 rounded-3xl p-10">
          <img src="/pinscher-mascot.png" alt="PumPinscher" className="w-32 h-32 mx-auto mb-6" />
          <h1 className="text-4xl font-black text-center text-white mb-2">{t('loginTitle')}</h1>
          <p className="text-orange-400 text-center mb-8">o pinscher que não desiste</p>
          <div className="flex justify-center gap-2 mb-8">
            {(['pt','es','en'] as Lang[]).map(l => (
              <button key={l} onClick={() => setCurrentLang(l)} className={`px-5 py-2 rounded-2xl ${currentLang === l ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-white'}`}>{l.toUpperCase()}</button>
            ))}
          </div>
          {isRegisterMode && <input type="text" placeholder={t('namePlaceholder')} value={name} onChange={e => setName(e.target.value)} className="w-full bg-zinc-800 text-white rounded-2xl px-6 py-5 mb-4" />}
          <input type="email" placeholder={t('emailPlaceholder')} value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-zinc-800 text-white rounded-2xl px-6 py-5 mb-4" />
          <input type="password" placeholder={t('passwordPlaceholder')} value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-zinc-800 text-white rounded-2xl px-6 py-5 mb-8" />
          <button onClick={isRegisterMode ? handleRegister : handleLogin} className="w-full py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xl font-bold rounded-3xl">
            {isRegisterMode ? t('registerButton') : t('enterButton')}
          </button>
          <button onClick={() => setIsRegisterMode(!isRegisterMode)} className="text-orange-400 text-center w-full mt-6 hover:underline">
            {isRegisterMode ? 'Já tem conta? Entrar' : 'Criar conta'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white">
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-2xl border-b border-orange-500">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/pinscher-mascot.png" alt="PumPinscher" className="w-12 h-12" />
            <h1 className="text-3xl font-black tracking-[-2px] bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">PumPinscher</h1>
          </div>
          <nav className="flex gap-8 text-lg font-medium">
            {[
              { page: 'dashboard', label: t('dashboard') },
              { page: 'treinos', label: t('treinos') },
              { page: 'progresso', label: t('progresso') },
              { page: 'perfil', label: t('perfil') }
            ].map(({ page, label }) => (
              <button
                key={page}
                onClick={() => changePage(page as any)}
                className={`relative group transition-all duration-300 hover:scale-105 hover:text-orange-400 ${currentPage === page ? 'text-orange-400' : 'text-white'}`}
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
          <button onClick={logout} className="text-sm text-zinc-400 hover:text-white">Sair</button>
        </div>
      </header>

      <AnimatePresence>
        {isTransitioning && targetPage && (
          <motion.div className="fixed inset-0 z-[9999] bg-black flex items-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.img src="/pinscher-puxando.png" alt="Pinscher" className="absolute left-[380px] top-1/2 w-64 -translate-y-1/2 z-30" initial={{ x: 900 }} animate={{ x: 700 }} transition={{ duration: 1.1 }} />
            <motion.div className="absolute left-[410px] top-[calc(50%-12px)] w-[520px] h-6 bg-gradient-to-r from-transparent via-amber-400 to-transparent origin-left z-20" initial={{ scaleX: 0.35 }} animate={{ scaleX: 1.5 }} transition={{ duration: 1.1 }} />
            <motion.div className="absolute right-0 w-1/2 h-full bg-gradient-to-br from-zinc-950 to-black border-l-8 border-orange-400 flex items-center justify-center text-5xl font-black text-orange-400 z-10" initial={{ x: 250 }} animate={{ x: 50 }} transition={{ duration: 1.1 }}>
              {t(targetPage)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-8 py-10">
          {/* DASHBOARD */}
          {currentPage === 'dashboard' && (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-6xl font-black">{t('dashboardGreeting')}{currentUser?.name}! {t('dashboardSub')}</h1>
              <motion.div key={currentQuoteIndex} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-12 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-orange-400/30 rounded-3xl p-12 shadow-2xl">
                <div className="max-w-2xl mx-auto text-center">
                  <p className="text-3xl italic leading-relaxed text-white">"{motivationalQuotes[currentLang][currentQuoteIndex]}"</p>
                  <p className="text-orange-400 text-sm mt-8 font-medium tracking-widest">{t('forceDetermination')}</p>
                </div>
              </motion.div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:scale-105 transition-transform">
                  <p className="text-orange-400 text-sm font-medium">{t('weeklyTrainings')}</p>
                  <p className="text-7xl font-black mt-4">{workoutHistory.length}</p>
                </div>
                <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:scale-105 transition-transform">
                  <p className="text-orange-400 text-sm font-medium">{t('totalVolume')}</p>
                  <p className="text-7xl font-black mt-4">{workoutHistory.reduce((acc: number, w: any) => acc + (w.totalReps || 0), 0)}</p>
                </div>
                <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:scale-105 transition-transform">
                  <p className="text-orange-400 text-sm font-medium">{t('currentStreak')}</p>
                  <p className="text-7xl font-black mt-4">7 🔥</p>
                </div>
              </div>
            </div>
          )}

          {/* TREINOS */}
          {currentPage === 'treinos' && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-orange-400">{t('newWorkout')}</h2>
              <div className="bg-zinc-900 rounded-3xl p-8 mb-10">
                <p className="text-orange-400 font-medium mb-2">{t('restTimer')}</p>
                <div className="text-8xl font-mono font-bold text-center mb-8">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {[30,60,90,120,180,240,300].map(time => (
                    <button key={time} onClick={() => { setRestTime(time); setTimeLeft(time); setIsTimerRunning(false); }} className={`px-5 py-3 rounded-2xl text-sm font-medium transition-all ${restTime === time ? 'bg-orange-500 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                      {time < 60 ? `${time}s` : `${Math.floor(time/60)}:${(time%60).toString().padStart(2, '0')}`}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setIsTimerRunning(true)} disabled={isTimerRunning} className="flex-1 py-5 bg-green-600 rounded-2xl font-bold">▶ {t('startTimer')}</button>
                  <button onClick={() => setIsTimerRunning(false)} disabled={!isTimerRunning} className="flex-1 py-5 bg-amber-600 rounded-2xl font-bold">⏸ {t('pauseTimer')}</button>
                  <button onClick={() => { setIsTimerRunning(false); setTimeLeft(restTime); }} className="flex-1 py-5 bg-zinc-700 rounded-2xl font-bold">⟳ {t('resetTimer')}</button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3 mb-8">
                {['chestTriceps','backBiceps','legs','shoulders','fullBody'].map(key => (
                  <button key={key} onClick={() => loadTemplate(key)} className="bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl text-sm">{t(key as any)}</button>
                ))}
              </div>

              {currentWorkout.length > 0 && (
                <div className="space-y-4 mb-12">
                  {currentWorkout.map((ex, i) => (
                    <div key={ex.id} className="bg-zinc-800 rounded-2xl p-5 grid grid-cols-5 gap-4 items-center">
                      <div className="col-span-2">
                        <p className="font-medium">{ex.name}</p>
                        <p className="text-xs text-orange-400">{ex.muscle}</p>
                      </div>
                      <input type="number" value={ex.sets} onChange={e => { const arr = [...currentWorkout]; arr[i].sets = e.target.value; setCurrentWorkout(arr); }} className="bg-zinc-700 text-center rounded-xl py-3 text-white" />
                      <input type="number" value={ex.reps} onChange={e => { const arr = [...currentWorkout]; arr[i].reps = e.target.value; setCurrentWorkout(arr); }} className="bg-zinc-700 text-center rounded-xl py-3 text-white" />
                      <input type="number" value={ex.weight} onChange={e => { const arr = [...currentWorkout]; arr[i].weight = e.target.value; setCurrentWorkout(arr); }} className="bg-zinc-700 text-center rounded-xl py-3 text-white" />
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-zinc-900 rounded-3xl p-8 mb-8">
                <h3 className="font-semibold mb-6">{t('addMoreExercises')}</h3>
                <div className="grid grid-cols-5 gap-4">
                  <input type="text" placeholder={t('exerciseName')} value={newExercise.name} onChange={e => setNewExercise({...newExercise, name: e.target.value})} className="bg-zinc-800 px-4 py-4 rounded-2xl text-white col-span-2" />
                  <select value={newExercise.muscle} onChange={e => setNewExercise({...newExercise, muscle: e.target.value})} className="bg-zinc-800 px-4 py-4 rounded-2xl text-white">
                    <option value="">{t('muscle')}</option>
                    {muscleOptions[currentLang].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <input type="number" placeholder={t('sets')} value={newExercise.sets} onChange={e => setNewExercise({...newExercise, sets: e.target.value})} className="bg-zinc-800 px-4 py-4 rounded-2xl text-center text-white" />
                  <input type="number" placeholder={t('reps')} value={newExercise.reps} onChange={e => setNewExercise({...newExercise, reps: e.target.value})} className="bg-zinc-800 px-4 py-4 rounded-2xl text-center text-white" />
                  <button onClick={addExercise} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl col-span-5 md:col-span-1">{t('addExercise')}</button>
                </div>
              </div>

              {currentWorkout.length > 0 && <button onClick={saveWorkoutToAPI} className="w-full py-6 text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl">{t('saveWorkout')}</button>}
            </div>
          )}

          {/* PROGRESSO */}
          {currentPage === 'progresso' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8">{t('progresso')}</h2>
              {workoutHistory.length === 0 ? (
                <p className="text-zinc-400 text-center py-12">{t('noWorkouts')}</p>
              ) : (
                <div className="space-y-4">
                  {workoutHistory.map((workout: any) => (
                    <motion.div key={workout.id} whileHover={{ scale: 1.02 }} onClick={() => setSelectedWorkout(workout)} className="bg-zinc-900 rounded-3xl p-6 flex justify-between items-center cursor-pointer">
                      <div>
                        <p className="font-medium">{workout.name}</p>
                        <p className="text-sm text-zinc-400">{workout.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-400 font-semibold">{workout.totalReps} {t('totalReps')}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              <AnimatePresence>
                {selectedWorkout && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-6" onClick={() => setSelectedWorkout(null)}>
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} className="bg-zinc-900 max-w-2xl w-full rounded-3xl p-8">
                      <h2 className="text-3xl font-bold mb-2">{selectedWorkout.name}</h2>
                      <p className="text-orange-400 mb-8">{selectedWorkout.date}</p>
                      <div className="space-y-4">
                        {selectedWorkout.exercises.map((ex: any) => (
                          <div key={ex.id} className="flex justify-between items-center bg-black/30 rounded-2xl p-5">
                            <div>
                              <p className="font-medium">{ex.name}</p>
                              <p className="text-xs text-orange-400">{ex.muscle}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">{ex.sets} séries × {ex.reps} reps</p>
                              <p className="text-orange-400 font-semibold">{ex.weight} kg</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setSelectedWorkout(null)} className="mt-8 w-full py-5 text-lg font-bold bg-orange-500 rounded-3xl">{t('close')}</button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* PERFIL */}
          {currentPage === 'perfil' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8">{t('perfil')}</h2>
              <div className="bg-zinc-900 rounded-3xl p-8">
                <h3 className="text-lg text-orange-400 mb-4">{t('editProfile')}</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">{t('yourSex')}</label>
                    <select value={currentUser?.sex || 'masculino'} onChange={e => setCurrentUser({...currentUser, sex: e.target.value})} className="w-full bg-zinc-800 rounded-2xl px-6 py-4 text-white">
                      <option value="masculino">{t('sexMale')}</option>
                      <option value="feminino">{t('sexFemale')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">{t('yourWeight')}</label>
                    <input type="number" value={currentUser?.weight || ''} onChange={e => setCurrentUser({...currentUser, weight: parseFloat(e.target.value) || null})} className="w-full bg-zinc-800 rounded-2xl px-6 py-4 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">{t('yourHeight')}</label>
                    <input type="number" value={currentUser?.height || ''} onChange={e => setCurrentUser({...currentUser, height: parseFloat(e.target.value) || null})} className="w-full bg-zinc-800 rounded-2xl px-6 py-4 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">{t('yourGoal')}</label>
                    <select value={currentUser?.goal || ''} onChange={e => setCurrentUser({...currentUser, goal: e.target.value})} className="w-full bg-zinc-800 rounded-2xl px-6 py-4 text-white">
                      <option value="">{t('goalOther')}</option>
                      <option value="Ganho de massa">{t('goalGainMass')}</option>
                      <option value="Perda de gordura">{t('goalLoseFat')}</option>
                      <option value="Manutenção">{t('goalMaintenance')}</option>
                      <option value="Força">{t('goalStrength')}</option>
                      <option value="Resistência">{t('goalEndurance')}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="bg-zinc-900 rounded-3xl p-8 text-center">
                  <p className="text-orange-400">{t('imc')}</p>
                  <p className="text-6xl font-black mt-4">22.5</p>
                  <p className="text-green-400 mt-3">Peso normal</p>
                </div>
                <div className="bg-zinc-900 rounded-3xl p-8 text-center">
                  <p className="text-orange-400">{t('bestMuscle')}</p>
                  <p className="text-5xl font-black mt-6 text-white">PERNAS</p>
                </div>
                <div className="bg-zinc-900 rounded-3xl p-8 text-center">
                  <p className="text-orange-400">{t('recommendedWorkouts')}</p>
                  <div className="mt-6 space-y-3">
                    {getRecommendedWorkouts().map((rec, i) => <p key={i} className="text-orange-400">{rec}</p>)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.main>
      </AnimatePresence>

      {toast && <div className="fixed bottom-8 right-8 bg-orange-600 px-8 py-4 rounded-3xl text-white">{toast}</div>}
    </div>
  );
}

export default App;