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
    dates: [ 'Jul 9, 2018', 'Jul 10, 2018', 'Jul 11, 2018', 'Jul 12, 2018', 'Jul 13, 2018' ],
    align: 'left',
    marginSides: '1.6rem',
    marginTop: '87px'
  });
})();

(function() {
  var form = document.getElementById('js-form');
  var formSubmitButton = document.getElementById('js-form-submit-button');
  var submitText = formSubmitButton.innerHTML;

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
      var value = false;

      switch (e.type) {
        case 'checkbox':
          value = e.checked;
          break;
        case 'radio':
          if (e.checked) value = e.value;
          break;
        default:
          value = e.value ? e.value : '';
      }

      if (value !== false) {
        params += '&' + encodeURIComponent(name) + '=' + encodeURIComponent(value);
      }
    }

    window[callback] = function(data) {
      formSubmitButton.type = 'reset';
      formSubmitButton.innerHTML = 'Success';
      formSubmitButton.classList.add('success');
      formSubmitButton.disabled = false;

      delete window[callback];
      document.body.removeChild(script);
    };

    script.src = form.action + '?callback=' + callback + params;
    document.body.appendChild(script);
  }, false);

  form.addEventListener('reset', function(e) {
    formSubmitButton.type = 'submit';
    formSubmitButton.innerHTML = submitText;
    formSubmitButton.classList.remove('success');
  }, false);
})();
