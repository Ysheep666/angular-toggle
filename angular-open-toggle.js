angular.module('ngOpenToggle', []).directive('openToggle', function($document, $animate) {
  var openAttrs, _close;
  openAttrs = null;
  _close = angular.noop;
  return {
    restrict: 'A',
    scope: {
      openToggle: '@'
    },
    link: function(scope, element, attrs) {
      attrs.$observe('openToggle', function(status) {
        var toggleElement, togglePopupElement;
        toggleElement = element.closest('.toggle');
        togglePopupElement = toggleElement.find('.toggle-popup');
        if (!status || status === 'false') {
          toggleElement.removeClass('open');
          $animate.removeClass(togglePopupElement, 'open');
          openAttrs = null;
          $document.unbind('mousedown keydown', _close);
          return _close = angular.noop;
        } else {
          toggleElement.addClass('open');
          $animate.addClass(togglePopupElement, 'open');
          openAttrs = attrs;
          _close = function(event) {
            if (event.type === 'mousedown' || (event.type === 'keydown' && event.keyCode === 27)) {
              return openAttrs.$set('openToggle', false);
            }
          };
          return $document.bind('mousedown keydown', _close);
        }
      });
      element.closest('.toggle').bind('mousedown keydown', function(event) {
        if (event.type === 'mousedown' || (event.type === 'keydown' && event.keyCode === 27)) {
          event.preventDefault();
          return event.stopPropagation();
        }
      });
      return element.bind('click', function(event) {
        var attrsWasOpen;
        event.preventDefault();
        event.stopPropagation();
        attrsWasOpen = attrs === openAttrs;
        if (openAttrs) {
          openAttrs.$set('openToggle', false);
        }
        if (!attrsWasOpen && !element.hasClass('disabled' && !element.prop('disabled'))) {
          return attrs.$set('openToggle', true);
        }
      });
    }
  };
});
