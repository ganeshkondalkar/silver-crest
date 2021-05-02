(function($, window, undefined){

	'use strict';

	var SiteRenewal = {
		// March 31st, 2021 - is the date to renew.
		expiryDate: new Date(2022, 2, 31),
		isRenewalRequired: function(){
			if( SiteRenewal.expiryDate < new Date() ){
				return true;
			} else {
				return false;
			}
		}
	};

	// cached DOM nodes.
	var DOM = {
		$body: $('body'),
		$window: $(window),
		$owlCarousel: null,
		$prevArr: null, // carousel left arrow
		$nextArr: null, // carousel right arrow
		// cache these variables when Parallex inits first time.
		$homeBG: null,
		$homeContent: null,
		$projectBG: null,
		$workProgressBG: null,
		$nav: null,
		$contactUs: null,
		$contactUsArr: null,
		// NOTE: API KEY - Registered for domain + localhost.
		apiKey: "AIzaSyAcqfYV7AdBg4OJwhEc1woPuA_25AyaQvs",
		wipSliderOptions: {
			carousel: '#wip-carousel',
			prevArr: '.wip-control-prev',
			nextArr: '.wip-control-next',
			pagination: '.wip-pagination',
			numOfSlides: 1
		},
		projectPlanSliderOptions: {
			carousel: '#plan-carousel',
			prevArr: '.plan-control-prev',
			nextArr: '.plan-control-next',
			pagination: '.plan-pagination',
			numOfSlides: 1
		},
		floorPlanData: [
			{
				title: 'Stilt floor plan',
				imgSrc: 'img/floor-plan/img-floor-plan-01.jpg'
			},
			{
				title: '1st, 3rd, 5th, 7th &amp; 9th floor plan',
				imgSrc: 'img/floor-plan/img-floor-plan-02.jpg'
			},
			{
				title: '2nd, 4th, 6th &amp; 8th floor plan',
				imgSrc: 'img/floor-plan/img-floor-plan-03.jpg'
			},
			{
				title: '10th floor plan',
				imgSrc: 'img/floor-plan/img-floor-plan-04.jpg'
			},
			{
				title: '11th floor plan',
				imgSrc: 'img/floor-plan/img-floor-plan-05.jpg'
			},
			{
				title: '12th floor plan',
				imgSrc: 'img/floor-plan/img-floor-plan-06.jpg'
			},
			{
				title: '13th floor plan',
				imgSrc: 'img/floor-plan/img-floor-plan-07.jpg'
			},
			{
				title: '14th floor plan',
				imgSrc: 'img/floor-plan/img-floor-plan-08.jpg'
			},
			{
				title: '15th floor plan',
				imgSrc: 'img/floor-plan/img-floor-plan-09.jpg'
			}
		],
		workProgressData: [
			{
				title: "Completion of Ninth Slab - March 2021",
				imgSrc: [
					{
						imgIndex: 0,
						title: 'Completion of Ninth Slab (Front View)',
						imgSrc: 'img/wip/completion-of-ninth-slab/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 1,
						title: 'Completion of Ninth Slab (Side View)',
						imgSrc: 'img/wip/completion-of-ninth-slab/img-work-in-progress-02.jpg'
					}
				]
			},
			{
				title: "Completion of Eighth Slab - February 2021",
				imgSrc: [
					{
						imgIndex: 0,
						title: 'Completion of Eighth Slab (Front View)',
						imgSrc: 'img/wip/completion-of-eighth-slab/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 1,
						title: 'Completion of Eighth Slab (Side View)',
						imgSrc: 'img/wip/completion-of-eighth-slab/img-work-in-progress-02.jpg'
					}
				]
			},
			{
				title: "Completion of Seventh Slab - January 2021",
				imgSrc: [
					{
						imgIndex: 0,
						title: 'Completion of Seventh Slab (Side View)',
						imgSrc: 'img/wip/completion-of-seventh-slab/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 1,
						title: 'Completion of Seventh Slab (Side View)',
						imgSrc: 'img/wip/completion-of-seventh-slab/img-work-in-progress-02.jpg'
					}
				]
			},
			{
				title: "Completion of Sixth Slab - February 2020",
				imgSrc: [
					{
						imgIndex: 0,
						title: 'Completion of Sixth Slab (Side View)',
						imgSrc: 'img/wip/completion-of-sixth-slab/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 1,
						title: 'Completion of Sixth Slab (Front View)',
						imgSrc: 'img/wip/completion-of-sixth-slab/img-work-in-progress-02.jpg'
					}
				]
			},
			{
				title: "Completion of Fifth Slab - January 2020",
				imgSrc: [
					{
						imgIndex: 0,
						title: 'Completion of Fifth Slab (Side View)',
						imgSrc: 'img/wip/completion-of-fifth-slab/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 1,
						title: 'Completion of Fifth Slab (Front View)',
						imgSrc: 'img/wip/completion-of-fifth-slab/img-work-in-progress-02.jpg'
					}
				]
			},
			{
				title: "Completion of Fourth Slab - December 2019",
				imgSrc: [
					{
						imgIndex: 0,
						title: 'Completion of Fourth Slab (Side View)',
						imgSrc: 'img/wip/completion-of-fourth-slab/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 1,
						title: 'Completion of Fourth Slab (Front View)',
						imgSrc: 'img/wip/completion-of-fourth-slab/img-work-in-progress-02.jpg'
					}
				]
			},
			{
				title: "Completion of Third Slab - November 2019",
				imgSrc: [
					{
						imgIndex: 0,
						title: 'Completion of Third Slab (Side View)',
						imgSrc: 'img/wip/completion-of-third-slab/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 1,
						title: 'Completion of Third Slab (Front View)',
						imgSrc: 'img/wip/completion-of-third-slab/img-work-in-progress-02.jpg'
					}
				]
			},
			{
				title: "Completion of Second Slab - October 2019",
				imgSrc: [
					{
						imgIndex: 0,
						title: 'Completion of Second Slab (Side View)',
						imgSrc: 'img/wip/completion-of-second-slab/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 1,
						title: 'Completion of Second Slab (Front View)',
						imgSrc: 'img/wip/completion-of-second-slab/img-work-in-progress-02.jpg'
					}
				]
			},
			{
				title: "Completion of First Slab - September 2019",
				imgSrc: [
					{
						imgIndex: 0,
						title: 'Completion of First Slab (Side View)',
						imgSrc: 'img/wip/completion-of-first-slab/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 1,
						title: 'Completion of First Slab (Front View)',
						imgSrc: 'img/wip/completion-of-first-slab/img-work-in-progress-02.jpg'
					}
				]
			},
			{
				title: "Completion of Plinth level",
				imgSrc: [
					{
						imgIndex: 0,
						title: 'Completion of Plinth level',
						imgSrc: 'img/wip/completion-of-plinth-level/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 1,
						title: 'Completion of Plinth level',
						imgSrc: 'img/wip/completion-of-plinth-level/img-work-in-progress-02.jpg'
					},
					{
						imgIndex: 2,
						title: 'Plinth Completion Certificate',
						imgSrc: 'img/wip/completion-of-plinth-level/img-work-in-progress-03.jpg'
					}
				]
			},
			{
				title: "Commencement of Work",
				imgSrc: [
					{
						imgIndex: 3,
						title: 'Commencement of Work',
						imgSrc: 'img/wip/commencement-of-work/img-work-in-progress-01.jpg'
					},
					{
						imgIndex: 4,
						title: 'Commencement of Work',
						imgSrc: 'img/wip/commencement-of-work/img-work-in-progress-02.jpg'
					},
					{
						imgIndex: 5,
						title: 'Commencement of Work',
						imgSrc: 'img/wip/commencement-of-work/img-work-in-progress-03.jpg'
					}
				]
			}
		]
	};

	// parallax module kept separate, for modularity.
	var Parallax = {

		workProgressSlide: function(pos) {
			DOM.$workProgressBG = DOM.$workProgressBG ? DOM.$workProgressBG : $('.work-progress-parallax-bg');
			var bgPos,
				slidePos = DOM.$workProgressBG.offset().top,
				newPos = Math.round( - (slidePos - pos) * 0.35);

			bgPos = 'center ' + (- newPos) + 'px';
			DOM.$workProgressBG.css({'background-position': bgPos});
		},

		projectSlide: function(pos) {
			DOM.$projectBG = DOM.$projectBG ? DOM.$projectBG : $('.project-parallax-bg');
			var bgPos,
				slidePos = DOM.$projectBG.offset().top,
				newPos = Math.round( - (slidePos - pos) * 0.35);

			bgPos = 'center ' + (- newPos) + 'px';
			DOM.$projectBG.css({'background-position': bgPos});
		},

		homeSlide: function(pos){
			var bgPos, contentPos;

			DOM.$homeBG = DOM.$homeBG || $('.home-parallax-bg');
			DOM.$homeContent = DOM.$homeContent || $('.home-parallax-content');

			bgPos = 'center -' + (pos * 0.5) + 'px';
			contentPos = (pos * 0.75) + 'px';

			DOM.$homeBG.css({'background-position': bgPos});
			DOM.$homeContent.css({'top': contentPos});
		},

		onWindowScroll: function(evt){
			var scrollPos = DOM.$window.scrollTop();
			Parallax.homeSlide(scrollPos);
			Parallax.projectSlide(scrollPos);
			Parallax.workProgressSlide(scrollPos);
		},

		init: function(){
			DOM.$window.on('scroll', Parallax.onWindowScroll);
		}
	};

	var Carousel = {
		init: function (options){
			var $carousel = $(options.carousel),
				currPage = $('body');
			DOM.$prevArr = $(options.prevArr);
			DOM.$nextArr = $(options.nextArr);

			$carousel.on('jcarousel:create jcarousel:reload', function () {
	            var carousel = $(this),
	                width = carousel.innerWidth();

	            if (width >= 600) {
	                width = width / options.numOfSlides;
	            } else if (width >= 350) {
	                width = width / 1;
	            }

	            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
	        }).jcarousel({ wrap: 'circular' });

	        if( currPage.hasClass('floor-plan-page') || currPage.hasClass('wip-page') ) {
				// on scrollend event: show the title of the currSlide in Modal.
				$carousel.on('jcarousel:scrollend', function(evt, carousel){
	        		var title = $(carousel._fullyvisible).find("img").attr("alt");
	        		$("#full-screen-modal").find(".modal-title").text(title);
	        	});
			} else {
				$carousel.jcarouselAutoscroll({autoStart: true, interval: 1500});
			}

	        DOM.$prevArr.jcarouselControl({ target: '-=1' });
			DOM.$nextArr.jcarouselControl({ target: '+=1' });

	        // align the carousel arrows based on slider position.
	        Carousel.alignCarouselArrows($carousel);

			$(options.pagination).on('jcarouselpagination:active', 'a', function() {
	            $(this).addClass('active');
	        })
	        .on('jcarouselpagination:inactive', 'a', function() {
	            $(this).removeClass('active');
	        })
	        .on('click', function(e) {
	            e.preventDefault();
	        })
	        .jcarouselPagination({
	            perPage: 1,
	            item: function(page) {
	                return '<a href="#' + page + '">' + page + '</a>';
	            }
	        });
		},

		alignCarouselArrows: function($carousel){
			var arrWidth = 58,
				$carouselWidth = $carousel.width(),
				$carouselPos = $carousel.offset(),
				currPage = $('body');

			if( currPage.hasClass('floor-plan-page') || currPage.hasClass('wip-page') ){
		        DOM.$prevArr.css({left: '20px'});
		        DOM.$nextArr.css({right: '20px'});
			} else {
				// align the left & right arrow dynamically, based on carousel's position.
		        DOM.$prevArr.css({left: ($carouselPos.left - arrWidth - 20) + 'px'});
		        DOM.$nextArr.css({left: ($carouselWidth + $carouselPos.left + 20) + 'px'});
			}

		},

		// in floor-plan page: when modal open, reload it to re-adjust the carousel.
		reloadOnModalOpen: function($carousel, slideIndex){
			$carousel.jcarousel('reload', {animation: 'slow'});

			setTimeout(function(){
				$carousel.jcarousel('scroll', slideIndex);
			}, 300);

			Carousel.bindKeyboardEvents($carousel);
		},

		// FloorPlan page: Carousel should be scrolled with keyboard left/right keys.
		bindKeyboardEvents: function($carousel){
			$('#full-screen-modal').off('keyup').on('keyup', function(evt){
				var direction = null;
				//             leftArrow = 37                 rightArrow = 39
				direction = (evt.keyCode === 37) ? '-=1' : (evt.keyCode === 39) ? '+=1' : null;

				// only if the left/right key is pressed.
				if(direction){
					$carousel.jcarousel('scroll', direction);
				}

			});
		},

		// initialize the slider inside the modal.
		initOnModal: function(options){
			Carousel.init(options);

			// bind carousel arrow positioning on window resize.
			DOM.$window.on('resize', function(){
				Carousel.alignCarouselArrows( $(options.carousel) );
			});
		}
	};

	var GMap = {
		mapElem: document.getElementById("gmap"),
		loadHTML: function(){
			var tmpl = "<div class=\"contact-us\">" +
				"<div class=\"content\">" +
					"<h5>Contact Us</h5>" +
					"<p><strong>Corporate Address: </strong>" +
						"1102, The Landmark, Sector-7, Kharghar, Navi Mumbai - 410210.</p>" +
					"<p><strong>Site Address: </strong>" +
						"The Silver Crest, Plot No. 27 &amp; 28, Sector 2, Taloje Panchanand, Navi Mumbai.</p>" +
					"<p><strong>Phone: </strong>+91 98201 22183 " +
						"<strong>Email: </strong>hitechultrahomes@gmail.com</p>" +
				"</div>" +
				"<span id=\"arr-link\" class=\"glyphicon glyphicon-chevron-left\"></span>" + 
			"</div>";

			$(GMap.mapElem).append(tmpl);
			DOM.$contactUs = $('body').find('.contact-us');
			DOM.$contactUsArr = DOM.$contactUs.find('#arr-link');
			DOM.$contactUsContent = DOM.$contactUs.find('.content');

			DOM.$contactUsArr.on('click', function(evt){
				var $this = $(this),
					// cache height before hiding.
					height = DOM.$contactUs.height(),
					timer = 200;

				if($this.hasClass('glyphicon-chevron-left')) {
					DOM.$contactUs.height( height );
					DOM.$contactUsContent.hide( timer );
					DOM.$contactUs.animate({'width': '50px'}, function(){
						$this.addClass('glyphicon-chevron-right').removeClass('glyphicon-chevron-left');
					});
				} else {
					// DOM.$contactUs.height('auto');
					DOM.$contactUs.animate({'width': '52%'}, function(){
						DOM.$contactUsContent.show( timer );
						$this.addClass('glyphicon-chevron-left').removeClass('glyphicon-chevron-right');
					});
				}

			});
		},

		loadGmapScript: function(){
			window.initGoogleMaps = GMap.init;
			GMap.mapElem = document.getElementById("gmap-row");
			var url = "//maps.googleapis.com/maps/api/js?callback=initGoogleMaps&key=" + DOM.apiKey;
			
			$.getScript(url, function(){
				GMap.loadHTML();
			});
		},
		init: function(){
			var map,
				bounds = new google.maps.LatLngBounds(),
				mapOptions = { mapTypeId: "roadmap" },
				mapContainer = GMap.mapElem;

			// display map on page
			map = new google.maps.Map( mapContainer, mapOptions );

			// set height of the container
			mapContainer.style.height = "400px";

			// multiple markers
			var markers = [
				['Corporate Office, Hi-tech Ultra Homes', 19.0332142, 73.0665171],
				['The Silver Crest, Taloje', 19.080989, 73.089466]
			];

			// info window content
			var infoWindowContent = [
		        ['<div class="info_content">' +
		        '<h3>Hi-tech Ultra Homes,</h3>' +
		        '<p>Corporate Office,<br>1102, The Landmark, Sector-7, Kharghar, Navi Mumbai, Maharashtra 410210</p>' + '</div>'],
		        ['<div class="info_content">' +
		        '<h3>The Silver Crest</h3>' +
		        '<p>Plot No. 27 &amp; 28, Sector 2, Taloje Panchanand, Navi Mumbai</p>' + '</div>']
		    ];

		    // Display multiple markers on a map
		    var infoWindow = new google.maps.InfoWindow(),
		    	marker,
		    	i;
		    
		    // Loop through our array of markers & place each one on the map  
		    for( i = 0; i < markers.length; i++ ) {
		        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
		        bounds.extend(position);
		        marker = new google.maps.Marker({
		            position: position,
		            map: map,
		            title: markers[i][0]
		        });
        
		        // Allow each marker to have an info window    
		        google.maps.event.addListener(marker, 'click', (function(marker, i) {
		            return function() {
		                infoWindow.setContent(infoWindowContent[i][0]);
		                infoWindow.open(map, marker);
		            }
		        })(marker, i));

		        // Automatically center the map fitting all markers on the screen
		        map.fitBounds(bounds);
		    }

		    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
		    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
		        this.setZoom(14);
		        google.maps.event.removeListener(boundsListener);
		    });
		}
	};

	var ScrollSpy = {
		initBodyScroll: function(pos){
			$('html, body').animate({ scrollTop: pos }, 800);
		},

		navClickListener: function(evt){
			evt.preventDefault();

			var $this = $(this),
				$navList = DOM.$nav.find('.nav-list'),
				target = $this.attr("href"),
				indexPage = "index.html",
				pos;

			// if we are on FloorPlan/WIP Page
			// and click on HOME, in nav then move to index.html
			if( target.indexOf('.html') > -1 ){
				location.pathname = indexPage;
				return;
			} else {
				pos = $( target ).offset().top;
				DOM.$nav.find('.active-menu').text( $this.text() );

				$navList.hide(300);
				setTimeout(function(){
					$navList.removeAttr('style');
				}, 1000);
				
				ScrollSpy.initBodyScroll(pos);
			}

		},

		init: function(){
	    	DOM.$nav = $("#nav-bar");
	    	DOM.$nav.on("click", "a", ScrollSpy.navClickListener);
	    }
	};

	var Site = {
		// common components in all pages.
		initCommonComponents: function(){
			ScrollSpy.init();

			// Disclaimer - content animation on read-more click
			$('.disclaimer-link').on('click', function(evt){
				evt.preventDefault();

				var $this = $(this);

				$this.hide(300).siblings('.small-text').hide(500, function(){
					$this.siblings('.large-text').show(500).removeClass('hidden');
				});
			});

			GMap.loadGmapScript();
		},

		// index.html - page
		initIndexPage: function(){
			ScrollSpy.init();

			var deviceWidth = DOM.$window[0].screen.width;

			// Parallax is not required in Tablet/Mobile devices.
			if(deviceWidth > 767) {
				Parallax.init();
			}

			// PROJECT PLAN CAROUSEL.
			Site.initProjectPlanCarousel();

			// project-info - content animation on read-more click
			$('.read-more-link').on('click', function(evt){
				evt.preventDefault();

				var $this = $(this);

				$this.hide(500).closest('.project-info').animate({height: 400}, function(){
					$this.siblings('.extra-content').fadeIn(500).removeClass('hidden');
				});
			});

			Site.initCommonComponents();
		},

		initProjectPlanCarousel: function(){
			Carousel.initOnModal(DOM.projectPlanSliderOptions);
		},

		// floor-plan.html - page
		initFloorPlanPage: function(){
			Site.initCommonComponents();
			Site.loadFloorPlanContent();
			// PROJECT PLAN CAROUSEL.
			Site.initProjectPlanCarousel();
			// on modal open event, re-adjust carousel & slide to the respective img.
			$('#full-screen-modal').on('shown.bs.modal', function(evt){
				var $currSlide = $(evt.relatedTarget),
					slideIndex = $currSlide.data("index");

				Carousel.reloadOnModalOpen( $(DOM.projectPlanSliderOptions.carousel), slideIndex );
			});
		},

		initWipCarousel: function(){
			Carousel.initOnModal(DOM.wipSliderOptions);
		},

		// work-in-progress.html - page
		initWorkProgressPage: function(){
			Site.initCommonComponents();
			Site.loadWorkProgressContent();

			// $('#full-screen-modal .carousel-wrapper').height( DOM.$window.height() - 130 );
			$('#full-screen-modal .carousel-wrapper .img-thumbnail').height( DOM.$window.height() - 130 );
			// WIP CAROUSEL.
			Site.initWipCarousel();

			// on modal open event, re-adjust carousel & slide to the respective img.
			$('#full-screen-modal').on('shown.bs.modal', function(evt){
				var $currSlide = $(evt.relatedTarget),
					slideIndex = $currSlide.data("index");

				Carousel.reloadOnModalOpen( $(DOM.wipSliderOptions.carousel), slideIndex );
			});
		},

		// load floor-plan-page content.
		loadFloorPlanContent: function(){
			var markup = '',
				modalMarkup = '';

			DOM.floorPlanData.forEach(function(item, index){
				markup += Site.getFloorPlanTemplate(item.title, item.imgSrc, index);
				modalMarkup += Site.getFloorPlanModalTemplate(item.title, item.imgSrc);
			});

			// markup for rows in floor-plan page.
			$('#floor-plan-container').html(markup);
			// markup for Modal slides <LI> tags
			$('#plan-carousel ul').html(modalMarkup);
		},

		// floor-plan page - row template
		getFloorPlanTemplate: function(title, imgSrc, index){
			return '<div class="col-xs-12 floor-plan-row">' +
				'<div class="container" data-toggle="modal" data-target="#full-screen-modal" data-index="' + index + '">' +
					'<h4>' + title + '</h4>' +
					'<img class="img-responsive" src="' + imgSrc + '" alt="' + title + '">' +
				'</div>' +
			'</div>'
		},

		// floor-plan page - Modal Slide template
		getFloorPlanModalTemplate: function(title, imgSrc){
			return '<li style="width: 1200px;">' +
				'<img class="img-responsive" src="' + imgSrc + '" alt="' + title + '" />' +
			'</li>'
		},

		// load work-progress-page content.
		loadWorkProgressContent: function(){
			var markup = '',
				modalMarkup = '';

			DOM.workProgressData.forEach(function(item){
				var imagesRows = '',
					numOfColumns = item.imgSrc.length;

				item.imgSrc.forEach(function(imgItem){
					imagesRows += Site.getWorkProgressIMGTemplate(imgItem.title, imgItem.imgSrc, imgItem.imgIndex, numOfColumns);
					modalMarkup += Site.getWIPPlanModalTemplate(imgItem.title, imgItem.imgSrc, imgItem.imgIndex);
				});
				
				markup += Site.getWorkProgressTemplate(item.title, imagesRows);
			});

			// markup for rows in floor-plan page.
			$('#wip-container').html(markup);
			// markup for Modal slides <LI> tags
			$('#wip-carousel ul').html(modalMarkup);
		},

		getWorkProgressTemplate: function(title, imageRowsHTML){
			return '<div class="col-xs-12 wip-row">' +
				'<div class="container">' +
					'<div class="col-md-12">' +
						'<h4>' + title + '</h4>' +
					'</div>' + 
					imageRowsHTML +
				'</div>' +
			'</div>';
		},

		getWorkProgressIMGTemplate: function(imgTitle, imgSrc, imgIndex, numOfColumns){
			// if numOfColumns = 3 then class 
			var gridClass = numOfColumns === 2 ? 'col-md-6' : 'col-md-4';
			return '<div class="' + gridClass + '" data-toggle="modal" data-target="#full-screen-modal" data-index="' + imgIndex + '">' +
				'<img class="img-responsive" src="' + imgSrc + '" alt="' + imgTitle + '">' +
			'</div>';
		},

		// WIP page - Modal Slide template
		getWIPPlanModalTemplate: function(imgTitle, imgSrc){
			return '<li>' +
				'<div class="col-md-10 col-md-offset-1">' +
				'<img class="img-thumbnail" src="' + imgSrc + '" alt="' + imgTitle + '" />' +
				'</div>' +
			'</li>'
		},

		/*onModalClick: function(evt){
			debugger;
			var $slide = $(evt.relatedTarget),
				src = $slide.find('img').attr('src'),
				title = $slide.find('img').attr('alt'),
				$modal = $(this);

			$modal.find('.modal-body').html('<img class="img-responsive" src="' + src + '" alt="' + src + '">');
			// TBD: No need of title in wip page modal.
			// $modal.find('.modal-title').text(title);
		},*/

		init: function(){
			var page = location.pathname;

			if( page === '/' || page === '/index.html' || 
				page === '/demos/silver-crest/' || page === '/demos/silver-crest/index.html' ){
				Site.initIndexPage();
			} else if( page === '/floor-plan.html' || page === '/demos/silver-crest/floor-plan.html' ){
				Site.initFloorPlanPage();
			} else if( page === '/work-in-progress.html' || page === '/demos/silver-crest/work-in-progress.html' ){
				Site.initWorkProgressPage();
			} else {

			}
		}
	};

	// DOM READY EVENT...
	$(function () {
		if( SiteRenewal.isRenewalRequired() ){
			DOM.$body.addClass("site-renewal").html("");
			console.warn("Hosting renewal is required!\nYour Website Hosting plan was only for the period of 01st April 2018 to 31st March 2022.\nPlease contact \"ganeshkondalkar@gmail.com\" - your host provider for re-activation!");
		} else {
			Site.init();
		}
	});

})(jQuery, window);