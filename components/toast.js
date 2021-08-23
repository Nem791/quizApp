// Goi component Toast trong Bootstrap 
let myAlert = document.querySelector('.toast');
let bsAlert = new bootstrap.Toast(myAlert, {
    animation: true,
    autohide: true,
    delay: 3000
});

export {bsAlert};