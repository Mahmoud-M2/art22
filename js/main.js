/*---------------------------------------------------------------------------------
/*
/* Main JS
/*
-----------------------------------------------------------------------------------*/  

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*----------------------------------------------------*/
  	/* Flexslider
  	/*----------------------------------------------------*/
  	$(window).load(function() {

	  	$('#hero-slider').flexslider({
	   	namespace: "flex-",
	      controlsContainer: ".hero-container",
	      animation: 'fade',
	      controlNav: true,
	      directionNav: false,
	      smoothHeight: true,
	      slideshowSpeed: 7000,
	      animationSpeed: 600,
	      randomize: false,
	      before: function(slider){
			   $(slider).find(".animated").each(function(){
			   	$(this).removeAttr("class");
			  	});			  	
			},
			start: function(slider){
			   $(slider).find(".flex-active-slide")
			           	.find("h1").addClass("animated fadeInDown show")
			           	.next().addClass("animated fadeInUp show");
			           		
			   $(window).trigger('resize');		  			 
			},
			after: function(slider){
			 	$(slider).find(".flex-active-slide")
			           	.find("h1").addClass("animated fadeInDown show")
			           	.next().addClass("animated fadeInUp show");			  
			}
	   });

	   $('#testimonial-slider').flexslider({
	   	namespace: "flex-",
	      controlsContainer: "",
	      animation: 'slide',
	      controlNav: true,
	      directionNav: false,
	      smoothHeight: true,
	      slideshowSpeed: 7000,
	      animationSpeed: 600,
	      randomize: false,
	   });

   });


   /*----------------------------------------------------*/
	/* Adjust Primary Navigation Background Opacity
	------------------------------------------------------*/
   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var header = $('#main-header');

	   if ((y > h + 30 ) && ($(window).outerWidth() > 768 ) ) {
	      header.addClass('opaque');	      
	   }
      else {
         if (y < h + 30) {
            header.removeClass('opaque');
         }
         else {
            header.addClass('opaque');
         }
      }

	});


   /*----------------------------------------------------*/
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------*/
	var sections = $("section"),
	navigation_links = $("#nav-wrap a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'

	});


   /*----------------------------------------------------*/
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#hero-slider h1').fitText(1, { minFontSize: '30px', maxFontSize: '49px' });

  	}, 100);


  	/*-----------------------------------------------------*/
  	/* Mobile Menu
   ------------------------------------------------------ */  
   var menu_icon = $("<span class='menu-icon'>Menu</span>");
  	var toggle_button = $("<a>", {                         
                        id: "toggle-btn", 
                        html : "",
                        title: "Menu",
                        href : "#" } 
                        );
  	var nav_wrap = $('nav#nav-wrap')
  	var nav = $("ul#nav");  
   
   /* if JS is enabled, remove the two a.mobile-btns 
  	and dynamically prepend a.toggle-btn to #nav-wrap */
  	nav_wrap.find('a.mobile-btn').remove(); 
  	toggle_button.append(menu_icon); 
   nav_wrap.prepend(toggle_button); 

  	toggle_button.on("click", function(e) {
   	e.preventDefault();
    	nav.slideToggle("fast");     
  	});

  	if (toggle_button.is(':visible')) nav.addClass('mobile');
  	$(window).resize(function() {
   	if (toggle_button.is(':visible')) nav.addClass('mobile');
    	else nav.removeClass('mobile');
  	});

  	$('ul#nav li a').on("click", function() {      
   	if (nav.hasClass('mobile')) nav.fadeOut('fast');      
  	});


  	/*----------------------------------------------------*/
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 300,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


   /*----------------------------------------------------*/
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */  	 
	$('input, textarea').placeholder()  

   
	/*----------------------------------------------------*/
	/*	contact form
	------------------------------------------------------*/

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});
	

})(jQuery);



