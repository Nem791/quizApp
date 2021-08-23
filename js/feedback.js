import { bsAlert } from "../components/toast.js";

// Cac bien cua form 
let btnSubmit = document.getElementById('submit-btn');
let fname = document.getElementById('fname');
let subject = document.getElementById('subject');

// Cac bien cua Toast 
let countTimer = document.getElementById('count-time');
countTimer.innerHTML = (Math.random() + Math.floor(Math.random() * 2)).toFixed(2) + " seconds ago";
let toastIcon = document.getElementById('toast-icon');
let toastBody = document.getElementById('toast-body');

btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    if (fname.value == '' || subject.value == '') {
        toastBody.innerHTML = 'Không được để trống !';
        toastIcon.style.color = 'red';
        toastIcon.className = null;
        toastIcon.classList.add('fas', 'fa-exclamation-circle');
        bsAlert.show();
    } else {
        db.collection("usersubmit").add({
            name: fname.value,
            submitText: subject.value
        })
            .then((docRef) => {
                // Thong bao thanh cong 
                toastBody.innerHTML = 'Submit thành công!';
                toastIcon.style.color = 'greenyellow';
                toastIcon.className = null;
                toastIcon.classList.add('fas', 'fa-check-circle');

                console.log("Document written with ID: ", docRef.id);
                bsAlert.show();
            })
            .then(() => {
                fname.value = null;
                subject.value = null;
            })
            .catch((error) => {
                // Bao loi 
                toastBody.innerHTML = 'Có lỗi khi submit!';
                toastIcon.style.color = 'red';
                toastIcon.className = null;
                toastIcon.classList.add('fas', 'fa-exclamation-circle');
                bsAlert.show();
                console.error("Error adding document: ", error);
            });
    }
})

