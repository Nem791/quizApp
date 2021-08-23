let quizList = document.querySelectorAll('.container-faq');
let quizAnswerList = [];
let points = 0;

function setQuizzes() {
    fetch('http://localhost:3000/quizzes')
        .then(response => {
            return response.json();
        })
        .then((data) => {
            for (let d of data) {
                d.forEach((element) => {
                    quizAnswerList.push(element.rightAnswer);
                })
            }
            quizAnswerList.push(...quizAnswerList);
            quizList = Array.from(quizList);
            for (let n = 0; n < 2; n++) {
                for (let i = 0; i < data[n].length; i++) {
                    // console.log(data[i].quiz);
                    quizList[n].innerHTML += `<div class="faq-wrap">
        <button class="accordion" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${data[n][i].quizNumber}</button>
        <div class="col-xl-4 panel" role="group" aria-label="Basic radio toggle button group">

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${data[n][i].quizNumber}">
                <label class="form-check-label">${data[n][i].answers[0]}</label>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${data[n][i].quizNumber}">
                <label class="form-check-label">${data[n][i].answers[1]}</label>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${data[n][i].quizNumber}">
                <label class="form-check-label">${data[n][i].answers[2]}</label>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${data[n][i].quizNumber}">
                <label class="form-check-label">${data[n][i].answers[3]}</label>
            </div>
        </div>

        <p hidden>${data[n][i].quiz}<br>${data[n][i].a}<br>${data[n][i].b}<br>${data[n][i].c}<br>${data[n][i].d}</p>
        
        </div>`
                }
            }
        }
        )



        .then(() => {
            let content = document.getElementsByClassName('modal-body')[0];
            let title = document.getElementById('staticBackdropLabel');
            let acc = document.getElementsByClassName("accordion");
            for (let i = 0; i < acc.length; i++) {
                // console.log(acc[i]);
                acc[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    let panel = this.nextElementSibling;
                    if (panel.style.maxHeight) {
                        acc[i].dataset.bsToggle = "modal";
                        acc[i].dataset.bsTarget = "#staticBackdrop";
                        panel.style.maxHeight = null;
                    } else {
                        title.innerHTML = acc[i].innerHTML;
                        content.innerHTML = panel.nextElementSibling.innerHTML;
                        acc[i].dataset.bsToggle = null;
                        acc[i].dataset.bsTarget = null;
                        panel.style.maxHeight = panel.scrollHeight + "px";
                        // panel.style.maxHeight = '100%';
                    }
                });
            }

            let answerPanel = document.querySelectorAll('.panel');
            answerPanel.forEach((element, index) => {
                Array.from(element.children).forEach((childElement) => {
                    childElement.firstElementChild.addEventListener('click', () => {
                        if (childElement.lastElementChild.innerText === quizAnswerList[index]) {
                            element.dataset.point = 1;
                            // console.log(element);
                        } else {
                            element.dataset.point = 0;
                            // console.log(element);
                        }
                    })
                })
            })
        })

        .catch((err) => {
            alert('Sai ở setQuizzes()');
            console.log(err);
        });
}

function calculatePoint() {
    let panel = document.querySelectorAll('.panel');
    let temp = 0;
    let content = document.getElementsByClassName('modal-body')[0];
    let title = document.getElementById('staticBackdropLabel');
    console.log(content);
    for (let i = 0; i < panel.length; i++) {
        if (Array.from(panel)[i].dataset.point == undefined) {
            temp = 1;
            title.innerHTML = 'Thông báo';
            content.innerHTML = 'Bạn chưa làm hết các câu hỏi';
            break;
        } else {
            points += Number(Array.from(panel)[i].dataset.point);
        }
    }
    if (temp == 0) {
        content.innerHTML = 'Số điểm: ' + points;
    }
}

setQuizzes();
