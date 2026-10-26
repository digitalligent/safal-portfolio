import {
  useEffect,
  useState,
  type FormEvent,
  type CSSProperties,
} from "react";
import profileData from "./data/profile.json";
import CinematicIntro from "./Intro";
import ParticlesBackground from "./ParticlesBackground";
import {
  languages,
  translate,
  type Language,
  type TranslationKey,
} from "./translations";
import "./App.css";


type Theme = "dark" | "light";

type Project = {
  id: string;
  number: string;
  title: string;
  serviceLabel: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  tools: string[];
  link: string;
  linkText: string;
  featured: boolean;
};

type SkillGroup = {
  number: string;
  category: string;
  title: string;
  description: string;
  skills: string[];
  tools: string[];
  project: string;
  projectDescription: string;
  link: string;
  linkText: string;
  icon: "calculator" | "code" | "film";
};

const profile = profileData;
const contactEmail = "silwalsafal58@gmail.com";

const whatsappUrl =
  "https://wa.me/351920314799?text=Hi%20Safal%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.";

const projects: Project[] = [
  {
    id: "forex-tools",
    number: "01",
    title: "All-in-One Forex Tools",
    serviceLabel: "NEED A WEB DEVELOPER?",
    category: "Finance",
    categoryLabel: "WEB DEVELOPMENT · FOREX TOOLS",
    description:
      "Explore my live Forex calculator project, featuring interactive pip-value calculations, position sizing, trade-risk planning, and market-data integration. It demonstrates my practical work building and publishing a web application.",
    image: "/images/project-forex.jpg",
    tools: ["React", "TypeScript", "JavaScript", "REST APIs"],
    link: "https://all-in-one-forex-tools.onrender.com/",
    linkText: "Explore live project",
    featured: true,
  },
  {
    id: "enigmatic-pedia",
    number: "02",
    title: "The Enigmatic Pedia",
    serviceLabel: "LOOKING FOR A VIDEO EDITOR?",
    category: "Creative",
    categoryLabel: "VIDEO EDITING · YOUTUBE",
    description:
      "The Enigmatic Pedia is my YouTube channel and a sample of my creative work. Explore the channel to see my digital content and video-editing projects created using DaVinci Resolve.",
    image: "/images/project-enigmatic-pedia.jpg",
    tools: ["DaVinci Resolve", "Video Editing", "YouTube"],
    link: "https://www.youtube.com/@TheEnigmaticPedia",
    linkText: "View video portfolio",
    featured: true,
  },
];

const skillGroups: SkillGroup[] = [
  {
    number: "01",
    category: "FINANCIAL TOOLS",
    title: "Forex Calculator Development",
    description:
      "Developing a practical Forex calculator for pip values, position sizing, trade risk, and potential trade outcomes.",
    skills: [
      "Forex Calculations",
      "Pip Value",
      "Position Sizing",
      "Risk Management",
    ],
    tools: ["React", "TypeScript", "JavaScript", "REST APIs"],
    project: "All-in-One Forex Tools",
    projectDescription:
      "An interactive Forex calculation web application.",
    link: "https://all-in-one-forex-tools.onrender.com/",
    linkText: "Explore live project",
    icon: "calculator",
  },
  {
    number: "02",
    category: "SOFTWARE DEVELOPMENT",
    title: "Web Application Development",
    description:
      "Building interactive interfaces, organizing application components, and connecting applications to external market-data services.",
    skills: [
      "Interactive Interfaces",
      "Component-Based UI",
      "API Integration",
      "Responsive Layouts",
    ],
    tools: ["React", "TypeScript", "JavaScript", "HTML & CSS"],
    project: "All-in-One Forex Tools",
    projectDescription:
      "A published web application demonstrating practical development work.",
    link: "https://all-in-one-forex-tools.onrender.com/",
    linkText: "View application",
    icon: "code",
  },
  {
    number: "03",
    category: "CREATIVE PRODUCTION",
    title: "Video Editing",
    description:
      "Preparing and assembling video content for online audiences, with a focus on digital content production for YouTube.",
    skills: [
      "Timeline Arrangement",
      "Video Assembly",
      "Audio and Visual Editing",
      "Digital Content Production",
    ],
    tools: ["DaVinci Resolve", "YouTube"],
    project: "The Enigmatic Pedia",
    projectDescription:
      "My YouTube channel, presented as a sample of my creative work.",
    link: "https://www.youtube.com/@TheEnigmaticPedia",
    linkText: "View channel",
    icon: "film",
  },
];

const roles: Record<Language, string[]> = {
  en: [
    "Web Developer",
    "Video Editor",
    "Forex Tool Developer",
    "Digital Creator",
    "Problem Solver",
  ],
  pt: [
    "Programador Web",
    "Editor de Vídeo",
    "Programador de Ferramentas Forex",
    "Criador Digital",
    "Solucionador de Problemas",
  ],
  es: [
    "Desarrollador Web",
    "Editor de Vídeo",
    "Desarrollador de Herramientas Forex",
    "Creador Digital",
    "Solucionador de Problemas",
  ],
  fr: [
    "Développeur Web",
    "Monteur Vidéo",
    "Développeur d’Outils Forex",
    "Créateur Numérique",
    "Résolveur de Problèmes",
  ],
  ru: [
    "Веб-разработчик",
    "Видеомонтажёр",
    "Разработчик Forex-инструментов",
    "Цифровой создатель",
    "Решатель задач",
  ],
};

