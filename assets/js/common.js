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

  $('.dashboard__nav>ul .submenu>a').on('click', function(event) {
  	event.preventDefault();
  	let $parent = $(this).closest('li');
  	$parent.toggleClass('active');
  	$parent.find('ul').slideToggle(300);
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
    if(_this.val().length >= 3){
			$('.dashboard__search__result, .dashboard__search__overlay').fadeIn(200)
    }else{
			$('.dashboard__search__result, .dashboard__search__overlay').fadeOut(200)
    }
  })

 	$('.dashboard__search__overlay').on('click', function(event) {
 		event.preventDefault();
		$('.dashboard__search__result, .dashboard__search__overlay').fadeOut(200)
 	});


 	$('.dashboard__search__result .add').on('click', function(event) {
 		event.preventDefault();
	  $.fancybox.open({src: '#popup-request-adding'});
 	});





	$.fancybox.defaults.closeExisting = true;
  $.fancybox.defaults.touch = false;
  $.fancybox.defaults.btnTpl.smallBtn = '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.81856 0L20 18.1814L18.1819 19.9996L0.000413644 1.81814L1.81856 0Z" fill="#C4C4C4"/><path d="M18.1814 2.28865e-05L0 18.1815L1.81814 19.9996L19.9996 1.81817L18.1814 2.28865e-05Z" fill="#C4C4C4"/></svg></button>';




});