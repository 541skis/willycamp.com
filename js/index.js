"use strict";

(function () {
  var slider = new IdealImageSlider.Slider({
    selector: "#js-slider",
    height: 250,
    interval: 5000,
    transitionDuration: 300,
  });

  slider.start();
})();

(function () {
  var modals = document.getElementsByClassName("modal");
  var modalToggles = document.getElementsByClassName("modal-toggle");

  for (var i = 0; i < modalToggles.length; i++) {
    modalToggles[i].addEventListener(
      "click",
      function (e) {
        var id = "js-modal-" + e.target.getAttribute("data-modal");
        var modal = document.getElementById(id);

        if (modal.classList.contains("visible")) {
          modal.classList.remove("visible");
        } else {
          modal.classList.add("visible");
        }
      },
      false
    );
  }

  for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener(
      "mousedown",
      function (e) {
        if (e.target.classList.contains("modal")) {
          e.target.classList.remove("visible");
        }
      },
      false
    );
  }
})();
