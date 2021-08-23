document.querySelector('#save').addEventListener('click', function() {
    html2canvas(document.querySelector('.modal'), {
        onrendered: function(canvas) {
            // document.body.appendChild(canvas);
          return Canvas2Image.saveAsPNG(canvas);
        }
    });
});
