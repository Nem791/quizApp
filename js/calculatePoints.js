import { myModal } from "../components/modal.js";

let points = 0;
let result = [];
let alert = document.getElementById('alert');
let save = document.getElementById('save');
let calculate = document.getElementById('calculate');
let questionTitle = document.getElementById('question-title');

// addEventListener cho button Tinh Diem 
calculate.addEventListener('click', () => {
    let panel = document.querySelectorAll('.panel');
    let temp = 0;
    let content = document.getElementsByClassName('modal-body')[0];
    let title = document.getElementById('exampleModalLabel');

    console.log(content);
    for (let i = 0; i < panel.length; i++) {
        if (Array.from(panel)[i].dataset.point == undefined) {
            temp = 1;
            title.innerHTML = 'Thông báo';
            content.innerHTML = 'Bạn chưa làm hết các câu hỏi';
            alert.hidden = false;
            // Sau 3s alert se bien mat 
            setTimeout(() => {
                alert.hidden = true;
            }, 3000);


            break;
        } else {
            points += Number(Array.from(panel)[i].dataset.point);
            result.push(Array.from(panel)[i].dataset.result);
        }
    }

    if (temp == 1) {
        points = 0;
        result = [];
    }

    if (temp == 0) {
        let username = document.getElementById('user-name');
        
        result = {...result};
        title.innerHTML = questionTitle.innerHTML;
        content.innerHTML = `Số điểm của ${username.innerText}: ` + points + '/20 đã được lưu lại. Bạn có thể chuyển qua câu hỏi khác.';
        save.hidden = false;
        myModal.show();
        calculate.hidden = true;

        db.collection(questionTitle.innerText).add({
            name: username.innerText,
            point: points,
            resultList: result
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                alert('Có lỗi khi lưu điểm vào database');
            });

    }
    console.log(points);
    console.log(result);
})
