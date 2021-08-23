import { myModal } from "../components/modal.js"

let content = document.getElementsByClassName('modal-body')[0];
let title = document.getElementById('exampleModalLabel');
let save = document.getElementById('save');
let close = document.getElementById('close');
let x = document.getElementById('x-button');

function setUsername() {
    let inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'Tên của bạn';

    let alertNull = document.createElement('p');
    alertNull.innerHTML = 'Bạn chưa điền tên';
    alertNull.style.color = 'red';
    alertNull.style.fontSize = '14px';
    alertNull.hidden = true;

    if (content.firstElementChild != inputName) {
        content.innerHTML = null;
        content.appendChild(inputName);
        content.appendChild(alertNull);
    }

    save.hidden = true;
    x.hidden = true;
    close.dataset.bsDismiss = null;

    close.innerHTML = 'Save';

    title.innerHTML = 'Nhập tên của bạn';

    // Luu username 
    close.addEventListener('click', () => {
        if (inputName.value == '') {
            alertNull.hidden = false;
            setTimeout(() => {
                alertNull.hidden = true;
            }, 3000);
        } else {
            document.getElementById('user-name').innerHTML = inputName.value;
            localStorage.setItem('userName', JSON.stringify(inputName.value));
            myModal.hide();
            resetModal();
        }
    })

    // Thoat ra va reset modal 
    x.addEventListener('click', () => {
        resetModal();
    })
}

function resetModal() {
    save.hidden = false;
    x.hidden = false;
    close.dataset.bsDismiss = 'modal';
    close.innerHTML = 'Close';
}

// Nhap username 
setUsername();

// Doi ten username 
let username = document.getElementById('user-name');
username.addEventListener('click', () => {
    save.hidden = true;
    close.innerHTML = 'Save';
    setUsername();
    x.hidden = false;
    myModal.show();
})


window.onload = () => {
    let temp = localStorage.getItem('userName');
    if (temp) {
        console.log('Da co username');
        document.getElementById('user-name').innerHTML = JSON.parse(temp);
        resetModal();
    } else {
        myModal.show();
    }

}