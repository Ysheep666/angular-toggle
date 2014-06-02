# 用于实现 popover 和 dropdown 等效果
angular.module 'ngToggle', [
]
.directive 'toggle', ($document, $animate) ->
  _element = null
  _close = angular.noop
  {
    restrict: 'A'
    link: (scope, element, attrs) ->
      element.closest('.toggle').bind 'mousedown keydown', (event) ->
        if event.type is 'mousedown' or (event.type is 'keydown' and event.keyCode is 27)
          event.preventDefault()
          event.stopPropagation()

      element.bind 'click', (event) ->
        event.preventDefault()
        event.stopPropagation()

        elementWasOpen = (element is _element)

        if _element
          toggleElement = _element.closest '.toggle'
          togglePopupElement = toggleElement.find '.toggle-popup'

          toggleElement.removeClass 'open'
          $animate.removeClass togglePopupElement, 'open'

          $document.unbind 'mousedown keydown', _close

          _element = null
          _close = angular.noop

        toggleElement = element.closest '.toggle'
        togglePopupElement = toggleElement.find '.toggle-popup'

        if not elementWasOpen and not element.hasClass 'disabled' and not element.prop 'disabled'
          toggleElement.addClass 'open'
          $animate.addClass togglePopupElement, 'open'

          _element = element
          _close = (event) ->
            if event.type is 'mousedown' or (event.type is 'keydown' and event.keyCode is 27)
              _element.trigger 'click'

          $document.bind 'mousedown keydown', _close
  }
