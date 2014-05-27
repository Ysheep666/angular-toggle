angular.module('directive.open_toggle', []).directive('openToggle', function($document) {
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
        if (!status || status === 'false') {
          element.closest('.toggle').removeClass('open');
          openAttrs = null;
          $document.unbind('mousedown keydown', _close);
          return _close = angular.noop;
        } else {
          element.closest('.toggle').addClass('open');
          openAttrs = attrs;
          _close = function(event) {
            if (event.type === 'mousedown' || (event.type === 'keydown' && event.keyCode === 27)) {
              event.preventDefault();
              event.stopPropagation();
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