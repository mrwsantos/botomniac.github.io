///////////////////////////////////////////////////////////////////////////////////////////////////
//INIT--------------------------------------------------------------------------------------------
$(document).init(function () {
  setLanguage();
  ScrollOut({
    targets: 'section,div.load'
  });

});
//-----------------------------------------------------------------------------------------------------

//AJAX STOP--------------------------------------------------------------------------------------------
$(document).ajaxStop(function () {
  collapseMenu();
  menuScrollspy();
  hideHeaderOnInputFocus();
  discoverButton();
  toggleMode();
  lightbox();
});
//-----------------------------------------------------------------------------------------------------

//ONLOAD ----------------------------------------------------------------------------------------------
window.onload = function () {

}
//-----------------------------------------------------------------------------------------------------

//READY------------------------------------------------------------------------------------------------
$(document).ready(function () {
  galleryColoured();
  btnLanguage();
  validateDefault();
});
//-----------------------------------------------------------------------------------------------------

//FUNTIONS ABOVE
///////////////////FORM

function validateDefault() {
  $.validator.setDefaults({
    submitHandler: function (form) {
      var $data = form.serialize();

      $.ajax({
        type: "POST",
        url: "../../php/email.php",
        data: $data,
        success: function () {
          $("#msg").addClass('form-sent');
        }
      });
    }
  });
}

function validateContactForm() {
  $('#contactForm').validate({
    errorElement: 'span',
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
      subject: "required",
      message: "required"
    },
    messages: {
      name: 'The name field must be filled.',
      email: {
        required: 'The email field must be filled.',
        email: 'Type a valid email.'
      },
      subject: 'The subject field must be filled.',
      message: 'Type a message.'
    },
    submitHandler: submitContactForm
  });
}

function validateContactFormTwo() {
  $('#contactFormTwo').validate({
    errorElement: 'span',
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
      subject: "required",
      message: "required"
    },
    messages: {
      name: 'O campo de nome deve ser preenchido.',
      email: {
        required: 'O email deve ser preenchido.',
        email: 'Insira um email válido.'
      },
      subject: 'O assunto deve ser preenchido.',
      message: 'Este campo nao pode estar vazio.'
    },
    submitHandler: submitContactForm
  });
}

function submitContactForm(form) {
  var $data = $(form).serialize();

  $.ajax({
    type: "POST",
    url: "../../php/email.php",
    data: $data,
    success: function () {
      $("#msg").addClass('form-sent');

      $('.form').each (function(){
        this.reset();
      });
    }
  });
}


////////////////////////////////////////////////////////////////////////////////////////
//////////////// SET LANGUAGE
function setLanguage() {
  var userLang = '';

  function setCookie(cookieName, cookieValue, daysToExpire, path, domain) {
    var date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString() + 'path=' + path +
      'domain=' + domain;
    // console.log("setCookieValue: " + cookieValue);
  }


  function getCookieValue(cookieName) {
    var cookieValue = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  function deleteCookie() {
    document.cookie = "userLang=''; max-age=0; expires=0";
    // console.log("Cookies deleted");
  }



  //PEGAR INFO SE JA EXISTE O COOKIE
  function ifCookieExists() {
    if (getCookieValue('userLang').length) {
      // console.log('tem cookie')
      if ((userLang === "pt-BR") || (userLang === "pt-PT")) {
        addHTMLbr();
      } else {
        addHTMLen();
      }
    } else {
      deleteCookie();
      ifCookieNOTExists();
    }
  }

  function ifCookieNOTExists() {
    userLang = navigator.language || navigator.userLanguage;
    setCookie('userLang', userLang, '20');
    ifCookieExists();
  }

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //CHAMA FUNCAO
  if ($('html').attr('lang') === '') {
    ifCookieNOTExists();
  } else {
    ifCookieExists();
  }
}

function btnLanguage() {
  $(document).on('click', '#langPT', function () {
    addHTMLbr();
  });

  $(document).on('click', '#langEN', function () {
    addHTMLen();
  });
}

function addHTMLbr() {
  $('html').attr('lang', 'pt');
  $("#header").load("html/pt-BR/common/header.html");
  $("#footer").load("html/pt-BR/common/footer.html");
  $("#sectionHome").load("html/pt-BR/components/home.html");
  $("#sectionAbout").load("html/pt-BR/components/about.html");
  $("#sectionServices").load("html/pt-BR/components/services.html");
  $("#sectionGallery").load("html/pt-BR/components/gallery.html");
  $("#sectionRecommends").load("html/pt-BR/components/recommendations.html");
  $("#sectionContact").load("html/pt-BR/components/contact.html", validateContactFormTwo);
}

function addHTMLen() {
  $('html').attr('lang', 'en');
  $("#header").load("html/en-US/common/header.html");
  $("#footer").load("html/en-US/common/footer.html");
  $("#sectionHome").load("html/en-US/components/home.html");
  $("#sectionAbout").load("html/en-US/components/about.html");
  $("#sectionServices").load("html/en-US/components/services.html");
  $("#sectionGallery").load("html/en-US/components/gallery.html");
  $("#sectionRecommends").load("html/en-US/components/recommendations.html");
  $("#sectionContact").load("html/en-US/components/contact.html", validateContactForm);
}
////////////////////////////////////////////////////////////////////////////////////////
//////////////// SET LANGUAGE


function collapseMenu() {

  if ($(window).width() > 991) {
    $('body').addClass('menu-collapsed');
  }

  $(".collapse").click(function () {
    $("body").toggleClass("menu-collapsed");
  });
}

function menuScrollspy() {
  $(window).bind("scroll", function () {
    var currentTop = $(window).scrollTop();
    var elems = $(".bloco");
    elems.each(function (index) {
      var elemTop = $(this).offset().top - 100;
      var elemBottom = elemTop + $(this).height();
      if (currentTop >= elemTop && currentTop <= elemBottom) {
        var id = $(this).attr("id");
        var navElem = $('a[href="#' + id + '"]');
        navElem
          .addClass("active")
          .parent()
          .siblings()
          .find("a")
          .removeClass("active");
      }
    });
  });
}

function discoverButton() {
  $("#discover").on("click", function () {
    $(this).addClass("active");

    function removeClass() {
      $("#discover").removeClass("active");
      window.open("https://www.behance.net/mrwsantos");
    }

    setTimeout(removeClass, 2500);
  });
}

function hideHeaderOnInputFocus() {
  //INPUTS FOCADOS O HEADER MOBILE SOME
  $("form input, form textarea").focus(function () {
    $('.header.mobile').addClass('hide');
  });
  $("form input, form textarea").focusout(function () {
    $('.header.mobile').removeClass('hide');
  });

}

function toggleMode() {
  var toggleSwitch = document.querySelector('.label input[type="checkbox"]');
  var currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "light") {
      toggleSwitch.checked = true;
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }

  toggleSwitch.addEventListener("change", switchTheme, false);
}

function galleryColoured() {
  if ($(window).width() >= 768) {
    setInterval(function () {
      var $foto = $("#myTabContent");

      if ($("#myTabContent:hover").length > 0) {
        $foto.find("img:hover").addClass("hovered");
      } else {
        $foto.find("img:not(hover)").removeClass("hovered");
      }
    }, 200);
  }
}

function lightbox() {
  var gallery1 = $('#logos .aria a').simpleLightbox();
  var gallery5 = $('#websites .aria a').simpleLightbox();
  var gallery2 = $('#drawings .aria a').simpleLightbox();
  var gallery3 = $('#low-poly .aria a').simpleLightbox();
  // var gallery4 = $('#photography .aria a').simpleLightbox();
}