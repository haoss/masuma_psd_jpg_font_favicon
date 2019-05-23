'use strict';

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  $('.main-slider__init').slick({
    arrows: false,
    dots: true,
    loop: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false
  });

  mainMapAddress();
  headerLang();
  jNavigation();

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() {
  var width = $(window).width();
  var footerBtn = $('.footer__nav-btn');
  var footerUl = $('.footer__nav-ul');

  if (width >= 992 && footerBtn.hasClass('is-active')) {
    footerBtn.add(footerUl).removeClass('is-active');
  }
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function mainMapAddress() {
  var tab1 = $('#map1-tab');
  var tab2 = $('#map2-tab');
  var block = $('.main-map__office');

  block.addClass('is-active')

  tab1.on('click', function(){
    block.addClass('is-active')
  });
  tab2.on('click', function(){
    block.removeClass('is-active')
  });
}

function headerLang() {
  var link = $('.header__language .active span');
  var lang = $('.header__language');

  link.on('click', function(e){
    var _this = $(this);
    var block = _this.parents('.header__language');
    if (block.hasClass('is-active')) {
      block.removeClass('is-active');
    } else {
      setTimeout(function(){
        block.addClass('is-active');
      });
    }
  });

  $(document).on('click', function(){
    if (lang.hasClass('is-active')) {
      lang.removeClass('is-active');
    }
  });
}

function jNavigation() {
  var btn = $('.j-btn-target');
  var btnTarget = $('.j-btn');

  $(document).on('click', '.j-btn', function(e){
    e.stopPropagation();
    var _this = $(this);
    var block = _this.next('.j-btn-target');
    
    if (_this.hasClass('is-active')) {
      _this.add(block).removeClass('is-active');
    } else {
      btn.add(btnTarget).removeClass('is-active');
      _this.add(block).addClass('is-active');
    }
  });

  $(document).on('click', function(e){
    if (btn.hasClass('is-active')) {
      btn.add(btnTarget).removeClass('is-active');
    }
  });
}