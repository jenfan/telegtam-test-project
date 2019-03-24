function make_draggable(app) {

  (function() {
    // var mapbox = document.getElementById(mapBox.id);
    var offset,
        boxTranslatedX = 0,
        selectedElement,
        startMouseX,
        x,
        width,
        ctm,
        clickedSvgX,
        draggingEle,
        offsetX;

    function getMouseX(evt) {
      if (evt.touches) { evt = evt.touches[0]; }
      return evt.clientX;
    }

    function startDrag(evt) {
      if (evt.target.className.baseVal == "mapBox"){
        selectedElement = evt.target;
        startMouseX = getMouseX(evt);
        boxTranslatedX = parseFloat(selectedElement.getAttribute('dragx')) || 0;
        x = parseFloat(selectedElement.getAttribute('x'));
        width = parseFloat(selectedElement.getAttribute('width'));
        ctm = selectedElement.getScreenCTM();
        clickedSvgX = (startMouseX - ctm.e) / ctm.a;
        offsetX = clickedSvgX - x + 5; // 5 becase of border width of box
        offsetX2 = clickedSvgX - x - 5 + width; // 5 becase of border width of box
        draggingEle = 'box'
        if (clickedSvgX  - 20 < x) {
          draggingEle = 'leftBound';
        }
        if (clickedSvgX  + 10 - width > x) {
          draggingEle = 'rightBound';
        }
      }
    }

    function drag(evt) {
      if (selectedElement != undefined) {
        if (draggingEle == 'box'){
          dx = startMouseX - getMouseX(evt);
          app.ports.boxMoved.send(boxTranslatedX - dx);
        }
        if (draggingEle == 'leftBound'){
          dx = startMouseX -  getMouseX(evt);
          app.ports.leftBoundMoved.send(clickedSvgX - offsetX - dx);
        }
        if (draggingEle == 'rightBound'){
          dx = startMouseX - getMouseX(evt);
          app.ports.rightBoundMoved.send(clickedSvgX - dx);
        }

      }
    }

    function endDrag(evt) {
      selectedElement = false;
      draggingEle = undefined;
    }


    document.addEventListener('mousedown', startDrag, {capture: true, passive: true});
    document.addEventListener('mousemove', drag, {capture: true, passive: true});
    document.addEventListener('mouseup', endDrag, {capture: true, passive: true});
    document.addEventListener('touchstart', startDrag, {capture: true, passive: true});
    document.addEventListener('touchmove', drag, {capture: true, passive: true});
    document.addEventListener('touchend', endDrag, {capture: true, passive: true});
    document.addEventListener('touchleave', endDrag, {capture: true, passive: true});
    document.addEventListener('touchcancel', endDrag, {capture: true, passive: true});

  })();
}



