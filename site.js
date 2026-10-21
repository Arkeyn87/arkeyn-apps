/* Arkeyn — переключатели темы и языка.
   Выбор запоминается в localStorage и применяется до отрисовки крошечным скриптом в <head>. */

(function () {
  'use strict';

  var root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      var toDark = theme === 'light';
      btn.setAttribute('aria-label', toDark ? 'Тёмная тема' : 'Светлая тема');
      btn.setAttribute('title', toDark ? 'Тёмная тема' : 'Светлая тема');
      btn.setAttribute('aria-pressed', String(!toDark));
    }
  }

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set-lang') === lang));
    }
  }

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* приватный режим — просто не запоминаем */ }
  }

  function init() {
    setTheme(root.getAttribute('data-theme') || 'light');
    setLang(root.getAttribute('data-lang') || 'ru');

    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(next);
        store('arkeyn-theme', next);
      });
    }

    var langButtons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < langButtons.length; i++) {
      langButtons[i].addEventListener('click', function () {
        var lang = this.getAttribute('data-set-lang');
        setLang(lang);
        store('arkeyn-lang', lang);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
