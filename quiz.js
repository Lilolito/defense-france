

quiz

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

    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', () => checkAnswer(option));
    });
}

function checkAnswer(selectedOption) {
    const question = quizQuestions[currentQuestion];
    const selected = parseInt(selectedOption.dataset.index);
    const options = document.querySelectorAll('.quiz-option');
    
    // Réinitialiser les classes existantes
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });

    // Marquer toutes les réponses
    options.forEach((option, index) => {
        if (index === question.correctAnswer) {
            option.classList.add('correct');
        } else if (index === selected) {
            option.classList.add('incorrect');
        }
    });

    // Mettre à jour le score si la réponse était correcte
    if (selected === question.correctAnswer) {
        score++;
    }

    // Attente pour voir les réponses avant de passer à la question suivante
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function checkAnswer(selectedOption) {
    const question = quizQuestions[currentQuestion];
    const selected = parseInt(selectedOption.dataset.index);
    const options = document.querySelectorAll('.quiz-option');
    const quizContainer = document.getElementById('quiz-container');
    
    // Réinitialiser le feedback précédent
    const oldFeedback = quizContainer.querySelector('.quiz-feedback');
    if (oldFeedback) {
        oldFeedback.remove();
    }

    // Réinitialiser les classes existantes
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });

    // Marquer toutes les réponses
    options.forEach((option, index) => {
        if (index === question.correctAnswer) {
            option.classList.add('correct');
        } else if (index === selected) {
            option.classList.add('incorrect');
        }
    });

    // Ajouter un message de feedback
    const feedback = document.createElement('div');
    feedback.className = 'quiz-feedback';
    
    if (selected === question.correctAnswer) {
        feedback.textContent = 'Correct !';
        feedback.classList.add('correct');
        score++;
    } else {
        feedback.textContent = `Mauvaise réponse. La bonne réponse était : ${question.options[question.correctAnswer]}`;
        feedback.classList.add('incorrect');
    }

    // Insérer le feedback après les options
    const optionsContainer = quizContainer.querySelector('.quiz-options');
    if (optionsContainer) {
        quizContainer.insertBefore(feedback, optionsContainer.nextSibling);
    }

    // Attente pour voir les réponses avant de passer à la question suivante
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
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
    initQuiz();
});