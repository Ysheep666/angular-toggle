angular.module('ngToggle', []).directive('toggle', function($document, $animate) {
  var _close, _element;
  _element = null;
  _close = angular.noop;
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var toggleElement;
      toggleElement = element.closest('.toggle');
      toggleElement.bind('mousedown keydown', function(event) {
        if (toggleElement.hasClass('open') && (event.type === 'mousedown' || (event.type === 'keydown' && event.keyCode === 27))) {
          event.preventDefault();
          return event.stopPropagation();
        }
      });
      return element.bind('click', function(event) {
        var elementWasOpen, togglePopupElement;
        event.preventDefault();
        event.stopPropagation();
        elementWasOpen = element === _element;
        if (_element) {
          toggleElement = _element.closest('.toggle');
          togglePopupElement = toggleElement.find('.toggle-popup');
          toggleElement.removeClass('open');
          $animate.removeClass(togglePopupElement, 'open');
          $document.unbind('mousedown keydown', _close);
          _element = null;
          _close = angular.noop;
        }
        toggleElement = element.closest('.toggle');
        togglePopupElement = toggleElement.find('.toggle-popup');
        if (!elementWasOpen && !element.hasClass('disabled' && !element.prop('disabled'))) {
          toggleElement.addClass('open');
          $animate.addClass(togglePopupElement, 'open');
          _element = element;
          _close = function(event) {
            if (event.type === 'mousedown' || (event.type === 'keydown' && event.keyCode === 27)) {
              return _element.trigger('click');
            }
          };
          return $document.bind('mousedown keydown', _close);
        }
      });
    }
  };
});