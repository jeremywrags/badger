/**
* Template Name: Mamba - v2.4.0
* Template URL: https://bootstrapmade.com/mamba-one-page-bootstrap-template-free/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  const actionMappingClicks = {};
  
  
  //Get all links and push them into the action mapping object use this section to debug the auto link mapping in evergage
  //var linksToMap = Array.from(document.querySelectorAll('[id^="Link"]')).concat(Array.from(document.querySelectorAll('[id^="InterestIn"]')));  
  /*var linksToMap = document.querySelectorAll('[caption]');
  for(var i = 0; i < linksToMap.length; i++){
      if(linksToMap[i].getAttribute("caption")){
        actionMappingClicks[linksToMap[i].getAttribute("caption")] = "#" + linksToMap[i].id;          
      }
      else
        console.log(linksToMap[i].id + " has no caption value")
      
        console.log(linksToMap[i].id + " : " + linksToMap[i].getAttribute("caption")) 
  }    
  */
    // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });

  
  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 2;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);      
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }
       
        $('html, body').animate({
          scrollTop: scrollto
        }, 1000, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  $(document).ready(function() {

    //Let's load the cart
    var cart = loadCart();
    
    //Let's handle adding an item to the cart
    $(document).on("click", "#btnAddToCart", function(){
      //Let's convert the cost & qty
      var cost = $("#productPrice").text();        
      cost = parseFloat(cost.substring(1, cost.length-1));
      var quantity = parseInt($("#productQuantity").val());

      //Push the item into the current cart Items.
      cart.items.push({
        'itemID': $("#productID").val(),
        'itemName': $("#productName").text(),
        'itemPrice': cost,
        'quantity' : quantity,
        'category' : $("#productCategory").val(),
        'img' : $("#productImage").attr("src")        
      });
      //Update the cart to account for the new items.
      cart.cartItemCount = parseInt(cart.cartItemCount) + parseInt(quantity);
      cart.cartTotal = (parseFloat(cart.cartTotal) + (quantity * cost)).toFixed(2);        
      
      //overwrite the current cart
      localStorage.setItem("cart", JSON.stringify(cart));

      //reload the cart to that we can update the site
      cart = loadCart();
    })
  })

  
  

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {    
    var cur_pos = $(this).scrollTop() + 200;    
    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Intro carousel
  var heroCarousel = $("#heroCarousel");
  var heroCarouselIndicators = $("#hero-carousel-indicators");
  heroCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
    (index === 0) ?
    heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "' class='active'></li>"):
      heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "'></li>");
  });

  heroCarousel.on('slid.bs.carousel', function(e) {
    $(this).find('h2').addClass('animate__animated animate__fadeInDown');
    $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the venobox plugin
  $(window).on('load', function() {
    $('.venobox').venobox();
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });
    

    $("#newsletterForm").submit(function(e){
      e.preventDefault();
      var values = {};
      $.each($('#newsletterForm').serializeArray(), function(i, field) {
        values[field.name] = field.value;
      });

      alert(values.email)
      Evergage.sendEvent({
        action: "Email Submit",
        attributes: {
            userId: values.email
        }
    });
      
    })

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');      
      $(this).addClass('filter-active');
            
      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    
    $('#productMenu li').on('click', function(e) {
      e.stopPropagation();
      //e.preventDefault();
      var link = this.id.split("_")[1];
      
      $("#portfolio-flters li").removeClass('filter-active');
      $("#Link_Filter_" + this.id.split("_")[1]).parent().addClass('filter-active');
        console.log("data Filter: " + $(this).data('filter'))
      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function loadCart(){
  //check local storage for a cart    
  var loaclCart = localStorage.getItem("cart");
  if(loaclCart){
    //Cart Exists, lets convert it into an object
    loaclCart = JSON.parse(loaclCart);         

    //Lets log the cart to help debugging
    console.log(loaclCart);
  }
  else
  {
    loaclCart = {
      cartID : randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      items: [],
      cartTotal : 0,
      cartItemCount : 0
    }
    localStorage.setItem("cart", JSON.stringify(loaclCart));
  }

  //we need to update the cart indicators on the site
  $("#cartItems_header").html(loaclCart.cartItemCount);
  $("#cartTotal_header").html(loaclCart.cartTotal);  
  return loaclCart;       
}