const extra: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    talk: "Let's talk",
    greeting: "AVAILABLE FOR OPPORTUNITIES",
    rolePrefix: "I'm a ",
    explore: "Explore my work",
    getInTouch: "Get in touch",
    downloadCV: "Download CV",
    basedIn: "Based in",
    scroll: "Scroll to explore",
    creativeDeveloper: "CREATIVE DEVELOPER",
    aboutEyebrow: "01 — ABOUT ME",
    aboutHeading: "Curiosity into",
    creation: "creation.",
    aboutLead:
      "I'm an independent creator and developer interested in web development, Forex tools, digital experiences, and creative content.",
    aboutText:
      "I learn by building practical projects, exploring new tools, and improving each iteration. This portfolio brings together my web-development project and my video-editing work.",
    learn: "Learn by building",
    learnText: "Turn ideas into practical experiments.",
    improve: "Keep improving",
    improveText: "Refine the details and learn from each project.",
    curious: "Stay curious",
    curiousText: "Explore technology with an open mind.",
    skillsEyebrow: "02 — SKILLS",
    skillsHeading: "Skills & interests.",
    skillsIntro:
      "Practical skills, tools, and technologies connected to the projects featured in this portfolio.",
    practicalSkills: "Practical skills",
    tools: "Tools & technologies",
    projectExperience: "PROJECT / EXPERIENCE",
    forexSkill: "Forex Calculator Development",
    forexSkillDesc:
      "Developing a practical Forex calculator for pip values, position sizing, trade risk, and potential trade outcomes.",
    webSkill: "Web Application Development",
    webSkillDesc:
      "Building interactive interfaces, organizing application components, and connecting applications to external market-data services.",
    videoSkill: "Video Editing",
    videoSkillDesc:
      "Preparing and assembling video content for online audiences, with a focus on digital content production for YouTube.",
    financialTools: "FINANCIAL TOOLS",
    software: "SOFTWARE DEVELOPMENT",
    creativeProduction: "CREATIVE PRODUCTION",
    forexCalculations: "Forex Calculations",
    pipValue: "Pip Value",
    positionSizing: "Position Sizing",
    riskManagement: "Risk Management",
    interfaces: "Interactive Interfaces",
    componentUI: "Component-Based UI",
    apiIntegration: "API Integration",
    responsive: "Responsive Layouts",
    timeline: "Timeline Arrangement",
    videoAssembly: "Video Assembly",
    audioVisual: "Audio and Visual Editing",
    digitalContent: "Digital Content Production",
    forexProjectDesc: "An interactive Forex calculation web application.",
    webProjectDesc:
      "A published web application demonstrating practical development work.",
    videoProjectDesc:
      "My YouTube channel, presented as a sample of my creative work.",
    liveProject: "Explore live project",
    viewApplication: "View application",
    viewChannel: "View channel",
    workEyebrow: "03 — SELECTED WORK",
    workHeading: "My work & services.",
    workIntro:
      "Need a web developer or a video editor? Explore my projects to see examples of my technical and creative work.",
    all: "All",
    finance: "Finance",
    creative: "Creative",
    webService: "NEED A WEB DEVELOPER?",
    videoService: "LOOKING FOR A VIDEO EDITOR?",
    forexTitle: "All-in-One Forex Tools",
    forexDescription:
      "Explore my live Forex calculator project, featuring interactive pip-value calculations, position sizing, trade-risk planning, and market-data integration. It demonstrates my practical work building and publishing a web application.",
    videoTitle: "The Enigmatic Pedia",
    videoDescription:
      "The Enigmatic Pedia is my YouTube channel and a sample of my creative work. Explore the channel to see my digital content and video-editing projects created using DaVinci Resolve.",
    forexCategory: "WEB DEVELOPMENT · FOREX TOOLS",
    videoCategory: "VIDEO EDITING · YOUTUBE",
    details: "Details",
    technologies: "Project technologies",
    contactEyebrow: "04 — CONTACT",
    contactHeading: "Have an idea?",
    connect: "Let's connect.",
    contactIntro:
      "Looking to discuss a web-development project, video-editing opportunity, or another idea? Send me a message.",
    email: "EMAIL",
    copy: "Copy",
    copied: "Copied ✓",
    whatsapp: "Message me on WhatsApp",
    github: "View my GitHub",
    responseTime: "I reply within 24 hours.",
    name: "Your name",
    namePlaceholder: "Name",
    emailAddress: "Email address",
    emailPlaceholder: "you@example.com",
    service: "Service you're interested in",
    selectService: "Select a service",
    webDevelopment: "Web Development",
    videoEditing: "Video Editing",
    forexTools: "Forex Tools & Applications",
    collaboration: "Collaboration",
    other: "Other Enquiry",
    subject: "Subject",
    subjectPlaceholder: "What would you like to discuss?",
    message: "Message",
    messagePlaceholder: "Tell me a little about your project...",
    sending: "Sending...",
    send: "Send message",
    sent: "Your message was sent successfully.",
    failed: "We couldn't send your message. Please try again later.",
    copyFailed:
      "Copying failed. Please select and copy the email address.",
    leaveEmpty: "Leave this field empty",
    footer: "Designed and built with curiosity.",
    close: "Close project details",
    openNav: "Open navigation",
    closeNav: "Close navigation",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    projectLink: "Explore live project",
    videoLink: "View video portfolio",
    musicEyebrow: "A MOMENT BEFORE YOU GO",
    musicHeading: "One last thing.",
    musicIntro:
      "You've made it all the way here. Before you leave, take a moment to listen.",
    musicDescription:
      "Some songs feel like looking at the stars on a quiet night. I wanted to leave you with one of those moments.",
    musicTrack: "Vincent (Starry, Starry Night)",
    musicArtist: "Don McLean",
    musicThankYou:
      "Thank you for exploring my little corner of the internet. I hope this song makes your day a little more beautiful.",
    musicNotSupported: "Your browser does not support audio playback.",
  },
  pt: {
    home: "Início",
    about: "Sobre",
    skills: "Competências",
    projects: "Projetos",
    contact: "Contacto",
    talk: "Vamos conversar",
    greeting: "DISPONÍVEL PARA OPORTUNIDADES",
    rolePrefix: "Sou ",
    explore: "Explorar o meu trabalho",
    getInTouch: "Entrar em contacto",
    downloadCV: "Descarregar CV",
    basedIn: "Localizado em",
    scroll: "Deslize para explorar",
    creativeDeveloper: "CRIADOR DIGITAL",
    aboutEyebrow: "01 — SOBRE MIM",
    aboutHeading: "Da curiosidade à",
    creation: "criação.",
    aboutLead:
      "Sou um criador e programador independente interessado em desenvolvimento web, ferramentas Forex, experiências digitais e conteúdo criativo.",
    aboutText:
      "Aprendo através de projetos práticos, explorando ferramentas e melhorando cada versão. Este portefólio reúne o meu projeto de desenvolvimento web e o meu trabalho de edição de vídeo.",
    learn: "Aprender a construir",
    learnText: "Transformar ideias em experiências práticas.",
    improve: "Melhorar continuamente",
    improveText: "Aperfeiçoar os detalhes e aprender com cada projeto.",
    curious: "Manter a curiosidade",
    curiousText: "Explorar a tecnologia com uma mente aberta.",
    skillsEyebrow: "02 — COMPETÊNCIAS",
    skillsHeading: "Competências e interesses.",
    skillsIntro:
      "Competências práticas, ferramentas e tecnologias ligadas aos projetos deste portefólio.",
    practicalSkills: "Competências práticas",
    tools: "Ferramentas e tecnologias",
    projectExperience: "PROJETO / EXPERIÊNCIA",
    forexSkill: "Desenvolvimento de Calculadora Forex",
    forexSkillDesc:
      "Desenvolvimento de uma calculadora Forex para valores de pip, dimensionamento de posições, risco e resultados potenciais.",
    webSkill: "Desenvolvimento de Aplicações Web",
    webSkillDesc:
      "Criação de interfaces interativas e integração com serviços externos de dados de mercado.",
    videoSkill: "Edição de Vídeo",
    videoSkillDesc:
      "Preparação e edição de vídeos para públicos online, com foco na produção de conteúdo para YouTube.",
    financialTools: "FERRAMENTAS FINANCEIRAS",
    software: "DESENVOLVIMENTO DE SOFTWARE",
    creativeProduction: "PRODUÇÃO CRIATIVA",
    forexCalculations: "Cálculos Forex",
    pipValue: "Valor do Pip",
    positionSizing: "Dimensionamento de Posições",
    riskManagement: "Gestão de Risco",
    interfaces: "Interfaces Interativas",
    componentUI: "Interfaces por Componentes",
    apiIntegration: "Integração de APIs",
    responsive: "Layouts Responsivos",
    timeline: "Organização da Linha Temporal",
    videoAssembly: "Montagem de Vídeo",
    audioVisual: "Edição de Áudio e Vídeo",
    digitalContent: "Produção de Conteúdo Digital",
    forexProjectDesc: "Uma aplicação web interativa para cálculos Forex.",
    webProjectDesc:
      "Uma aplicação web publicada que demonstra trabalho prático de desenvolvimento.",
    videoProjectDesc:
      "O meu canal de YouTube, apresentado como exemplo do meu trabalho criativo.",
    liveProject: "Explorar projeto",
    viewApplication: "Ver aplicação",
    viewChannel: "Ver canal",
    workEyebrow: "03 — TRABALHOS SELECIONADOS",
    workHeading: "Trabalho e serviços.",
    workIntro:
      "Procura um programador web ou editor de vídeo? Explore os meus projetos técnicos e criativos.",
    all: "Todos",
    finance: "Finanças",
    creative: "Criativo",
    webService: "PROCURA UM PROGRAMADOR WEB?",
    videoService: "PROCURA UM EDITOR DE VÍDEO?",
    forexTitle: "Ferramentas Forex Tudo-em-Um",
    forexDescription:
      "Explore a minha calculadora Forex, com cálculos de pip, dimensionamento de posições, planeamento de risco e integração de dados de mercado. Demonstra a minha experiência prática na criação e publicação de aplicações web.",
    videoTitle: "The Enigmatic Pedia",
    videoDescription:
      "The Enigmatic Pedia é o meu canal de YouTube e uma amostra do meu trabalho criativo. Explore os conteúdos digitais e os projetos de edição de vídeo realizados com DaVinci Resolve.",
    forexCategory: "DESENVOLVIMENTO WEB · FERRAMENTAS FOREX",
    videoCategory: "EDIÇÃO DE VÍDEO · YOUTUBE",
    details: "Detalhes",
    technologies: "Tecnologias do projeto",
    contactEyebrow: "04 — CONTACTO",
    contactHeading: "Tem uma ideia?",
    connect: "Vamos conversar.",
    contactIntro:
      "Quer discutir um projeto web, uma oportunidade de edição de vídeo ou outra ideia? Envie-me uma mensagem.",
    email: "EMAIL",
    copy: "Copiar",
    copied: "Copiado ✓",
    whatsapp: "Enviar mensagem pelo WhatsApp",
    github: "Ver o meu GitHub",
    responseTime: "Respondo no prazo de 24 horas.",
    name: "O seu nome",
    namePlaceholder: "Nome",
    emailAddress: "Endereço de email",
    emailPlaceholder: "voce@exemplo.com",
    service: "Serviço pretendido",
    selectService: "Selecione um serviço",
    webDevelopment: "Desenvolvimento Web",
    videoEditing: "Edição de Vídeo",
    forexTools: "Ferramentas e Aplicações Forex",
    collaboration: "Colaboração",
    other: "Outro assunto",
    subject: "Assunto",
    subjectPlaceholder: "Sobre o que gostaria de falar?",
    message: "Mensagem",
    messagePlaceholder: "Conte-me um pouco sobre o seu projeto...",
    sending: "A enviar...",
    send: "Enviar mensagem",
    sent: "A sua mensagem foi enviada com sucesso.",
    failed:
      "Não foi possível enviar a mensagem. Tente novamente mais tarde.",
    copyFailed:
      "Não foi possível copiar. Selecione e copie o endereço de email.",
    leaveEmpty: "Deixe este campo vazio",
    footer: "Concebido e desenvolvido com curiosidade.",
    close: "Fechar detalhes do projeto",
    openNav: "Abrir navegação",
    closeNav: "Fechar navegação",
    themeLight: "Mudar para tema claro",
    themeDark: "Mudar para tema escuro",
    projectLink: "Explorar projeto",
    videoLink: "Ver portefólio de vídeo",
    musicEyebrow: "UM MOMENTO ANTES DE PARTIR",
    musicHeading: "Só mais uma coisa.",
    musicIntro:
      "Chegou até ao fim. Antes de sair, reserve um momento para ouvir esta música.",
    musicDescription:
      "Algumas músicas são como olhar para as estrelas numa noite tranquila. Quis deixar-lhe um desses momentos.",
    musicTrack: "Vincent (Starry, Starry Night)",
    musicArtist: "Don McLean",
    musicThankYou:
      "Obrigado por explorar o meu pequeno espaço na internet. Espero que esta música torne o seu dia um pouco mais bonito.",
    musicNotSupported: "O seu navegador não suporta a reprodução de áudio.",
  },
  es: {
    home: "Inicio",
    about: "Sobre mí",
    skills: "Habilidades",
    projects: "Proyectos",
    contact: "Contacto",
    talk: "Hablemos",
    greeting: "DISPONIBLE PARA OPORTUNIDADES",
    rolePrefix: "Soy ",
    explore: "Explorar mi trabajo",
    getInTouch: "Contactar",
    downloadCV: "Descargar CV",
    basedIn: "Ubicación",
    scroll: "Desplázate para explorar",
    creativeDeveloper: "CREADOR DIGITAL",
    aboutEyebrow: "01 — SOBRE MÍ",
    aboutHeading: "De la curiosidad a la",
    creation: "creación.",
    aboutLead:
      "Soy un creador y desarrollador independiente interesado en el desarrollo web, las herramientas Forex, las experiencias digitales y el contenido creativo.",
    aboutText:
      "Aprendo creando proyectos prácticos, explorando herramientas y mejorando cada versión. Este portafolio reúne mi proyecto web y mi trabajo de edición de vídeo.",
    learn: "Aprender creando",
    learnText: "Convertir ideas en experimentos prácticos.",
    improve: "Seguir mejorando",
    improveText: "Perfeccionar los detalles y aprender de cada proyecto.",
    curious: "Mantener la curiosidad",
    curiousText: "Explorar la tecnología con una mente abierta.",
    skillsEyebrow: "02 — HABILIDADES",
    skillsHeading: "Habilidades e intereses.",
    skillsIntro:
      "Habilidades prácticas, herramientas y tecnologías relacionadas con los proyectos de este portafolio.",
    practicalSkills: "Habilidades prácticas",
    tools: "Herramientas y tecnologías",
    projectExperience: "PROYECTO / EXPERIENCIA",
    forexSkill: "Desarrollo de Calculadora Forex",
    forexSkillDesc:
      "Desarrollo de una calculadora Forex para valores de pip, tamaño de posición, riesgo y resultados potenciales.",
    webSkill: "Desarrollo de Aplicaciones Web",
    webSkillDesc:
      "Creación de interfaces interactivas e integración con servicios externos de datos de mercado.",
    videoSkill: "Edición de Vídeo",
    videoSkillDesc:
      "Preparación y edición de vídeos para audiencias en línea, con enfoque en contenido para YouTube.",
    financialTools: "HERRAMIENTAS FINANCIERAS",
    software: "DESARROLLO DE SOFTWARE",
    creativeProduction: "PRODUCCIÓN CREATIVA",
    forexCalculations: "Cálculos Forex",
    pipValue: "Valor del Pip",
    positionSizing: "Tamaño de Posición",
    riskManagement: "Gestión del Riesgo",
    interfaces: "Interfaces Interactivas",
    componentUI: "Interfaces por Componentes",
    apiIntegration: "Integración de APIs",
    responsive: "Diseños Adaptables",
    timeline: "Organización de la Línea de Tiempo",
    videoAssembly: "Montaje de Vídeo",
    audioVisual: "Edición de Audio y Vídeo",
    digitalContent: "Producción de Contenido Digital",
    forexProjectDesc: "Una aplicación web interactiva para cálculos Forex.",
    webProjectDesc:
      "Una aplicación web publicada que demuestra experiencia práctica de desarrollo.",
    videoProjectDesc:
      "Mi canal de YouTube, presentado como ejemplo de mi trabajo creativo.",
    liveProject: "Explorar proyecto",
    viewApplication: "Ver aplicación",
    viewChannel: "Ver canal",
    workEyebrow: "03 — TRABAJOS DESTACADOS",
    workHeading: "Mi trabajo y servicios.",
    workIntro:
      "¿Necesitas un desarrollador web o editor de vídeo? Explora mis proyectos técnicos y creativos.",
    all: "Todos",
    finance: "Finanzas",
    creative: "Creativo",
    webService: "¿NECESITAS UN DESARROLLADOR WEB?",
    videoService: "¿BUSCAS UN EDITOR DE VÍDEO?",
    forexTitle: "Herramientas Forex Todo en Uno",
    forexDescription:
      "Explora mi calculadora Forex, con cálculos de pip, tamaño de posición, planificación de riesgo e integración de datos de mercado. Demuestra mi experiencia práctica creando y publicando aplicaciones web.",
    videoTitle: "The Enigmatic Pedia",
    videoDescription:
      "The Enigmatic Pedia es mi canal de YouTube y una muestra de mi trabajo creativo. Explora mi contenido digital y proyectos de edición con DaVinci Resolve.",
    forexCategory: "DESARROLLO WEB · HERRAMIENTAS FOREX",
    videoCategory: "EDICIÓN DE VÍDEO · YOUTUBE",
    details: "Detalles",
    technologies: "Tecnologías del proyecto",
    contactEyebrow: "04 — CONTACTO",
    contactHeading: "¿Tienes una idea?",
    connect: "Conectemos.",
    contactIntro:
      "¿Quieres hablar de un proyecto web, una oportunidad de edición de vídeo u otra idea? Envíame un mensaje.",
    email: "EMAIL",
    copy: "Copiar",
    copied: "Copiado ✓",
    whatsapp: "Escríbeme por WhatsApp",
    github: "Ver mi GitHub",
    responseTime: "Respondo en un plazo de 24 horas.",
    name: "Tu nombre",
    namePlaceholder: "Nombre",
    emailAddress: "Correo electrónico",
    emailPlaceholder: "tu@ejemplo.com",
    service: "Servicio de interés",
    selectService: "Selecciona un servicio",
    webDevelopment: "Desarrollo Web",
    videoEditing: "Edición de Vídeo",
    forexTools: "Herramientas y Aplicaciones Forex",
    collaboration: "Colaboración",
    other: "Otra consulta",
    subject: "Asunto",
    subjectPlaceholder: "¿Sobre qué te gustaría hablar?",
    message: "Mensaje",
    messagePlaceholder: "Cuéntame un poco sobre tu proyecto...",
    sending: "Enviando...",
    send: "Enviar mensaje",
    sent: "Tu mensaje se ha enviado correctamente.",
    failed:
      "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
    copyFailed:
      "No se pudo copiar. Selecciona y copia el correo electrónico.",
    leaveEmpty: "Deja este campo vacío",
    footer: "Diseñado y creado con curiosidad.",
    close: "Cerrar detalles del proyecto",
    openNav: "Abrir navegación",
    closeNav: "Cerrar navegación",
    themeLight: "Cambiar a tema claro",
    themeDark: "Cambiar a tema oscuro",
    projectLink: "Explorar proyecto",
    videoLink: "Ver portafolio de vídeo",
    musicEyebrow: "UN MOMENTO ANTES DE IRTE",
    musicHeading: "Una última cosa.",
    musicIntro:
      "Has llegado hasta aquí. Antes de irte, tómate un momento para escuchar.",
    musicDescription:
      "Algunas canciones son como mirar las estrellas en una noche tranquila. Quería dejarte uno de esos momentos.",
    musicTrack: "Vincent (Starry, Starry Night)",
    musicArtist: "Don McLean",
    musicThankYou:
      "Gracias por explorar mi pequeño rincón de internet. Espero que esta canción haga tu día un poco más bonito.",
    musicNotSupported: "Tu navegador no admite la reproducción de audio.",
  },
  fr: {
    home: "Accueil",
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    contact: "Contact",
    talk: "Parlons-en",
    greeting: "DISPONIBLE POUR DE NOUVELLES OPPORTUNITÉS",
    rolePrefix: "Je suis ",
    explore: "Découvrir mes projets",
    getInTouch: "Me contacter",
    downloadCV: "Télécharger le CV",
    basedIn: "Basé à",
    scroll: "Défiler pour explorer",
    creativeDeveloper: "CRÉATEUR NUMÉRIQUE",
    aboutEyebrow: "01 — À PROPOS",
    aboutHeading: "De la curiosité à la",
    creation: "création.",
    aboutLead:
      "Je suis un créateur et développeur indépendant intéressé par le développement web, les outils Forex, les expériences numériques et les contenus créatifs.",
    aboutText:
      "J'apprends en réalisant des projets pratiques, en explorant de nouveaux outils et en améliorant chaque version. Ce portfolio présente mon projet web et mon travail de montage vidéo.",
    learn: "Apprendre en construisant",
    learnText: "Transformer des idées en expériences pratiques.",
    improve: "Continuer à progresser",
    improveText: "Affiner les détails et apprendre de chaque projet.",
    curious: "Rester curieux",
    curiousText: "Explorer la technologie avec un esprit ouvert.",
    skillsEyebrow: "02 — COMPÉTENCES",
    skillsHeading: "Compétences et intérêts.",
    skillsIntro:
      "Compétences pratiques, outils et technologies liés aux projets présentés dans ce portfolio.",
    practicalSkills: "Compétences pratiques",
    tools: "Outils et technologies",
    projectExperience: "PROJET / EXPÉRIENCE",
    forexSkill: "Développement d'une Calculatrice Forex",
    forexSkillDesc:
      "Développement d'une calculatrice Forex pour la valeur des pips, la taille des positions, le risque et les résultats potentiels.",
    webSkill: "Développement d'Applications Web",
    webSkillDesc:
      "Création d'interfaces interactives et connexion à des services externes de données de marché.",
    videoSkill: "Montage Vidéo",
    videoSkillDesc:
      "Préparation et montage de vidéos pour les publics en ligne, avec un accent sur YouTube.",
    financialTools: "OUTILS FINANCIERS",
    software: "DÉVELOPPEMENT LOGICIEL",
    creativeProduction: "PRODUCTION CRÉATIVE",
    forexCalculations: "Calculs Forex",
    pipValue: "Valeur du Pip",
    positionSizing: "Taille de Position",
    riskManagement: "Gestion du Risque",
    interfaces: "Interfaces Interactives",
    componentUI: "Interface par Composants",
    apiIntegration: "Intégration d'API",
    responsive: "Mises en Page Adaptatives",
    timeline: "Organisation de la Chronologie",
    videoAssembly: "Assemblage Vidéo",
    audioVisual: "Montage Audio et Vidéo",
    digitalContent: "Production de Contenu Numérique",
    forexProjectDesc: "Une application web interactive de calcul Forex.",
    webProjectDesc:
      "Une application web publiée illustrant un travail pratique de développement.",
    videoProjectDesc:
      "Ma chaîne YouTube, présentée comme un exemple de mon travail créatif.",
    liveProject: "Découvrir le projet",
    viewApplication: "Voir l'application",
    viewChannel: "Voir la chaîne",
    workEyebrow: "03 — PROJETS SÉLECTIONNÉS",
    workHeading: "Mes projets et services.",
    workIntro:
      "Vous cherchez un développeur web ou un monteur vidéo ? Découvrez mes projets techniques et créatifs.",
    all: "Tous",
    finance: "Finance",
    creative: "Création",
    webService: "BESOIN D'UN DÉVELOPPEUR WEB ?",
    videoService: "BESOIN D'UN MONTEUR VIDÉO ?",
    forexTitle: "Outils Forex Tout-en-Un",
    forexDescription:
      "Découvrez ma calculatrice Forex avec calcul des pips, dimensionnement des positions, planification du risque et intégration des données de marché. Ce projet illustre mon expérience pratique dans la création et la publication d'applications web.",
    videoTitle: "The Enigmatic Pedia",
    videoDescription:
      "The Enigmatic Pedia est ma chaîne YouTube et un exemple de mon travail créatif. Découvrez mes contenus numériques et mes projets de montage réalisés avec DaVinci Resolve.",
    forexCategory: "DÉVELOPPEMENT WEB · OUTILS FOREX",
    videoCategory: "MONTAGE VIDÉO · YOUTUBE",
    details: "Détails",
    technologies: "Technologies du projet",
    contactEyebrow: "04 — CONTACT",
    contactHeading: "Une idée en tête ?",
    connect: "Échangeons.",
    contactIntro:
      "Vous souhaitez discuter d'un projet web, d'une mission de montage vidéo ou d'une autre idée ? Envoyez-moi un message.",
    email: "E-MAIL",
    copy: "Copier",
    copied: "Copié ✓",
    whatsapp: "Me contacter sur WhatsApp",
    github: "Voir mon GitHub",
    responseTime: "Je réponds sous 24 heures.",
    name: "Votre nom",
    namePlaceholder: "Nom",
    emailAddress: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    service: "Service souhaité",
    selectService: "Choisir un service",
    webDevelopment: "Développement Web",
    videoEditing: "Montage Vidéo",
    forexTools: "Outils et Applications Forex",
    collaboration: "Collaboration",
    other: "Autre demande",
    subject: "Objet",
    subjectPlaceholder: "De quoi souhaitez-vous discuter ?",
    message: "Message",
    messagePlaceholder: "Parlez-moi un peu de votre projet...",
    sending: "Envoi en cours...",
    send: "Envoyer le message",
    sent: "Votre message a bien été envoyé.",
    failed:
      "Impossible d'envoyer votre message. Veuillez réessayer plus tard.",
    copyFailed:
      "Copie impossible. Sélectionnez et copiez l'adresse e-mail.",
    leaveEmpty: "Laissez ce champ vide",
    footer: "Conçu et réalisé avec curiosité.",
    close: "Fermer les détails du projet",
    openNav: "Ouvrir la navigation",
    closeNav: "Fermer la navigation",
    themeLight: "Passer au thème clair",
    themeDark: "Passer au thème sombre",
    projectLink: "Découvrir le projet",
    videoLink: "Voir le portfolio vidéo",
    musicEyebrow: "UN INSTANT AVANT DE PARTIR",
    musicHeading: "Une dernière chose.",
    musicIntro:
      "Vous êtes arrivé jusqu'ici. Avant de partir, prenez un instant pour écouter.",
    musicDescription:
      "Certaines chansons ressemblent à un regard vers les étoiles lors d'une nuit tranquille. Je voulais vous offrir un de ces moments.",
    musicTrack: "Vincent (Starry, Starry Night)",
    musicArtist: "Don McLean",
    musicThankYou:
      "Merci d'avoir découvert mon petit coin d'internet. J'espère que cette chanson rendra votre journée un peu plus belle.",
    musicNotSupported:
      "Votre navigateur ne prend pas en charge la lecture audio.",
  },
  ru: {
    home: "Главная",
    about: "Обо мне",
    skills: "Навыки",
    projects: "Проекты",
    contact: "Контакты",
    talk: "Связаться",
    greeting: "ОТКРЫТ К НОВЫМ ВОЗМОЖНОСТЯМ",
    rolePrefix: "Я — ",
    explore: "Мои проекты",
    getInTouch: "Связаться со мной",
    downloadCV: "Скачать резюме",
    basedIn: "Местоположение",
    scroll: "Прокрутите для изучения",
    creativeDeveloper: "ЦИФРОВОЙ СОЗДАТЕЛЬ",
    aboutEyebrow: "01 — ОБО МНЕ",
    aboutHeading: "От любопытства к",
    creation: "созданию.",
    aboutLead:
      "Я независимый создатель и разработчик, интересующийся веб-разработкой, инструментами Forex, цифровыми продуктами и творческим контентом.",
    aboutText:
      "Я учусь, создавая практические проекты, изучая инструменты и улучшая каждую версию. В этом портфолио представлены мой веб-проект и работы по видеомонтажу.",
    learn: "Учиться на практике",
    learnText: "Превращать идеи в практические эксперименты.",
    improve: "Постоянно развиваться",
    improveText: "Улучшать детали и учиться на каждом проекте.",
    curious: "Сохранять любознательность",
    curiousText: "Изучать технологии с открытым мышлением.",
    skillsEyebrow: "02 — НАВЫКИ",
    skillsHeading: "Навыки и интересы.",
    skillsIntro:
      "Практические навыки, инструменты и технологии, связанные с проектами этого портфолио.",
    practicalSkills: "Практические навыки",
    tools: "Инструменты и технологии",
    projectExperience: "ПРОЕКТ / ОПЫТ",
    forexSkill: "Разработка Forex-калькулятора",
    forexSkillDesc:
      "Разработка калькулятора Forex для расчёта стоимости пункта, размера позиции, риска и возможных результатов сделки.",
    webSkill: "Разработка веб-приложений",
    webSkillDesc:
      "Создание интерактивных интерфейсов и подключение к внешним сервисам рыночных данных.",
    videoSkill: "Видеомонтаж",
    videoSkillDesc:
      "Подготовка и монтаж видео для интернет-аудитории с акцентом на контент для YouTube.",
    financialTools: "ФИНАНСОВЫЕ ИНСТРУМЕНТЫ",
    software: "РАЗРАБОТКА ПО",
    creativeProduction: "ТВОРЧЕСКОЕ ПРОИЗВОДСТВО",
    forexCalculations: "Расчёты Forex",
    pipValue: "Стоимость пункта",
    positionSizing: "Размер позиции",
    riskManagement: "Управление рисками",
    interfaces: "Интерактивные интерфейсы",
    componentUI: "Компонентный интерфейс",
    apiIntegration: "Интеграция API",
    responsive: "Адаптивные макеты",
    timeline: "Монтаж на временной шкале",
    videoAssembly: "Сборка видео",
    audioVisual: "Аудио- и видеомонтаж",
    digitalContent: "Создание цифрового контента",
    forexProjectDesc: "Интерактивное веб-приложение для расчётов Forex.",
    webProjectDesc:
      "Опубликованное веб-приложение, демонстрирующее практический опыт разработки.",
    videoProjectDesc: "Мой канал YouTube как пример творческой работы.",
    liveProject: "Открыть проект",
    viewApplication: "Открыть приложение",
    viewChannel: "Открыть канал",
    workEyebrow: "03 — ИЗБРАННЫЕ РАБОТЫ",
    workHeading: "Мои работы и услуги.",
    workIntro:
      "Ищете веб-разработчика или видеомонтажёра? Посмотрите мои технические и творческие проекты.",
    all: "Все",
    finance: "Финансы",
    creative: "Творчество",
    webService: "НУЖЕН ВЕБ-РАЗРАБОТЧИК?",
    videoService: "НУЖЕН ВИДЕОМОНТАЖЁР?",
    forexTitle: "Универсальные инструменты Forex",
    forexDescription:
      "Изучите мой Forex-калькулятор с расчётом стоимости пункта, размера позиции, планированием риска и интеграцией рыночных данных. Проект демонстрирует мой практический опыт создания и публикации веб-приложений.",
    videoTitle: "The Enigmatic Pedia",
    videoDescription:
      "The Enigmatic Pedia — мой канал YouTube и пример творческой работы. Здесь представлены цифровой контент и проекты видеомонтажа, созданные с помощью DaVinci Resolve.",
    forexCategory: "ВЕБ-РАЗРАБОТКА · FOREX-ИНСТРУМЕНТЫ",
    videoCategory: "ВИДЕОМОНТАЖ · YOUTUBE",
    details: "Подробнее",
    technologies: "Технологии проекта",
    contactEyebrow: "04 — КОНТАКТЫ",
    contactHeading: "Есть идея?",
    connect: "Давайте обсудим.",
    contactIntro:
      "Хотите обсудить веб-проект, видеомонтаж или другую идею? Отправьте мне сообщение.",
    email: "ЭЛЕКТРОННАЯ ПОЧТА",
    copy: "Копировать",
    copied: "Скопировано ✓",
    whatsapp: "Написать в WhatsApp",
    github: "Мой GitHub",
    responseTime: "Я отвечаю в течение 24 часов.",
    name: "Ваше имя",
    namePlaceholder: "Имя",
    emailAddress: "Электронная почта",
    emailPlaceholder: "you@example.com",
    service: "Интересующая услуга",
    selectService: "Выберите услугу",
    webDevelopment: "Веб-разработка",
    videoEditing: "Видеомонтаж",
    forexTools: "Forex-инструменты и приложения",
    collaboration: "Сотрудничество",
    other: "Другой вопрос",
    subject: "Тема",
    subjectPlaceholder: "Что вы хотели бы обсудить?",
    message: "Сообщение",
    messagePlaceholder: "Расскажите немного о своём проекте...",
    sending: "Отправка...",
    send: "Отправить сообщение",
    sent: "Ваше сообщение успешно отправлено.",
    failed: "Не удалось отправить сообщение. Попробуйте позже.",
    copyFailed:
      "Не удалось скопировать. Выделите и скопируйте адрес вручную.",
    leaveEmpty: "Оставьте это поле пустым",
    footer: "Создано с любознательностью.",
    close: "Закрыть сведения о проекте",
    openNav: "Открыть навигацию",
    closeNav: "Закрыть навигацию",
    themeLight: "Включить светлую тему",
    themeDark: "Включить тёмную тему",
    projectLink: "Открыть проект",
    videoLink: "Посмотреть видеопортфолио",
    musicEyebrow: "МГНОВЕНИЕ ПЕРЕД УХОДОМ",
    musicHeading: "И ещё кое-что.",
    musicIntro:
      "Вы дошли до самого конца. Прежде чем уйти, уделите минуту этой песне.",
    musicDescription:
      "Некоторые песни похожи на звёздное небо в тихую ночь. Я хотел оставить вам одно из таких мгновений.",
    musicTrack: "Vincent (Starry, Starry Night)",
    musicArtist: "Don McLean",
    musicThankYou:
      "Спасибо, что заглянули в мой маленький уголок интернета. Надеюсь, эта песня сделает ваш день немного прекраснее.",
    musicNotSupported:
      "Ваш браузер не поддерживает воспроизведение аудио.",
  },
};

