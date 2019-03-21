function make_draggable(app) {

  app.ports.initListeners.subscribe(function (mapBox) {
    var svg = document.getElementById(mapBox.id);
    var offset, startX=0, selectedElement, startXPosition;

    function getMousePositionX(evt) {
      if (evt.touches) { evt = evt.touches[0]; }
      return evt.clientX;
    }

    function startDrag(evt) {
        selectedElement = evt.target;
        startXPosition = getMousePositionX(evt);
        startX = parseInt(selectedElement.getAttribute('dragx')) || 0;
    }

    function drag(evt) {
      if (selectedElement) {
        dx = startXPosition - getMousePositionX(evt);
        app.ports.boxMoved.send(startX - dx);
      }
    }

    function endDrag(evt) {
      selectedElement = false;
    }


    svg.addEventListener('mousedown', startDrag, {capture: true, passive: true});
    svg.addEventListener('mousemove', drag, {capture: true, passive: true});
    svg.addEventListener('mouseup', endDrag, {capture: true, passive: true});
    svg.addEventListener('touchstart', startDrag, {capture: true, passive: true});
    svg.addEventListener('touchmove', drag, {capture: true, passive: true});
    svg.addEventListener('touchend', endDrag, {capture: true, passive: true});
    svg.addEventListener('touchleave', endDrag, {capture: true, passive: true});
    svg.addEventListener('touchcancel', endDrag, {capture: true, passive: true});

  })
}



