// When the user scrolls down 20px from the top of the document, slide down the navbar
// When the user scrolls to the top of the page, slide up the navbar (50px out of the top view)

let aTagList = document.querySelectorAll('.nav-link');
aTagList = Array.from(aTagList);

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    document.getElementById("nav-bg").style.top = "0";

    aTagList.forEach((element) => {
    element.style.color = 'black';
    })

  } else {
    document.getElementById("nav-bg").style.top = "-120px";

    aTagList.forEach((element) => {
    element.style.color = 'white';
    })
  }
}