$(function () {
	let isSecondaryNav = false;
	let width = parseInt($(window).width(), 10);
	
	$('.back_top').click(function () {
		$('body').animate({
			scrollTop: 0
		}, 'slow');
	});
	// открытие меню
	function openNav(element, isSecondary) {
		let windowWidth = parseInt($(window).width(), 10);
		$('body').addClass('ov-h');
		$(element).addClass('is-active');
		$('#menu-mobile').addClass('open_menu');
		$('#menu-mobile').css({left: `${0}px`});
		$('#menu-mobile-second').addClass('open_menu');
		if (isSecondary) {
			$('#menu-mobile-second').animate({"left": "0px"}, 400);
		} else {
			$('#menu-mobile-second').css({left: `${windowWidth}px`});
		}
		
		return false;
	}
	
	// открытие меню второго меню
	$('#second_menu').on('click', function () {
		$('#menu-mobile-second').css({'position': `fixed`});
		$('#menu-mobile-second').css({'display': `flex`});
		$('#menu-mobile-second').animate({"left": "0px"}, "slow");
		$('#menu-mobile-second').css({zIndex: `20`});
		isSecondaryNav = true;
	});
	
	
	$('.back').on('click', function () {
		let windowWidth = parseInt($(window).width(), 10);
		$('#menu-mobile-second').animate({"left": `${windowWidth}px`}, 400);
		$('#menu-mobile ul li').removeClass('active');
		
		setTimeout(function () {
			$('#menu-mobile-second').css({'display': `none`});
			$('#menu-mobile-second').css({'position': `relative`});
		}, 1000 )
		
	});
	
	// закрытие меню
	function closeNav(element) {
		$('body').removeClass('ov-h');
		$(element).removeClass('is-active');
		$('#menu-mobile').removeClass('open_menu');
		$('#menu-mobile-second').removeClass('open_menu');
		return false;
	}
	
	// действие на клик
	$('#hamburger').on('click', function () {
		if (!$(this).hasClass('is-active')) {
			openNav(this);
		}
		else {
			closeNav(this);
		}
	});
	
	// открытие модалки
	$('#open').on('click', function () {
		$('.modalDialog').addClass('open');
	});
	$('#close').on('click', function () {
		$('.modalDialog').removeClass('open');
	});
	
	
	
	$('#menu-mobile ul li').on('click', function () {
		$('ul li').removeClass('active');
		$(this).addClass('active');
	});
	
	$('#menu-mobile-second ul li').on('click', function () {
		$('ul li').removeClass('active');
		$(this).addClass('active');
	});
	
	
	
	
	// действие при изменении размера экрана
	$(window).resize(() => {
		let windowWidth = parseInt($(window).width(), 10);
		if (windowWidth >= 767 && $('#hamburger').hasClass('is-active')) {
			closeNav($('#hamburger'));
		}
		if (windowWidth < 765 && $('#hamburger').hasClass('is-active')) {
			openNav($('#hamburger'), isSecondaryNav);
		}
	});
	
	$('body').addClass('loaded');
	
	////////////
	
	
	$('ol.sl li').click(function () {
		$(".description").removeClass('active_desc');
		var tab_id = $(this).attr('data-tab');
		$("#" + tab_id).addClass('active_desc');
		$('ol.sl li').removeClass('active_red');
		$(this).addClass('active_red');
	});
	
	
	window.onscroll = function() {
		var top = ($(window).scrollTop() || $("body").scrollTop());
		if(top>= 100){
			$('.svg').addClass('move')
		}
	};
	
	
	// SLIDER

	let slick_slider = $('.responsive');
	let settings = {
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 603,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: false
				}
			},
		]
	};
	slick_slider.slick(settings);
	$(window).on('resize', function() {
		if ($(window).width() < 605) {
			if (slick_slider.hasClass('slick-initialized')) {
				slick_slider.slick('unslick');
			}
			return
		}
		
		if (!slick_slider.hasClass('slick-initialized')) {
			return slick_slider.slick(settings);
		}
	});
	
	// END SLIDER
	
	
	// GOOGLE MAP
	var map,
		image = $(window).width() <= 768 ? 'img/marker.svg' : 'img/marker.svg',
		styleArray = [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#bdbdbd"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dadada"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "transit.line",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#c9c9c9"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			}
		]
		;
	
	var marker;
	
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			styles: styleArray,
			center: {lat: 38.871053, lng: -77.056298}
		});
		
		marker = new google.maps.Marker({
			map: map,
			zoom: 20,
			maxZoom: 25,
			title: 'RADIAN',
			animation: google.maps.Animation.DROP,
			position: {lat: 38.871053, lng: -77.056298},
			icon: image
		});
		marker.addListener('click', toggleBounce);
	}
	
	
	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}
	
	$('.contact_map_adr').on('click', function () {
		if ($(this).hasClass('odessa')) {
			map.setCenter({lat: 38.871053, lng: -77.056298});
		}
	});
	initMap();
	toggleBounce();
	// MAP END
});