// section papper

	(function () {
		var div = document.createElement('div');
		div.style.width = '100px';
		div.style.height = '100px';
		div.style.overflow = 'scroll';
		div.style.position = 'absolute';
		div.style.top = '-9999px';
		document.body.appendChild(div);
	  
		var scrollBarWidth = div.offsetWidth - div.clientWidth;
	  
		document.body.removeChild(div);
	  
		var style = document.createElement('style');
		document.querySelector('head').appendChild(style);
	  
		var selector = '.panel-content';
		var rule = `padding-right: ${scrollBarWidth}px`;
	  
		if (style.sheet) {
		  if (style.sheet.insertRule) style.sheet.insertRule(`${selector} {${rule}}`, 0);
		  else style.sheet.addRule(selector, rule);
		}
		else if (style.styleSheet) style.styleSheet.addRule(selector, rule);
	  })();
	  
	  // Each articulation panel consists of three DOM elements
	  //  - a grandparent for 3d positioning
	  //  - a parent for clipping
	  //  - and a child to hold and 'scroll' content via changing transforms
	  function panel(html) {
		var panelNode = document.createElement('div');
		var panelCutoutNode = document.createElement('div');
		var panelContentNode = document.createElement('div');
		  
		panelNode.classList.add('panel-node');
		
		panelCutoutNode.classList.add('panel-cutout');
		
		panelContentNode.innerHTML = html;
		panelContentNode.classList.add('panel-content');
		
		panelCutoutNode.appendChild(panelContentNode);
		panelNode.appendChild(panelCutoutNode);
		
		return panelNode;
	  }
	  
	  // Keep the content panels in sync by translating them up or down according to the scroll distance
	  function syncPanelContent(tops, bottoms, scrollTop, containerHeight, panelHeight) {
		for (var i = 0; i < tops.length; i++) {
		  var t = tops[i];
		  var b = bottoms[i];
		  var tTop = (i + 1) * panelHeight - scrollTop;
		  var bTop = -i * panelHeight - scrollTop - containerHeight;
		  t.style.transform = `translate3d(0,${tTop}px,0)`;
		  b.style.transform = `translate3d(0,${bTop}px,0)`;
		}
	  }
	  
	  function transYrotX(y,x) {
		return `translate3d(0,${y}px,0) rotateX(${x}rad)`;
	  }
	  
	  // Create num top and bottom panels based off the innerHTML of el with articulation angle.
	  // We nest panels and use `transform-style: preserve-3d` to get the tentacle curl effect.
	  // Should probably only use this on relatively simple el's, because we are going to need to create 2 * num deep copies of el and attach them to the DOM. Needless to say, this will scale poorly.
	  function createScrollOverlay(el, panelHeight, num, angle) {
		var tops = [];
		var bottoms = [];
	  
		var topParent = el.parentNode;
		var bottomParent = el.parentNode;
	  
		var html = el.innerHTML;
		
		var totalTheta = 0;
		
		for (var i = 0; i < num; i++) {
		  var topPanel = panel(html);
		  var bottomPanel = panel(html);
	  
		  topPanel.style.height = `${panelHeight}px`;
		  bottomPanel.style.height = `${panelHeight}px`;
		  topPanel.style.transformOrigin = '50% 100% 0';
		  bottomPanel.style.transformOrigin = '50% 0% 0';
		  
		  var topPanelContent = topPanel.querySelector('.panel-content');
		  var bottomPanelContent = bottomPanel.querySelector('.panel-content');
	  
		  if (i === 0) {
			topPanel.style.transform = transYrotX(-panelHeight, 0);
			bottomPanel.style.top = '100%';
			bottomPanel.style.transform = transYrotX(0, 0);
		  }
		  else {
			topPanel.style.transform = transYrotX(-panelHeight + 0.25, angle);
			bottomPanel.style.transform = transYrotX(panelHeight - 0.25, angle);
	  
			totalTheta += angle;
			totalTheta %= 2 * Math.PI;
			if (Math.PI * (1 / 2) < totalTheta && totalTheta < Math.PI * (3 / 2)) {
			  topPanelContent.classList.add('backface');
			  bottomPanelContent.classList.add('backface');
			}
		  }
	  
		  angle += 0.025;
	  
		  tops.push(topPanelContent);
		  bottoms.push(bottomPanelContent);
	  
		  topParent.appendChild(topPanel);
		  bottomParent.appendChild(bottomPanel);
	  
		  topParent = topPanel;
		  bottomParent = bottomPanel;
		}
	  
		syncPanelContent(tops, bottoms, 0, container.clientHeight, panelHeight);
	  
		function update() {
		  var scrollTop = el.scrollTop;
		  var containerHeight = container.clientHeight;
		  requestAnimationFrame(function() {
			syncPanelContent(tops, bottoms, scrollTop, containerHeight, panelHeight);
		  });
		}
	  
		el.onscroll = update;
		window.onresize = update;
		
		// setInterval(function() {el.scrollTop++}, 32)
	  }
	  
	  var theta = 0.3;
	  var num = 20;
	  if (/iPhone|Android/.test(navigator.userAgent)) {
		theta = 0.45;
		num = 10;
	  }
	  
	  var $ = document.querySelector.bind(document);
	  createScrollOverlay($('#content'), 20, num, theta);
	  



	  let items = document.querySelectorAll('.gallery .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showgallery();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showgallery();
}
// gallery
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showgallery(){
    // remove item active old
    let itemActiveOld = document.querySelector('.gallery .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run gallery
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showgallery();
    })
})




// video hidden
let container2 = document.querySelector(".container2");
	let vid = document.querySelector("#vid");
	let butn = document.querySelector(".button2");
butn.onclick = function(){
	container2.style.display = 'none';
	vid.style.display = 'flex';
	vid.muted = false;
        vid.play().catch((error) => {
            console.log('Autoplay was prevented:', error);
        });
}



