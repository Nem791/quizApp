const listGroupItem = document.querySelectorAll('.list-group-item')
listGroupItem.forEach((element, index) => {
    element.addEventListener('click', () => {
        localStorage.setItem('quizIndex', JSON.stringify(index));
        location.reload();
    })
})