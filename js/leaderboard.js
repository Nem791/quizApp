import { Row } from "../components/leaderboardRow.js";

let board = [];
let leaderboard = document.getElementById('board');
let rowValue = document.getElementsByClassName('row-value');
let questionTitle = document.getElementById('question-title');
let questionTitleList = [];

// Lay set Question tu database
fetch('https://quizapi791.herokuapp.com/api/quizzes')
    .then(response => {
        return response.json();
    })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            questionTitleList.push(data[i][0].questionTitle)
        }
    })

// Show score cua moi~ set question 
function showScore(setQuestion) {
    db.collection(setQuestion)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(typeof doc.data().point);
                board.push([doc.data().name, doc.data().point]);
            });
        })
        .then(() => {
            questionTitle.innerHTML = setQuestion;
            board = board.sort((a, b) => b[1] - a[1]);
            board.forEach(() => {
                const row = new Row();
                leaderboard.appendChild(row.render());
            })
            Array.from(rowValue).forEach((element, index) => {
                element.firstElementChild.innerHTML = board[index][0];
                element.lastElementChild.innerHTML = board[index][1];
            })
        })
        .then(() => {
            
        })
}

// Thay doi leaderboard cua tung set question 
const listGroupItem = document.querySelectorAll('.list-group-item')
listGroupItem.forEach((element, index) => {
    element.addEventListener('click', () => {
        localStorage.setItem('quizTitle', questionTitleList[index]);
        location.reload();
    })
})

// Neu nguoi dung vao lan dau tien, hien leaderboard cua set 1 
let quizTitle = localStorage.getItem('quizTitle');
console.log(JSON.stringify(quizTitle))
if (quizTitle) {
    console.log(quizTitle);
    showScore(JSON.parse(JSON.stringify(quizTitle)));
} else {
    showScore("Question title 1");
}




