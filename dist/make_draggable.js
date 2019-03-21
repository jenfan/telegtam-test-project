function make_draggable(app) {

  app.ports.initListeners.subscribe(function (mapBox) {
    var svg = document.getElementById(mapBox.id);
    var offset, x=0, selectedElement, startDragX;

    function getMousePositionX(evt) {
      var CTM = selectedElement.getScreenCTM();
      if (evt.touches) { evt = evt.touches[0]; }
      // return {
      //   (evt.clientX - CTM.e) / CTM.a
      // };
      return evt.clientX;
    }

    function startDrag(evt) {
        evt.preventDefault()
        selectedElement = evt.target;
        startDragX = getMousePositionX(evt);
        // offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
        console.log("start drag");
        x = parseInt(selectedElement.getAttribute('dragx')) || 0;
        console.log("parsed X:", x);
    }

    function drag(evt) {
      if (selectedElement) {
        dx = startDragX - getMousePositionX(evt);
        var deltaX = x - dx;
        // selectedElement.setAttribute('transform', 'translate(' + deltaX + ',0)');
        selectedElement.setAttribute('dragx', deltaX);
        app.ports.boxMoved.send(deltaX);
      }
    }

    function endDrag(evt) {
      selectedElement = false;
      console.log("end drag");
    }

    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    // svg.addEventListener('mouseleave', endDrag, false);
    svg.addEventListener('touchstart', startDrag);
    svg.addEventListener('touchmove', drag);
    svg.addEventListener('touchend', endDrag);
    svg.addEventListener('touchleave', endDrag);
    svg.addEventListener('touchcancel', endDrag);

  })
}



