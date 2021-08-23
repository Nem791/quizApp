import { myModal } from "../components/modal.js";
import { Quiz } from "../components/quizList.js";
import { bsAlert } from "../components/toast.js";

let quizList = document.querySelectorAll('.container-faq');
let quizAnswerList = [];
let questionTitle = document.getElementById('question-title');
let countTimer = document.getElementById('count-time');

function renderQuiz(quizzesIndex) {
    fetch('https://quizapi791.herokuapp.com/api/quizzes')
        .then(response => {
            return response.json();
        })
        .then((data) => {
            // Ten cua 20 cau hoi 
            questionTitle.innerHTML = data[quizzesIndex][0].questionTitle;

            countTimer.innerHTML = (Math.random() + Math.floor(Math.random() * 2)).toFixed(2) + " seconds ago";

            // Thong bao fetch API thanh cong 
            bsAlert.show();

            // Tao Array cau tra loi 
            for (let d of data[quizzesIndex]) {
                quizAnswerList.push(d.rightAnswer);
            }
            // quizAnswerList.push(...quizAnswerList);

            quizList = Array.from(quizList);
            for (let n = 0; n < 2; n++) {
                for (let i = 0; i < data[quizzesIndex].length / 2; i++) {
                    const quiz = new Quiz;
                    quizList[n].appendChild(quiz.render());
                }
            }

            // Tao so cua Quiz va cau hoi 
            let nodeListQuiz = document.querySelectorAll('.faq-wrap');
            nodeListQuiz = Array.from(nodeListQuiz);
            nodeListQuiz.forEach((element, i) => {
                element.firstElementChild.innerHTML = data[quizzesIndex][i].quizNumber;
                element.lastElementChild.innerHTML = data[quizzesIndex][i].quiz + '<br>'
                                                 + data[quizzesIndex][i].a + '<br>' 
                                                 + data[quizzesIndex][i].b + '<br>' 
                                                 + data[quizzesIndex][i].c + '<br>' 
                                                 + data[quizzesIndex][i].d;
            })

            let formCheckInput = document.querySelectorAll('.form-check-input');
            formCheckInput.forEach((element) => {
                // Dat ten cho moi~ group radio buttons de phan biet
                let groupRadioBtnName = element.parentElement.parentElement.previousElementSibling.innerHTML;
                element.name = groupRadioBtnName;
            })


        })
        .then(() => {
            // Hieu ung cua accordion 
            let content = document.getElementsByClassName('modal-body')[0];
            let title = document.getElementById('exampleModalLabel');
            let acc = document.getElementsByClassName("accordion");
            let save = document.getElementById('save');
            for (let i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    let panel = this.nextElementSibling;
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        title.innerHTML = acc[i].innerHTML;
                        content.innerHTML = panel.nextElementSibling.innerHTML;
                        save.hidden = true;
                        myModal.show();
                        panel.style.maxHeight = panel.scrollHeight + "px";
                        // panel.style.maxHeight = '100%';
                    }
                });
            }

            let answerPanel = document.querySelectorAll('.panel');
            answerPanel.forEach((element, index) => {
                Array.from(element.children).forEach((childElement) => {
                    childElement.firstElementChild.addEventListener('click', () => {
                        element.dataset.result = childElement.lastElementChild.innerText;
                        if (childElement.lastElementChild.innerText === quizAnswerList[index]) {
                            element.dataset.point = 1;
                        } else {
                            element.dataset.point = 0;
                        }
                    })
                })
            })
        })

        .catch((err) => {
            // alert('Sai ở setQuizzes()');
            console.log(err);
        });

}
let quizIndex = localStorage.getItem('quizIndex');
if (quizIndex) {
    quizIndex = parseInt(quizIndex);
    renderQuiz(quizIndex);
} else {
    renderQuiz(1);
}

export {renderQuiz};