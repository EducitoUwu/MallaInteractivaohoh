import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle, Lock, BookOpen, Star, Trophy } from 'lucide-react';
import './App.css';

interface Subject {
  code: string;
  name: string;
  credits: number;
  semester: number;
  year: number;
  prerequisites: string[];
  type: 'basico' | 'profesional' | 'especialidad' | 'electivo' | 'teologia' | 'taller' | 'transversal' | 'direccion' | 'general' | 'integrador';
  isCompleted: boolean;
  isAvailable: boolean;
}

interface StudentProgress {
  completedSubjects: string[];
  currentSemester: number;
  totalCredits: number;
  gpa?: number;
}

function App() {
  // Datos de la malla curricular de Ingeniería Comercial basados en la imagen oficial
  const [subjects, setSubjects] = useState<Subject[]>([
    // SEMESTRE I
  { code: 'EE100', name: 'Introducción a la Economía', credits: 6, semester: 1, year: 1, prerequisites: [], type: 'basico', isCompleted: false, isAvailable: true },
  { code: 'EE101', name: 'Introducción a la Administración', credits: 6, semester: 1, year: 1, prerequisites: [], type: 'basico', isCompleted: false, isAvailable: true },
  { code: 'CB103', name: 'Matemática I', credits: 8, semester: 1, year: 1, prerequisites: [], type: 'transversal', isCompleted: false, isAvailable: true },
  { code: 'CB104', name: 'Taller de Habilidades I', credits: 3, semester: 1, year: 1, prerequisites: [], type: 'transversal', isCompleted: false, isAvailable: true },
  { code: 'CB102', name: 'Desarrollo de Actitud Emprendedora', credits: 4, semester: 1, year: 1, prerequisites: [], type: 'transversal', isCompleted: false, isAvailable: true },
  { code: 'FGT12', name: 'Formación General Teológica', credits: 1, semester: 1, year: 1, prerequisites: [], type: 'general', isCompleted: false, isAvailable: true },

  // SEMESTRE II
  { code: 'EE200', name: 'Macroeconomía I', credits: 5, semester: 2, year: 1, prerequisites: ['EE100'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'EE201', name: 'Administración', credits: 5, semester: 2, year: 1, prerequisites: ['EE101'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'EE202', name: 'Contabilidad Financiera I', credits: 5, semester: 2, year: 1, prerequisites: [], type: 'basico', isCompleted: false, isAvailable: true },
  { code: 'EE203', name: 'Estadística I', credits: 6, semester: 2, year: 1, prerequisites: [], type: 'basico', isCompleted: false, isAvailable: true },
  { code: 'CB200', name: 'Matemática II', credits: 6, semester: 2, year: 1, prerequisites: ['CB103'], type: 'transversal', isCompleted: false, isAvailable: false },
  { code: 'CB204', name: 'Taller de Habilidades II', credits: 2, semester: 2, year: 1, prerequisites: ['CB104'], type: 'transversal', isCompleted: false, isAvailable: false },

  // SEMESTRE III
  { code: 'EE305', name: 'Microeconomía I', credits: 5, semester: 3, year: 2, prerequisites: ['EE200'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'EE306', name: 'Comportamiento Organizacional', credits: 5, semester: 3, year: 2, prerequisites: ['EE201'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'EE307', name: 'Contabilidad Financiera II', credits: 5, semester: 3, year: 2, prerequisites: ['EE202'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'EE308', name: 'Estadística II', credits: 5, semester: 3, year: 2, prerequisites: ['EE203'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'CB300', name: 'Matemática III', credits: 6, semester: 3, year: 2, prerequisites: ['CB200'], type: 'transversal', isCompleted: false, isAvailable: false },
  { code: 'FG114', name: '*Formación General Globalización', credits: 4, semester: 3, year: 2, prerequisites: [], type: 'general', isCompleted: false, isAvailable: true },

  // SEMESTRE IV
  { code: 'EE405', name: 'Macroeconomía II', credits: 5, semester: 4, year: 2, prerequisites: ['EE200'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'EE406', name: 'Legislación de Negocios', credits: 5, semester: 4, year: 2, prerequisites: [], type: 'basico', isCompleted: false, isAvailable: true },
  { code: 'EE407', name: 'Costos y Presupuestos', credits: 7, semester: 4, year: 2, prerequisites: ['EE307'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'EE408', name: 'Econometría', credits: 5, semester: 4, year: 2, prerequisites: ['EE308'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'FG214', name: '*Formación General Globalización', credits: 3, semester: 4, year: 2, prerequisites: [], type: 'general', isCompleted: false, isAvailable: true },

  // SEMESTRE V
  { code: 'EE502', name: 'Microeconomía II', credits: 4, semester: 5, year: 3, prerequisites: ['EE305'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'EE503', name: 'Gestión Tributaria', credits: 5, semester: 5, year: 3, prerequisites: ['EE407'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'EE504', name: 'Métodos Cuantitativos Administración', credits: 6, semester: 5, year: 3, prerequisites: ['EE408'], type: 'basico', isCompleted: false, isAvailable: false },
  { code: 'EE505', name: 'Marketing I', credits: 5, semester: 5, year: 3, prerequisites: [], type: 'basico', isCompleted: false, isAvailable: true },
  { code: 'EE506', name: 'Identificación de Oportunidades de Negocios', credits: 5, semester: 5, year: 3, prerequisites: [], type: 'transversal', isCompleted: false, isAvailable: true },
  { code: 'FG311', name: '*Formación General Globalización', credits: 4, semester: 5, year: 3, prerequisites: [], type: 'general', isCompleted: false, isAvailable: true },

  // SEMESTRE VI
  { code: 'EE603', name: 'Organización Industrial', credits: 2, semester: 6, year: 3, prerequisites: ['EE502'], type: 'direccion', isCompleted: false, isAvailable: false },
  { code: 'EE604', name: 'Relaciones Laborales', credits: 5, semester: 6, year: 3, prerequisites: [], type: 'direccion', isCompleted: false, isAvailable: true },
  { code: 'EE605', name: 'Marketing II', credits: 5, semester: 6, year: 3, prerequisites: ['EE505'], type: 'direccion', isCompleted: false, isAvailable: false },
  { code: 'EE606', name: 'Administración Financiera', credits: 5, semester: 6, year: 3, prerequisites: ['EE407'], type: 'direccion', isCompleted: false, isAvailable: false },
  { code: 'EE607', name: 'Integrador I: Taller Diagnóstico Organizacional', credits: 6, semester: 6, year: 3, prerequisites: ['EE506'], type: 'integrador', isCompleted: false, isAvailable: false },
  { code: 'FG413', name: '*Formación General Globalización', credits: 4, semester: 6, year: 3, prerequisites: [], type: 'general', isCompleted: false, isAvailable: true },

  // SEMESTRE VII
  { code: 'EE707', name: 'Planificación Estratégica', credits: 2, semester: 7, year: 4, prerequisites: ['EE607'], type: 'direccion', isCompleted: false, isAvailable: false },
  { code: 'EE708', name: 'Liderazgo de Personas', credits: 6, semester: 7, year: 4, prerequisites: [], type: 'direccion', isCompleted: false, isAvailable: true },
  { code: 'EE709', name: 'Finanzas Corporativas', credits: 6, semester: 7, year: 4, prerequisites: ['EE606'], type: 'direccion', isCompleted: false, isAvailable: false },
  { code: 'EE713', name: 'Sistemas de Información', credits: 5, semester: 7, year: 4, prerequisites: [], type: 'direccion', isCompleted: false, isAvailable: true },
  { code: 'FG18B', name: 'Formación General Electiva', credits: 2, semester: 7, year: 4, prerequisites: [], type: 'general', isCompleted: false, isAvailable: true },

  // SEMESTRE VIII
  { code: 'EE810', name: 'Control de Gestión', credits: 4, semester: 8, year: 4, prerequisites: ['EE709'], type: 'direccion', isCompleted: false, isAvailable: false },
  { code: 'EE811', name: 'Desarrollo Organizacional', credits: 4, semester: 8, year: 4, prerequisites: ['EE708'], type: 'direccion', isCompleted: false, isAvailable: false },
  { code: 'EE812', name: 'Logística Empresarial', credits: 4, semester: 8, year: 4, prerequisites: [], type: 'direccion', isCompleted: false, isAvailable: true },
  { code: 'FG3T4', name: 'Formación General Teológica', credits: 4, semester: 8, year: 4, prerequisites: [], type: 'general', isCompleted: false, isAvailable: true },
  { code: 'FG2B8', name: 'Formación General Electiva', credits: 4, semester: 8, year: 4, prerequisites: [], type: 'general', isCompleted: false, isAvailable: true },

  // SEMESTRE IX
  { code: 'FP923', name: 'Formación Profesional Electiva I', credits: 8, semester: 9, year: 5, prerequisites: [], type: 'electivo', isCompleted: false, isAvailable: true },
  { code: 'FP924', name: 'Formación Profesional Electiva II', credits: 8, semester: 9, year: 5, prerequisites: [], type: 'electivo', isCompleted: false, isAvailable: true },
  { code: 'FP9Y8', name: 'Formación Profesional Electiva III', credits: 24, semester: 9, year: 5, prerequisites: [], type: 'electivo', isCompleted: false, isAvailable: true },
  { code: 'FP9T1', name: '**Formación Profesional Electiva: Preparación de Título', credits: 6, semester: 9, year: 5, prerequisites: [], type: 'electivo', isCompleted: false, isAvailable: true },
  { code: 'EE913', name: 'Integrador: Taller de Negocios & Proyectos', credits: 6, semester: 10, year: 5, prerequisites: [], type: 'taller', isCompleted: false, isAvailable: true },
  // SEMESTRE X
  { code: 'FPAT2', name: '**Formación Profesional Electiva: Seminario de Título', credits: 6, semester: 10, year: 5, prerequisites: ['FP9T1'], type: 'electivo', isCompleted: false, isAvailable: false },
  
  ]);

  const [studentProgress, setStudentProgress] = useState<StudentProgress>({
    completedSubjects: [],
    currentSemester: 1,
    totalCredits: 0
  });

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // Actualizar disponibilidad de materias según prerequisitos
  useEffect(() => {
    updateSubjectAvailability();
  }, [studentProgress.completedSubjects]);

  const updateSubjectAvailability = () => {
    setSubjects(prevSubjects =>
      prevSubjects.map(subject => {
        if (studentProgress.completedSubjects.includes(subject.code)) {
          return { ...subject, isCompleted: true, isAvailable: true };
        }
        
        const prerequisitesMet = subject.prerequisites.every(prereq =>
          studentProgress.completedSubjects.includes(prereq)
        );
        
        return {
          ...subject,
          isCompleted: false,
          isAvailable: prerequisitesMet
        };
      })
    );
  };

  const toggleSubjectCompletion = (subjectCode: string) => {
    setStudentProgress(prev => {
      const isCurrentlyCompleted = prev.completedSubjects.includes(subjectCode);
      const newCompletedSubjects = isCurrentlyCompleted
        ? prev.completedSubjects.filter(code => code !== subjectCode)
        : [...prev.completedSubjects, subjectCode];

      const newTotalCredits = subjects
        .filter(s => newCompletedSubjects.includes(s.code))
        .reduce((total, s) => total + s.credits, 0);

      return {
        ...prev,
        completedSubjects: newCompletedSubjects,
        totalCredits: newTotalCredits
      };
    });
  };

  const getSubjectTypeColor = (type: string) => {
    const colors = {
      basico: '#e3f2fd',
      profesional: '#fff3e0',
      especialidad: '#f3e5f5',
      electivo: '#e8f5e8',
      teologia: '#fce4ec',
      taller: '#fff8e1',
      transversal: '#f0f4c3',
      direccion: '#ffe0b2',
      general: '#f3e5f5',
      integrador: '#ffccbc'
    };
    return colors[type as keyof typeof colors] || '#f5f5f5';
  };

  const getSubjectStatus = (subject: Subject) => {
    if (studentProgress.completedSubjects.includes(subject.code)) {
      return 'completed';
    } else if (subject.isAvailable) {
      return 'available';
    } else {
      return 'locked';
    }
  };

  const organizeSubjectsBySemester = () => {
    const organized: { [key: number]: Subject[] } = {};
    
    for (let semester = 1; semester <= 10; semester++) {
      organized[semester] = subjects.filter(s => s.semester === semester);
    }
    
    return organized;
  };

  const semesterData = organizeSubjectsBySemester();
  const completedCredits = studentProgress.totalCredits;
  const totalCredits = subjects.reduce((total, s) => total + s.credits, 0);
  const progressPercentage = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;

  return (
    <div className="app">
      <div className="header">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="title"
        >
          <GraduationCap className="graduation-icon" />
          Malla Curricular de Foxita
          <Star className="star-icon" />
        </motion.h1>
        
        <div className="student-info">
          <h2>💕 Isidora Rivera "Foxita" 💕</h2>
          <p>Ingeniería Comercial</p>
        </div>

        <div className="progress-section">
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-number">{studentProgress.completedSubjects.length}</span>
              <span className="stat-label">Materias Aprobadas</span>
            </div>
            <div className="stat">
              <span className="stat-number">{completedCredits}</span>
              <span className="stat-label">Créditos</span>
            </div>
            <div className="stat">
              <span className="stat-number">{progressPercentage.toFixed(1)}%</span>
              <span className="stat-label">Progreso</span>
            </div>
          </div>
          
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>

      <motion.div 
        className="curriculum-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="semesters-grid">
          {Object.entries(semesterData).map(([semester, semesterSubjects]) => (
            <div key={semester} className="semester-section">
              <h3 className="semester-title">Semestre {semester}</h3>
              
              <div className="subjects-list">
                {semesterSubjects.map(subject => {
                  const status = getSubjectStatus(subject);
                  return (
                    <motion.div
                      key={subject.code}
                      className={`subject-card ${status}`}
                      style={{ backgroundColor: getSubjectTypeColor(subject.type) }}
                      onClick={() => setSelectedSubject(subject)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.random() * 0.5 }}
                    >
                      <div className="subject-header">
                        <span className="subject-code">{subject.code}</span>
                        <div className="subject-status-icon">
                          {status === 'completed' && <CheckCircle size={16} />}
                          {status === 'locked' && <Lock size={16} />}
                          {status === 'available' && <BookOpen size={16} />}
                        </div>
                      </div>
                      
                      <h5 className="subject-name">{subject.name}</h5>
                      <p className="subject-credits">{subject.credits} créditos</p>
                      
                      {status === 'available' && !subject.isCompleted && (
                        <button
                          className="approve-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubjectCompletion(subject.code);
                          }}
                        >
                          Aprobar ✨
                        </button>
                      )}
                      
                      {status === 'completed' && (
                        <button
                          className="unapprove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubjectCompletion(subject.code);
                          }}
                        >
                          Desaprobar
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {selectedSubject && (
        <motion.div 
          className="subject-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedSubject(null)}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedSubject.name}</h3>
            <p><strong>Código:</strong> {selectedSubject.code}</p>
            <p><strong>Créditos:</strong> {selectedSubject.credits}</p>
            <p><strong>Tipo:</strong> {selectedSubject.type}</p>
            <p><strong>Semestre:</strong> {selectedSubject.semester}</p>
            {selectedSubject.prerequisites.length > 0 && (
              <div>
                <strong>Prerequisitos:</strong>
                <ul>
                  {selectedSubject.prerequisites.map(prereq => {
                    const prereqSubject = subjects.find(s => s.code === prereq);
                    return (
                      <li key={prereq}>
                        {prereq} - {prereqSubject?.name || 'Materia'}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <button className="close-btn" onClick={() => setSelectedSubject(null)}>
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}

      <motion.div 
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>🎓 ¡Haz clic en las materias para marcarlas como aprobadas! 🎓</p>
        <div className="floating-icons">
          <Trophy className="floating-icon" />
          <GraduationCap className="floating-icon" />
          <Star className="floating-icon" />
        </div>
      </motion.div>
    </div>
  );
}

export default App;
