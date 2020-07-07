$(function() {

  $('.input_field__input')
    .on('focus', function() {
      let _this = $(this);
      _this.closest('.input_field').addClass('hasData').addClass('focus');
    })
    .on('blur', function() {
      let _this = $(this);
      _this.closest('.input_field').removeClass('focus');
      if (_this.val() == "") {
        _this.closest('.input_field').removeClass('hasData');
      } else {
        _this.closest('.input_field').addClass('hasData');
      }
    });

  // dashboard
  $('.header__user__ico').on('click', function(event) {
    $(this).closest('.header__user').toggleClass('active');
  });


  $(document).mouseup(function(e) {
    let button = $('.header__user, .header__user *');
    if (!button.is(e.target)) {
      $('.pager').removeClass('pager-quick');
      $('.header__user').removeClass('active');
    }
  });

  $('.dashboard__nav li.active ul').show();

  $('.dashboard__nav>ul .submenu>a').on('click', function(event) {
    event.preventDefault();
    let $parent = $(this).closest('li');
    if ($parent.hasClass('active')) {
      $parent.removeClass('active');
      $parent.find('ul').slideUp(300);
    } else {
      $parent.addClass('active');
      $parent.find('ul').slideDown(300);
    }
  });

  $('.dashboard__search__input')
    .on('focus', function() {
      let _this = $(this);
      _this.closest('.dashboard__search').addClass('hasData').addClass('focus');
    })
    .on('blur', function() {
      let _this = $(this);
      _this.closest('.dashboard__search').removeClass('focus');
      if (_this.val() == "") {
        _this.closest('.dashboard__search').removeClass('hasData');
      } else {
        _this.closest('.dashboard__search').addClass('hasData');
      }
    });


  $('.dashboard__search__input').on('input', function() {
    let _this = $(this);
    if (_this.val().length >= 3) {
      $('.dashboard__search__result, .dashboard__search__overlay').fadeIn(200)
    } else {
      $('.dashboard__search__result, .dashboard__search__overlay').fadeOut(200)
    }
  })

  $('.dashboard__search__overlay').on('click', function(event) {
    event.preventDefault();
    $('.dashboard__search__result, .dashboard__search__overlay').fadeOut(200)
  });


  $('.dashboard__search__result .add').on('click', function(event) {
    event.preventDefault();
    $.fancybox.open({ src: '#popup-request-adding' });
  });





  $.fancybox.defaults.closeExisting = true;
  $.fancybox.defaults.touch = false;
  $.fancybox.defaults.btnTpl.smallBtn = '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.81856 0L20 18.1814L18.1819 19.9996L0.000413644 1.81814L1.81856 0Z" fill="#C4C4C4"/><path d="M18.1814 2.28865e-05L0 18.1815L1.81814 19.9996L19.9996 1.81817L18.1814 2.28865e-05Z" fill="#C4C4C4"/></svg></button>';

  $('.dropdown_filter__label').on('click', function(event) {
    let $parent = $(this).closest('.dropdown_filter');
    $('.dropdown_filter').not($parent).removeClass('active');
    $parent.toggleClass('active');
  });

  $('.dashboard__header__filter .dropdown_filter__label').on('click', function(event) {
    if ($(this).closest('.dropdown_filter').hasClass('active')) {
      $('.dashboard__content_overlay').addClass('active');
    } else {
      $('.dashboard__content_overlay').removeClass('active');
    }
  });
  $('.dashboard__content_overlay').on('click', function(event) {
    $(this).removeClass('active');
    $('.dashboard__header__filter .dropdown_filter').removeClass('active');
  });

  $('.dropdown_filter__list .checkbox-select_all').on('click', function(event) {
    let $checkbox = $(this).find('input[type="checkbox"]');
    setTimeout(() => {
      if ($checkbox.prop('checked')) {
        $checkbox.closest('.dropdown_filter__list').find('.dropdown_filter__list__columns input[type="checkbox"]').prop('checked', true);
      } else {
        $checkbox.closest('.dropdown_filter__list').find('.dropdown_filter__list__columns input[type="checkbox"]').prop('checked', false);
      }
    }, 50)
  });

  $('.dropdown_filter__list__columns .checkbox').on('click', function(event) {
    let $this = $(this);
    setTimeout(() => {
      $(this).closest('.dropdown_filter__list').find('.checkbox-select_all input[type="checkbox"]').prop('checked', false);
    }, 50)
  });

  $('.dropdown_filter__list input[type="checkbox"]').on('change', function(event) {
    setTimeout(() => {
      let cnt = $(this).closest('.dropdown_filter').find('.dropdown_filter__list__columns input[type="checkbox"]:checked').length == 0 ? "" : $(this).closest('.dropdown_filter').find('.dropdown_filter__list__columns input[type="checkbox"]:checked').length;
      $(this).closest('.dropdown_filter').find('.dropdown_filter__num').text(cnt);
      if (cnt != "") {
        $(this).closest('.dropdown_filter').addClass('no-empty')
      } else {
        $(this).closest('.dropdown_filter').removeClass('no-empty')
      }
    }, 60)

  });


  $('.geo_table .td:first-child').clone().appendTo('.v-header')




  var scr = $(".geo_table_scroll_wrap"),
  thead = $('.geo_table .thead .tr');
  scr.mousedown(function() {
    var startX = this.scrollLeft + event.pageX;
    var startY = this.scrollTop + event.pageY;
    scr.mousemove(function() {
      this.scrollLeft = startX - event.pageX;
      thead.css('left', this.scrollLeft*(-1));
      return false;
    });
  });
  $(window).mouseup(function() {
    scr.off("mousemove");
  });

  $("#stiky-sidebar").stick_in_parent({offset_top: 0});  

  $('.monthpicker__table__cell').each(function(index, el) {
    let i = $(el).index();
    i < 10 ? (i = "0"+i) : true;
    $(el).attr('data-date', i+"."+$(el).closest('.monthpicker__table__itm').find('.monthpicker__table__title').text().slice(-2));
  });
  $('.monthpicker__table__cell').on('click', function(event) {
    let $parent = $(this).closest('.monthpicker__table');
    $(this).closest('.monthpicker').find('.monthpicker__nav li').removeClass('active');
    if($parent.find('.monthpicker__table__cell.first').length == 0){
      $(this).addClass('first');
      $parent.find('.monthpicker__table__cell').removeClass('active');
      $parent.removeClass('route');
      $parent.closest('.dropdown_filter').find('.dropdown_filter__val').text($parent.find('.monthpicker__table__cell.first').data('date'));
    }else{
      if (!$(this).hasClass('first')) {
        if($parent.find('.monthpicker__table__cell.last').length == 0){
          $(this).addClass('last');
          var route = false;
          $parent.find('.monthpicker__table__cell').each(function(index, el) {
            if (route) {
              $(el).addClass('active');
              if ($(el).hasClass('first') || $(el).hasClass('last')) {
                route = false;
                $(el).addClass('active end');
              }
            } else {
              if ($(el).hasClass('first') || $(el).hasClass('last')) {
                route = true;
                $(el).addClass('active start');
              };
            }
          });
          $parent.addClass('route');
          $parent.closest('.dropdown_filter').find('.dropdown_filter__val').text($parent.find('.monthpicker__table__cell.start').data('date')+"-"+$parent.find('.monthpicker__table__cell.end').data('date'));
        }else{
          $parent.find('.monthpicker__table__cell').removeClass('first last end start active');
          $(this).addClass('first');
          $parent.removeClass('route');
          $parent.closest('.dropdown_filter').find('.dropdown_filter__val').text($parent.find('.monthpicker__table__cell.first').data('date'));

        }
      }
    }
  }); 

  $('.monthpicker__nav li').on('click', function(event) {
    event.preventDefault();

    let period = +$(this).data('period');
    let now = new Date(),
    nowMonth = 1+now.getMonth(),
    nowYear = now.getFullYear().toString().slice(-2);
    nowMonth < 10 ? (nowMonth = "0"+nowMonth) : true;

    $(this).closest('.monthpicker').find('.monthpicker__table__cell').removeClass('first last end start active');
    $(this).closest('.monthpicker').find('.monthpicker__table').removeClass('route');


    let currentMonthEl = $(this).closest('.monthpicker').find('.monthpicker__table__cell[data-date="'+nowMonth+'.'+nowYear+'"]');
    currentMonthEl.prev().click();
    let i;
    $(this).closest('.monthpicker').find('.monthpicker__table__cell').each(function(index, el) {
      if($(el).is(currentMonthEl)){
        i = index;
        return;
      }
    });
    $(this).closest('.monthpicker').find('.monthpicker__table__cell')[i+period].click()
  });
    $(this).closest('ul').find('li.active').removeClass('active');
    $(this).addClass('active');
});