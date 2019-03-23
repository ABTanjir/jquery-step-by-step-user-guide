/**
 * PLEASE DONT REMOVE *
  Title               : jQuery Pageintro
	Developer Name      : ABTanjir;
  Version             : 0.1.9
	Developer Firm      : Omicronic;
	Website             : https://omicronic.com
	Contact             : +8801911222919 [bangladesh]
	Email               : abtanjir@gmail.com
	BIO                 : https://abtanjir.com
	Facebook            : fb.com/ABTanjir
  License             : Dual licensed under the MIT and GPL licenses.
*/
(function() {
    var $container, $hole, $nav, $overlay, $tooltip, data, defaults, finish, getPosition, holeTemplate, init, overlayTemplate, select, setTooltipPosition, start, tooltipTemplate, update;
    data = {};
    defaults = {
      container: 'body',
      spacing: 20,
      actions: {
        next: {
          text: 'Next',
          "class": ''
        },
        finish: {
          text: 'Finish',
          "class": ''
        }
      },
      entries: [ 
        {
          selector: '#example',
          text: 'this is example',
          onEnter: function() {
            return console.log('enter');
          },
          onExit: function() {
            return console.log('exit');
          }
        }
      ]
    };
  
    tooltipTemplate = ['<div class="pageintro-tooltip">', '<div class="pageintro-text"></div>', '<ul class="pageintro-nav"></ul>', '<div class="pageintro-actions"></div>', '</div>'].join('');
  
    holeTemplate = '<div class="pageintro-hole"></div>';
  
    overlayTemplate = '<div class="pageintro-overlay"></div>';
  
    $nav = null;
  
    $hole = null;
  
    $overlay = null;
  
    $tooltip = null;
  
    $container = null;
  
    init = function(options) {
      var $actions, $btnFinish, $btnNext, $li, actions, entry, i, j, len, ref;
      data = $.extend({}, defaults, options);
      $container = $(data.container);
      $hole = $(holeTemplate).hide();
      $overlay = $(overlayTemplate).hide();
      $tooltip = $(tooltipTemplate).hide();
      $nav = $tooltip.find('.pageintro-nav');
      $overlay.append($hole, $tooltip);
      $container.append($overlay);
      ref = data.entries;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        entry = ref[i];
        entry.$target = $(entry.selector);
        $li = $('<li/>').on('click', i, function(e) {
          return select(e.data);
        });
        $nav.append($li);
      }
      actions = data.actions;
      $actions = $tooltip.find('.pageintro-actions');
      $btnNext = $('<a class="btn-next" href="#">' + actions.next.text + '</a>');
      $btnFinish = $('<a class="btn-finish" href="#">' + actions.finish.text + '</a>');
      $btnNext.addClass(actions.next["class"]).on('click', function() {
        return select(data.step + 1);
      });
      $btnFinish.addClass(actions.finish["class"]).on('click', finish);
      return $actions.append($btnNext, $btnFinish);
    };
  
    getPosition = function($target) {
      var position, rootPosition;
      position = $target.offset();
      rootPosition = $(data.container).offset();
      return {
        left: position.left - rootPosition.left,
        top: position.top - rootPosition.top
      };
    };
  
    setTooltipPosition = function(position, size) {
      var direction, methods, selfHeight, selfWidth;
      selfWidth = $tooltip.outerWidth();
      selfHeight = $tooltip.outerHeight();
      methods = {
        left: function(force) {
          var height, result;
          height = Math.min($(window).height(), size.height);
          result = {
            left: position.left - selfWidth - data.spacing,
            top: position.top + (height - selfHeight) / 2
          };
          if (!force) {
            if (result.left < 0) {
              return false;
            }
            if (result.top + selfHeight > $(window).height()) {
              return false;
            }
          }
          if (result.top < 0) {
            result.top = data.spacing;
          }
          $tooltip.css(result);
          $tooltip.addClass('direction-left');
          return true;
        },
        right: function(force) {
          var height, result;
          height = Math.min($(window).height(), size.height);
          result = {
            left: position.left + size.width + data.spacing,
            top: position.top + (height - selfHeight) / 2
          };
          if (!force) {
            if (result.left + selfWidth > $(window).width()) {
              return false;
            }
            if (result.top + selfHeight > $(window).height()) {
              return false;
            }
          }
          if (result.top < 0) {
            result.top = data.spacing;
          }
          $tooltip.css(result);
          $tooltip.addClass('direction-right');
          return true;
        },
        top: function(force) {
          var result;
          result = {
            left: position.left + (size.width - selfWidth) / 2,
            top: position.top - selfHeight - data.spacing
          };
          if (!force) {
            if (result.top < 0) {
              return false;
            }
          }
          $tooltip.css(result);
          $tooltip.addClass('direction-top');
          return true;
        },
        bottom: function(force) {
          var result;
          result = {
            left: position.left + (size.width - selfWidth) / 2,
            top: position.top + size.height + data.spacing
          };
          if (!force) {
            if (result.top + selfHeight > $(window).height()) {
              return false;
            }
          }
          $tooltip.css(result);
          $tooltip.addClass('direction-bottom');
          return true;
        }
      };
      for (direction in methods) {
        if (methods[direction]()) {
          return;
        }
      }
      return methods['left'](true);
    };
  
    select = function(num) {
      var entry, position, size;
      if (typeof data.step !== 'undefined' && num !== data.step) {
        entry = data.entries[data.step];
        if (entry.onExit) {
          entry.onExit();
        }
      }
      entry = data.entries[num];
      if (entry.onEnter && num !== data.step) {
        entry.onEnter();
      }
      data.step = num;
      $tooltip.find('.pageintro-text').text(entry.text);
      $nav.find('li').eq(num).addClass('active').siblings().removeClass('active');
      if (num < data.entries.length - 1) {
        $tooltip.find('.btn-finish').hide();
        $tooltip.find('.btn-next').show();
      } else {
        $tooltip.find('.btn-finish').show();
        $tooltip.find('.btn-next').hide();
      }
      position = getPosition(entry.$target);
      size = {
        width: entry.$target.outerWidth(),
        height: entry.$target.outerHeight()
      };
      setTooltipPosition(position, size);
      $hole.css(position);
      return $hole.css(size);
    };
  
    update = function() {
      return select(data.step);
    };
  
    start = function() {
      $(window).on('resize', update);
      $container.addClass('pageintro');
      $tooltip.show();
      $overlay.show();
      $hole.show();
      return select(0);
    };
  
    finish = function() {
      $tooltip.hide();
      $overlay.hide();
      $hole.hide();
      $(window).off('resize', update);
      return $container.removeClass('pageintro');
    };
  
    this.PageIntro = {
      init: init,
      start: start,
      finish: finish
    };
  
  }).call(this);