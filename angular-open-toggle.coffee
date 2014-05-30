# 用于实现 popover 和 dropdown 等效果
angular.module 'ngOpenToggle', [
]
.directive 'openToggle', ($document, $animate) ->
  openAttrs = null
  _close = angular.noop
  {
    restrict: 'A'
    scope:
      openToggle: '@'
    link: (scope, element, attrs) ->
      attrs.$observe 'openToggle', (status) ->
        toggleElement = element.closest('.toggle')
        togglePopupElement = toggleElement.find '.toggle-popup'
        if !status or status is 'false'
          toggleElement.removeClass 'open'
          $animate.removeClass togglePopupElement, 'open'

          openAttrs = null
          $document.unbind 'mousedown keydown', _close
          _close = angular.noop
        else
          toggleElement.addClass 'open'
          $animate.addClass togglePopupElement, 'open'

          openAttrs = attrs
          _close = (event) ->
            if event.type is 'mousedown' or (event.type is 'keydown' and event.keyCode is 27)
              openAttrs.$set 'openToggle', false

          $document.bind 'mousedown keydown', _close

      element.closest('.toggle').bind 'mousedown keydown', (event) ->
        if event.type is 'mousedown' or (event.type is 'keydown' and event.keyCode is 27)
          event.preventDefault()
          event.stopPropagation()

      element.bind 'click', (event) ->
        event.preventDefault()
        event.stopPropagation()

        attrsWasOpen = (attrs is openAttrs)

        if openAttrs
          openAttrs.$set 'openToggle', false

        if not attrsWasOpen and not element.hasClass 'disabled' and not element.prop 'disabled'
          attrs.$set 'openToggle', true
  }
