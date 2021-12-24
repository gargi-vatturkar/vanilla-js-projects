const questions = [
    {
        quest: 'How much is a bakers dozen ?',
        a1: '6',
        a2: '7',
        a3: '12',
        a4: '13',
        correct: 'a4'
    },
    {
        quest: 'What does HTML stand for ?',
        a1: 'Hyper Trainer Marking Language',
        a2: 'Hyper Text Marketing Language',
        a3: 'Hyper Text Markup Language',
        a4: 'Hyper Text Markup Leveler',
        correct: 'a3'
    },
    {
        quest: 'What is the most used programming language of 2019 ?',
        a1: 'Python',
        a2: 'Java',
        a3: 'C++',
        a4: 'JavaScript',
        correct: 'a2'
    },
    {
        quest: 'Which is the larget Mammal ?',
        a1: 'Elephant',
        a2: 'Whale',
        a3: 'Dinosaur',
        a4: 'Rhinoceros',
        correct: 'a2'
    },
    {
        quest: 'When was JavaScript launched ?',
        a1: '1995',
        a2: '2000',
        a3: '1994',
        a4: '1996',
        correct: 'a1'
    }

]

let currentQ = 0;
let score = 0

const quest = document.getElementById("question");
const quiz = document.getElementById("quiz");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const submit = document.getElementById("sub");
const play = document.getElementById("play");

submit.addEventListener("click", () => {
    let a = getSelected();
    if (a) {
        console.log(currentQ)
        if (a === questions[currentQ]['correct']) score++;
        currentQ++;

        if (currentQ < questions.length)
            loadQuiz();
        else {
            quiz.innerHTML = `<h1> You answered ${score}/${questions.length} correctly !</h1>
               <button onclick='window.location.reload()' class='submit-btn'>Play again</button>`;
        }
    }

})

function getSelected() {
    const answers = document.querySelectorAll(".answer");

    let ans = undefined;
    answers.forEach(answer => {
        if (answer.checked) ans = answer.id;
    });

    return ans;
}

function loadQuiz() {
    const currentQuizData = questions[currentQ]
    quest.innerText = currentQuizData.quest;

    const answers = document.querySelectorAll(".answer");
    answers.forEach(answer => {
        answer.checked = false;
    });

    a_text.innerText = currentQuizData.a1;
    b_text.innerText = currentQuizData.a2;
    c_text.innerText = currentQuizData.a3;
    d_text.innerText = currentQuizData.a4;
}

loadQuiz();