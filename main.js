// Fonctionnalités principales du site

// Préchargeur de ressources
const preloadImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src') || img.getAttribute('data-src');
        if (src) {
            const imgObj = new Image();
            imgObj.src = src;
        }
    });
};

// Smooth scroll pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gestion du clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Fermer les menus et modales
        document.querySelectorAll('.dropdown-content').forEach(menu => 
            menu.style.display = 'none'
        );
    }
});

// Indicateur de progression du scroll
const updateScrollProgress = () => {
    const progress = document.querySelector('.scroll-progress');
    if (!progress) return;
    
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const progressWidth = (scrollPosition / (documentHeight - windowHeight)) * 100;
    
    progress.style.width = `${progressWidth}%`;
};

// Bouton retour en haut avec animation
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress';
    document.body.appendChild(progressIndicator);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
        updateScrollProgress();
    });

    // Précharger les ressources
    preloadImages();
});

// Gestion des médias
const optimizeMedia = () => {
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    document.querySelectorAll('video').forEach(video => {
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        video.setAttribute('preload', 'auto');
    });
};

// Quiz - Base de toutes les questions
const allQuizQuestions = [
    {
        question: "Qu'est-ce que la défense nationale ?",
        options: [
            "La protection du territoire contre les intempéries",
            "La protection globale des intérêts fondamentaux de la Nation",
            "La politique étrangère de la France",
            "La gestion des armées uniquement"
        ],
        correctAnswer: 1,
        category: "Définitions et fondements"
    },
    {
        question: "Quelle est la principale mission des armées dans le cadre de la défense nationale ?",
        options: [
            "Administrer les collectivités locales",
            "Défendre les frontières économiques",
            "Garantir la sécurité et la souveraineté du pays",
            "Organiser les élections nationales"
        ],
        correctAnswer: 2,
        category: "Définitions et fondements"
    },
    {
        question: "Parmi les principes fondamentaux de la défense, lequel repose sur la menace d'une riposte nucléaire ?",
        options: [
            "La souveraineté nationale",
            "La solidarité nationale",
            "La continuité de l'État",
            "La dissuasion nucléaire"
        ],
        correctAnswer: 3,
        category: "Définitions et fondements"
    },
    {
        question: "Qui détient la responsabilité suprême en matière de défense nationale ?",
        options: [
            "Le Premier ministre",
            "Le chef d'état-major",
            "Le président de la République",
            "Le président de l'Assemblée nationale"
        ],
        correctAnswer: 2,
        category: "Acteurs de la défense"
    },
    {
        question: "Quelle est la mission principale de l'armée de Terre ?",
        options: [
            "Assurer le commandement aérien",
            "Intervenir en mer",
            "Intervenir sur tous types de terrains",
            "Contrôler l'espace"
        ],
        correctAnswer: 2,
        category: "Acteurs de la défense"
    },
    {
        question: "Quel corps militaire a pour rôle la dissuasion océanique ?",
        options: [
            "L'armée de l'Air",
            "L'armée de Terre",
            "La Marine nationale",
            "La Gendarmerie nationale"
        ],
        correctAnswer: 2,
        category: "Acteurs de la défense"
    },
    {
        question: "Quel type de menace concerne une guerre entre États ?",
        options: [
            "Moderne",
            "Terroriste",
            "Traditionnelle",
            "Cybernétique"
        ],
        correctAnswer: 2,
        category: "Enjeux contemporains"
    },
    {
        question: "Qu'est-ce que la PESCO dans le cadre de l'Union européenne ?",
        options: [
            "Une alliance commerciale",
            "Une police de cybersécurité",
            "Une coopération structurée permanente en matière de défense",
            "Un programme spatial"
        ],
        correctAnswer: 2,
        category: "Enjeux contemporains"
    },
    {
        question: "Quelle est la période de la dernière loi de programmation militaire ?",
        options: [
            "2020-2025",
            "2019-2024",
            "2024-2030",
            "2025-2035"
        ],
        correctAnswer: 2,
        category: "Nouvelles réalités"
    },
    {
        question: "Dans quels domaines technologiques la France investit-elle fortement pour sa défense ?",
        options: [
            "Pétrole, charbon, routes",
            "Santé, commerce, agriculture",
            "Spatial, cyber, numérique",
            "Tourisme, éducation, sport"
        ],
        correctAnswer: 2,
        category: "Nouvelles réalités"
    }
];