function SkillIcon({ name }: { name: SkillGroup["icon"] }) {
  if (name === "calculator") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="2.5" width="14" height="19" rx="2" />
        <path d="M8 6h8v4H8zM8 14h1m3 0h1m3 0h1M8 18h1m3 0h1m3 0h1" />
      </svg>
    );
  }

  if (name === "code") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m10 9 5 3-5 3z" />
    </svg>
  );
}

function App() {
const [theme, setTheme] = useState<Theme>("dark");
const [introFinished, setIntroFinished] = useState(false);

const [language, setLanguage] = useState<Language>(() => {
  try {
    const saved = localStorage.getItem("portfolio-language");

    return languages.some((item) => item.code === saved)
      ? (saved as Language)
      : "en";
  } catch {
    return "en";
  }
});

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const t = (key: TranslationKey) => translate(language, key);

  const c = (key: string) =>
    extra[language][key] ?? extra.en[key] ?? key;

  const localizedRoles = roles[language];

  const localizedProjects = projects.map((project) => ({
    ...project,
    title:
      project.id === "forex-tools"
        ? c("forexTitle")
        : c("videoTitle"),
    serviceLabel:
      project.id === "forex-tools"
        ? c("webService")
        : c("videoService"),
    categoryLabel:
      project.id === "forex-tools"
        ? c("forexCategory")
        : c("videoCategory"),
    description:
      project.id === "forex-tools"
        ? c("forexDescription")
        : c("videoDescription"),
    linkText:
      project.id === "forex-tools"
        ? c("projectLink")
        : c("videoLink"),
  }));

  const localizedSkills = skillGroups.map((group) => {
    const index = Number(group.number) - 1;

    const titleKeys = [
      "forexSkill",
      "webSkill",
      "videoSkill",
    ];

    const descriptionKeys = [
      "forexSkillDesc",
      "webSkillDesc",
      "videoSkillDesc",
    ];

    const categoryKeys = [
      "financialTools",
      "software",
      "creativeProduction",
    ];

    const skillKeys = [
      [
        "forexCalculations",
        "pipValue",
        "positionSizing",
        "riskManagement",
      ],
      [
        "interfaces",
        "componentUI",
        "apiIntegration",
        "responsive",
      ],
      [
        "timeline",
        "videoAssembly",
        "audioVisual",
        "digitalContent",
      ],
    ];

    return {
      ...group,
      title: c(titleKeys[index]),
      description: c(descriptionKeys[index]),
      category: c(categoryKeys[index]),
      skills: skillKeys[index].map((key) => c(key)),
      projectDescription: c(
        index === 0
          ? "forexProjectDesc"
          : index === 1
            ? "webProjectDesc"
            : "videoProjectDesc",
      ),
      linkText: c(
        index === 1
          ? "viewApplication"
          : index === 2
            ? "viewChannel"
            : "liveProject",
      ),
    };
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;

    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      // The language selector still works if storage is unavailable.
    }
  }, [language]);

  useEffect(() => {
    setDisplayedRole("");
    setRoleIndex(0);
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    const currentRole = localizedRoles[roleIndex];
    const isFullyTyped = displayedRole === currentRole;
    const isFullyDeleted = displayedRole === "";

    const delay = isDeleting
      ? isFullyDeleted
        ? 400
        : 50
      : isFullyTyped
        ? 1800
        : 100;

    const timer = window.setTimeout(() => {
      if (!isDeleting && !isFullyTyped) {
        setDisplayedRole(
          currentRole.slice(0, displayedRole.length + 1),
        );
      } else if (!isDeleting && isFullyTyped) {
        setIsDeleting(true);
      } else if (isDeleting && !isFullyDeleted) {
        setDisplayedRole(
          currentRole.slice(0, displayedRole.length - 1),
        );
      } else {
        setIsDeleting(false);
        setRoleIndex(
          (index) => (index + 1) % localizedRoles.length,
        );
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex, localizedRoles]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("motion-ready");

    const elements = document.querySelectorAll<HTMLElement>(
      "#about, #skills, #projects, #contact, #music, .stats-strip",
    );

    elements.forEach((element) =>
      element.classList.add("reveal-on-scroll"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");

      elements.forEach((element) => {
        element.classList.remove(
          "reveal-on-scroll",
          "is-visible",
        );
      });
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const filters = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects = localizedProjects.filter(
    (project) =>
      activeFilter === "All" ||
      project.category === activeFilter,
  );

  function filterLabel(filter: string) {
    if (filter === "All") return c("all");
    if (filter === "Finance") return c("finance");
    return c("creative");
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setEmailCopied(true);

      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      setFormStatus(c("copyFailed"));
    }
  }

  async function handleContactSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setSubmitting(true);
    setFormStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (
      String(formData.get("website") ?? "").trim() !== ""
    ) {
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        "https://formspree.io/f/xvkkgjer",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Message submission failed.");
      }

      setFormStatus(c("sent"));
      form.reset();
    } catch {
      setFormStatus(c("failed"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
    {!introFinished && (
  <CinematicIntro
    onComplete={() => setIntroFinished(true)}
  />
)}

      <header className="site-header">
        <nav className="nav container" aria-label={c("home")}>
          <a
            className="brand"
            href="#home"
            aria-label="Safal Silwal"
          >
            <img
              className="brand-logo"
              src="/images/logo.png"
              alt=""
              aria-hidden="true"
            />

            <span>
              SAFAL<span className="brand-dot">.</span>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={
              menuOpen ? c("closeNav") : c("openNav")
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <div
            className={`nav-links ${
              menuOpen ? "nav-links-open" : ""
            }`}
          >
            {[
              { label: c("home"), href: "#home" },
              { label: c("about"), href: "#about" },
              { label: c("skills"), href: "#skills" },
              { label: c("projects"), href: "#projects" },
              { label: c("contact"), href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <label className="language-switcher">
              <span className="sr-only">
                Select language
              </span>

              <select
                aria-label="Select language"
                value={language}
                onChange={(event) =>
                  setLanguage(
                    event.target.value as Language,
                  )
                }
              >
                {languages.map((item) => (
                  <option
                    key={item.code}
                    value={item.code}
                  >
                    {item.flag} {item.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="theme-toggle"
              type="button"
              onClick={() =>
                setTheme((current) =>
                  current === "dark" ? "light" : "dark",
                )
              }
              aria-label={
                theme === "dark"
                  ? c("themeLight")
                  : c("themeDark")
              }
              title={
                theme === "dark"
                  ? c("themeLight")
                  : c("themeDark")
              }
            >
              {theme === "dark" ? "☼" : "☾"}
            </button>

            <a
              className="button button-small"
              href="#contact"
            >
              {c("talk")}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <ParticlesBackground />
          <div className="hero-glow" aria-hidden="true" />

          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" />
                {t("greeting")}
              </p>

              <h1>
                Safal
                <br />
                <span className="gradient-text">
                  Silwal
                </span>
              </h1>

              <h2 className="hero-role">
                <span className="typing-prefix">
                  {c("rolePrefix")}
                </span>

                <span
                  className="typing-text"
                  aria-hidden="true"
                >
                  {displayedRole}
                </span>

                <span
                  className="typing-cursor"
                  aria-hidden="true"
                >
                  |
                </span>

                <span className="sr-only">
                  {c("rolePrefix")}
                  {localizedRoles[roleIndex]}
                </span>
              </h2>

              <p className="hero-description">
                {c("aboutLead")}
              </p>

              <div className="hero-actions">
                <a className="button" href="#projects">
                  {c("explore")}{" "}
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  className="button button-secondary"
                  href="#contact"
                >
                  {c("getInTouch")}
                </a>

                <a
                  className="button button-cv"
                  href="/files/safal-cv.pdf"
                  download="safal-cv.pdf"
                >
                  {c("downloadCV")}{" "}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div className="hero-location">
                <span aria-hidden="true">⌖</span>
                {c("basedIn")} {profile.location}
              </div>
            </div>

            <div
              className="hero-art"
              aria-label="Personal profile"
            >
              <div
                className="orbit orbit-one"
                aria-hidden="true"
              />

              <div
                className="orbit orbit-two"
                aria-hidden="true"
              />

              <div className="hero-photo-frame">
                <div
                  className="hero-photo-glow"
                  aria-hidden="true"
                />

                <img
                  src="/images/profile.jpg"
                  alt="Portrait of Safal Silwal"
                  className="hero-photo"
                  fetchPriority="high"
                />

                <div className="hero-photo-label">
                  <span className="status-dot" />
                  <span>{c("creativeDeveloper")}</span>
                </div>

                <span
                  className="hero-photo-index"
                  aria-hidden="true"
                >
                  SS / 01
                </span>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#about">
            <span /> {c("scroll")}
          </a>
        </section>

        <section
          className="stats-strip"
          aria-label={c("projects")}
        >
          <div className="container stats-grid">
            {profile.stats.map((stat) => (
              <div
                className="stat-item"
                key={stat.label}
              >
                <strong>
                  {stat.value}
                  {stat.suffix}
                </strong>

                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about-grid">
            <div className="section-intro">
              <p className="eyebrow">
                {c("aboutEyebrow")}
              </p>

              <h2>
                {c("aboutHeading")}
                <br />
                <span className="gradient-text">
                  {c("creation")}
                </span>
              </h2>
            </div>

            <div className="about-copy">
              <p className="about-lead">
                {c("aboutLead")} — {profile.name}.
              </p>

              <p>{c("aboutText")}</p>

              <div className="about-values">
                <div>
                  <span>01</span>
                  <strong>{c("learn")}</strong>
                  <p>{c("learnText")}</p>
                </div>

                <div>
                  <span>02</span>
                  <strong>{c("improve")}</strong>
                  <p>{c("improveText")}</p>
                </div>

                <div>
                  <span>03</span>
                  <strong>{c("curious")}</strong>
                  <p>{c("curiousText")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section skills-section"
          id="skills"
        >
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">
                {c("skillsEyebrow")}
              </p>

              <h2>
                {c("skillsHeading").split("&")[0]}
                <span className="gradient-text">
                  {c("skillsHeading").includes("&")
                    ? `&${c("skillsHeading")
                        .split("&")
                        .slice(1)
                        .join("&")}`
                    : ""}
                </span>
              </h2>

              <p>{c("skillsIntro")}</p>
            </div>

            <div className="skills-grid">
              {localizedSkills.map((group) => (
                <article
                  className="skill-card"
                  key={group.number}
                >
                  <div className="skill-card-top">
                    <span className="skill-number">
                      {group.number}
                    </span>

                    <span className="skill-icon">
                      <SkillIcon name={group.icon} />
                    </span>
                  </div>

                  <p className="skill-category">
                    {group.category}
                  </p>

                  <h3>{group.title}</h3>

                  <p className="skill-description">
                    {group.description}
                  </p>

                  <div className="skill-subsection">
                    <h4>{c("practicalSkills")}</h4>

                    <div className="skill-tags">
                      {group.skills.map((skill) => (
                        <span
                          className="skill-tag"
                          key={skill}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="skill-subsection">
                    <h4>{c("tools")}</h4>

                    <div className="skill-tags tool-tags">
                      {group.tools.map((tool) => (
                        <span
                          className="skill-tag"
                          key={tool}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="skill-project">
                    <span className="skill-project-label">
                      {c("projectExperience")}
                    </span>

                    <h4>{group.project}</h4>

                    <p>{group.projectDescription}</p>

                    <a
                      href={group.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skill-project-link"
                    >
                      {group.linkText}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section projects-section"
          id="projects"
        >
          <div className="container">
            <div className="section-heading projects-heading">
              <div className="projects-heading-copy">
                <p className="eyebrow">
                  {c("workEyebrow")}
                </p>

                <h2>{c("workHeading")}</h2>
              </div>

              <p className="projects-intro">
                {c("workIntro")}
              </p>
            </div>

            <div
              className="project-filters"
              aria-label={c("projects")}
            >
              {filters.map((filter) => (
                <button
                  className={
                    activeFilter === filter
                      ? "filter active"
                      : "filter"
                  }
                  type="button"
                  key={filter}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filterLabel(filter)}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <article
                  className={`project-card project-card--${project.id}`}
                  key={project.id}
                  style={
                    {
                      "--reveal-delay": `${Math.min(index, 5) * 90}ms`,
                    } as CSSProperties
                  }
                >
                  <button
                    type="button"
                    className={`project-preview project-preview--${project.id}`}
                    onClick={() =>
                      setSelectedProject(project)
                    }
                    aria-label={`${c("details")}: ${project.title}`}
                  >
                    <img
                      className="project-thumbnail"
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />

                    <span
                      className="project-preview-overlay"
                      aria-hidden="true"
                    />

                    <span
                      className="project-preview-arrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </button>

                  <div className="project-body">
                    <p className="project-service-label">
                      {project.serviceLabel}
                    </p>

                    <div className="project-title-row">
                      <h3>{project.title}</h3>

                      <button
                        type="button"
                        className="text-action"
                        onClick={() =>
                          setSelectedProject(project)
                        }
                      >
                        {c("details")}
                      </button>
                    </div>

                    <p className="project-description">
                      {project.description}
                    </p>

                    <div
                      className="tag-list"
                      aria-label={c("technologies")}
                    >
                      {project.tools.map((tool) => (
                        <span className="tag" key={tool}>
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="project-card-actions">
                      <a
                        className="project-link"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.linkText}
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="contact-section section"
          id="contact"
        >
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">
                {c("contactEyebrow")}
              </p>

              <h2>
                {c("contactHeading")}
                <br />
                <span className="gradient-text">
                  {c("connect")}
                </span>
              </h2>

              <p>{c("contactIntro")}</p>

              <div className="contact-note">
                <span className="status-dot" />
                {t("availability")}
              </div>

              <p className="contact-location">
                ⌖ {profile.location}
              </p>

              <div className="contact-direct">
                <span className="contact-direct-label">
                  {c("email")}
                </span>

                <div className="contact-email-row">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="contact-email-address"
                  >
                    {contactEmail}
                  </a>

                  <button
                    className="copy-email-button"
                    type="button"
                    onClick={handleCopyEmail}
                  >
                    {emailCopied
                      ? c("copied")
                      : c("copy")}
                  </button>
                </div>
              </div>

              <a
                className="button button-secondary book-call-button"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c("whatsapp")}
              >
                <svg
                  className="whatsapp-logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="M12.04 2a9.86 9.86 0 0 0-8.48 14.9L2.2 22l5.23-1.37A9.95 9.95 0 0 0 12.04 22 10 10 0 0 0 12.04 2Zm0 18.18a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 1 1 6.9 3.83Zm4.48-6.1c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.13-.17.25-.64.81-.78.98-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.01-.39.11-.51.11-.11.25-.29.38-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.08s.9 2.41 1.03 2.58c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.43.54.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.19.21-.59.21-1.1.15-1.2-.06-.11-.23-.17-.48-.3Z"
                  />
                </svg>

                {c("whatsapp")}
              </a>

              <a
                className="button button-secondary github-profile-button"
                href="https://github.com/digitalligent"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c("github")}
              >
                <svg
                  className="github-logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.07c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.6 5.23-5.08 5.5.4.35.75 1.02.75 2.06V22c0 .29.2.64.76.53A11.1 11.1 0 0 0 12 .9Z"
                  />
                </svg>

                {c("github")}{" "}
                <span aria-hidden="true">↗</span>
              </a>

              <p className="response-time">
                {c("responseTime")}
              </p>
            </div>

            <form
              className="contact-form"
              onSubmit={handleContactSubmit}
            >
              <div
                className="honeypot-field"
                aria-hidden="true"
              >
                <label htmlFor="contact-website">
                  {c("leaveEmpty")}
                </label>

                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="form-row">
                <label>
                  {c("name")}

                  <input
                    name="name"
                    type="text"
                    placeholder={c("namePlaceholder")}
                    autoComplete="name"
                    maxLength={100}
                    required
                  />
                </label>

                <label>
                  {c("emailAddress")}

                  <input
                    name="email"
                    type="email"
                    placeholder={c("emailPlaceholder")}
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </label>
              </div>

              <label>
                {c("service")}

                <select
                  name="service"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    {c("selectService")}
                  </option>

                  <option value="Web Development">
                    {c("webDevelopment")}
                  </option>

                  <option value="Video Editing">
                    {c("videoEditing")}
                  </option>

                  <option value="Forex Tools">
                    {c("forexTools")}
                  </option>

                  <option value="Collaboration">
                    {c("collaboration")}
                  </option>

                  <option value="Other">
                    {c("other")}
                  </option>
                </select>
              </label>

              <label>
                {c("subject")}

                <input
                  name="subject"
                  type="text"
                  placeholder={c("subjectPlaceholder")}
                  maxLength={150}
                  required
                />
              </label>

              <label>
                {c("message")}

                <textarea
                  name="message"
                  placeholder={c("messagePlaceholder")}
                  rows={5}
                  maxLength={5000}
                  required
                />
              </label>

              <button
                className="button form-submit"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? c("sending")
                  : c("send")}

                <span aria-hidden="true">↗</span>
              </button>

              {formStatus && (
                <p
                  className="form-status"
                  role="status"
                  aria-live="polite"
                >
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Music section — placed immediately above the footer */}
        <section
          className="section music-section"
          id="music"
        >
          <div className="container">
            <div className="music-card">
              <p className="eyebrow">
                {c("musicEyebrow")}
              </p>

              <h2>
                {c("musicHeading")}
              </h2>

              <p className="music-intro">
                {c("musicIntro")}
              </p>

              <p className="music-description">
                {c("musicDescription")}
              </p>

              <div className="music-track">
                <div
                  className="music-icon"
                  aria-hidden="true"
                >
                  ♫
                </div>

                <div className="music-track-info">
                  <h3>{c("musicTrack")}</h3>
                  <p>{c("musicArtist")}</p>
                </div>
              </div>

              <audio
                className="music-player"
                controls
                preload="metadata"
                aria-label={`${c("musicTrack")} — ${c("musicArtist")}`}
              >
                <source
                  src="/sounds/music.mp3"
                  type="audio/mpeg"
                />

                {c("musicNotSupported")}
              </audio>

              <p className="music-thank-you">
                {c("musicThankYou")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a
            className="brand"
            href="#home"
            aria-label="Safal Silwal"
          >
            <img
              className="brand-logo"
              src="/images/logo.png"
              alt=""
              aria-hidden="true"
            />

            <span>
              SAFAL<span className="brand-dot">.</span>
            </span>
          </a>

          <p>{c("footer")}</p>

          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
      </footer>

      {selectedProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label={c("close")}
            >
              ×
            </button>

            <p className="eyebrow">
              {selectedProject.categoryLabel}
            </p>

            <p className="project-service-label">
              {selectedProject.serviceLabel}
            </p>

            <h2 id="modal-title">
              {selectedProject.title}
            </h2>

            <p>{selectedProject.description}</p>

            <div className="tag-list">
              {selectedProject.tools.map((tool) => (
                <span className="tag" key={tool}>
                  {tool}
                </span>
              ))}
            </div>

            <a
              className="button"
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedProject.linkText}
              <span aria-hidden="true">↗</span>
            </a>
          </section>
        </div>
      )}
    </>
  );
}

export default App;