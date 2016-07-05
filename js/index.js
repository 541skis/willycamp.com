'use strict';

(function() {
  smoothScroll.init({
    speed: 500,
    easing: 'easeInOutCubic',
    offset: 0,
    updateURL: true
  });
})();

(function() {
  var slider = new IdealImageSlider.Slider({
    selector: '#js-slider',
    height: 250,
    interval: 5000,
    transitionDuration: 300
  });

  slider.start();
})();

(function() {
  var modals = document.getElementsByClassName('modal');
  var modalToggles = document.getElementsByClassName('modal-toggle');

  for (var i = 0; i < modalToggles.length; i++) {
    modalToggles[i].addEventListener('click', function(e) {
      var id = 'js-modal-' + e.target.getAttribute('data-modal');
      var modal = document.getElementById(id);

      if (modal.classList.contains('visible')) {
        modal.classList.remove('visible');
      } else {
        modal.classList.add('visible');
      }
    }, false);
  }

  for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('mousedown', function(e) {
      if (e.target.classList.contains('modal')) {
        e.target.classList.remove('visible');
      }
    }, false);
  }
})();

(function() {
  new MultiDatePicker({
    dates: [ 'Jul 11, 2016', 'Jul 12, 2016', 'Jul 13, 2016', 'Jul 14, 2016', 'Jul 15, 2016' ],
    xAlign: 'auto',
    yAdjust: '-5px'
  });
})();

(function() {
  var form = document.getElementById('js-form');
  var formSubmitButton = document.getElementById('js-form-submit-button');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formSubmitButton.innerHTML = 'Registering...';
    formSubmitButton.disabled = true;

    var inputs = form.getElementsByTagName('input');
    var script = document.createElement('script');
    var callback = 'jsonp_callback_' + Math.round(10000 * Math.random());
    var params = '';

    for (var i = 0; i < inputs.length; i++) {
      var e = inputs[i];
      var name = e.name;
      var value = (e.type === 'checkbox') ? e.checked : e.value;

      if (!value) {
        value = '';
      }

      params += '&' + encodeURIComponent(name) + '=' + encodeURIComponent(value);
    }

    window[callback] = function(data) {
      formSubmitButton.innerHTML = 'Submit Another';
      formSubmitButton.disabled = false;

      delete window[callback];
      document.body.removeChild(script);
    };

    script.src = form.action + '?callback=' + callback + params;
    document.body.appendChild(script);
  }, false);
})();