// Fonction pour tirer aléatoirement 3 questions uniques
function getRandomQuestions() {
    const shuffled = [...allQuizQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 3);
}

// Variables globales
let quizQuestions = getRandomQuestions();

// Initialisation du quiz
function initQuiz() {
    quizQuestions = getRandomQuestions();
    currentQuestion = 0;
    score = 0;
    displayQuestion();
}

function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-question">${question.question}</div>
        <div class="quiz-category">Catégorie: ${question.category}</div>
        <div class="quiz-options">
            ${question.options.map((option, index) => 
                `<div class="quiz-option" data-index="${index}">${option}</div>`
            ).join('')}
        </div>
    `;

    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => checkAnswer(option));
    });
}

function checkAnswer(selectedOption) {
    const question = quizQuestions[currentQuestion];
    const selected = parseInt(selectedOption.dataset.index);
    
    if (selected === question.correctAnswer) {
        selectedOption.classList.add('correct');
        score++;
    } else {
        selectedOption.classList.add('incorrect');
    }

    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        setTimeout(displayQuestion, 1000);
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h3>Quiz Terminé</h3>
        <p>Votre score : ${score}/3</p>
        <button onclick="initQuiz()">Recommencer</button>
    `;
    document.getElementById('score-display').textContent = `Score final : ${score}/3`;
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    optimizeMedia();
    initQuiz();
});

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-question">${question.question}</div>
        <div class="quiz-options">
            ${question.options.map((option, index) => 
                `<div class="quiz-option" data-index="${index}">${option}</div>`
            ).join('')}
        </div>
    `;

    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => checkAnswer(option));
    });
}

function checkAnswer(selectedOption) {
    const question = quizQuestions[currentQuestion];
    const selected = parseInt(selectedOption.dataset.index);
    
    if (selected === question.correctAnswer) {
        selectedOption.classList.add('correct');
        score++;
    } else {
        selectedOption.classList.add('incorrect');
    }

    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        setTimeout(displayQuestion, 1000);
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h3>Quiz Terminé</h3>
        <p>Votre score : ${score}/${quizQuestions.length}</p>
        <button onclick="location.reload()">Recommencer</button>
    `;
    document.getElementById('score-display').textContent = `Score final : ${score}/${quizQuestions.length}`;
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    optimizeMedia();
    displayQuestion();
});

// Menu mobile
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar-container');
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }



    // Fermer le menu mobile quand on clique sur un lien
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });
});

// Effet de survol sur les titres
document.querySelectorAll('h1, h2, h3').forEach(title => {
    title.addEventListener('mouseenter', () => {
        title.style.transform = 'translateY(-2px)';
    });
    
    title.addEventListener('mouseleave', () => {
        title.style.transform = 'translateY(0)';
    });
});

// Animation des sections au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observer toutes les sections principales
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navigation fixe avec changement de couleur au scroll
const header = document.querySelector('header');
let lastScroll = 0;
let scrollThreshold = 100; // Seuil pour déclencher l'animation
let scrollTimeout;

// Fonction pour gérer l'animation de la navigation
function handleHeaderAnimation() {
    if (!header) return;
    
    const currentScroll = window.pageYOffset;
    
    // Si on scroll vers le bas
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        // Scroll down
        header.classList.add('scroll-down');
        header.classList.remove('scroll-up');
    } else if (currentScroll < lastScroll) {
        // Scroll up
        header.classList.add('scroll-up');
        header.classList.remove('scroll-down');
    }
    
    lastScroll = currentScroll;
}

// Gestion du scroll avec débogage
window.addEventListener('scroll', () => {
    // Annuler le timeout précédent
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Déclencher l'animation après une petite pause
    scrollTimeout = setTimeout(() => {
        handleHeaderAnimation();
    }, 100); // 100ms de délai pour éviter les animations trop rapides
});

// Réinitialiser l'état au chargement
window.addEventListener('load', () => {
    handleHeaderAnimation();
});

// Bouton retour en haut
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
});
