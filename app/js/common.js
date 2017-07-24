$(function () {
	let isSecondaryNav = false;
	$('body').addClass('loaded');
	
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
	// закрытие меню
	function closeNav(element) {
		$('body').removeClass('ov-h');
		$(element).removeClass('is-active');
		$('#menu-mobile').removeClass('open_menu');
		$('#menu-mobile-second').removeClass('open_menu');
		return false;
	}
	
	// открытие второго меню
	$('#second_menu').on('click', function () {
		$('#menu-mobile-second').css({'position': `fixed`});
		$('#menu-mobile-second').css({'display': `flex`});
		$('#menu-mobile-second').animate({"left": "0px"}, "slow");
		$('#menu-mobile-second').css({zIndex: `20`});
		isSecondaryNav = true;
	});
	
	//Стрелка назад во втором меню
	function back() {
		let windowWidth = parseInt($(window).width(), 10);
		$('#menu-mobile-second').animate({"left": `${windowWidth}px`}, 400);
		$('#menu-mobile ul li').removeClass('active');
		setTimeout(function () {
			$('#menu-mobile-second').css({'display': `none`});
			$('#menu-mobile-second').css({'position': `relative`});
		}, 1000 );
		return false
	}
	$('.back').on('click', back);

	// MODAL
	function openModal() {
		$('.modalDialog').addClass('open');
	}
	function closeModal() {
		$('.modalDialog').removeClass('open');
	}
	$('#open').on('click', openModal);
	$('#close').on('click', closeModal);
	// END MODAL
	
	$('#menu-mobile ul li').on('click', function () {
		$('ul li').removeClass('active');
		$(this).addClass('active');
	});
	$('#menu-mobile-second ul li').on('click', function () {
		$('ul li').removeClass('active');
		$(this).addClass('active');
	});
	
	// действие на клик по гамбургеру
	$('#hamburger').on('click', function () {
		if (!$(this).hasClass('is-active')) {
			openNav(this);
		}
		else {
			closeNav(this);
		}
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
	
	$(document).keyup(function(e) {
		// if (e.which === 13 && $('#hamburger').hasClass('is-active')) closeNav($('#hamburger'));  // enter
		if (e.which === 27 && $('#hamburger').hasClass('is-active')) {
			closeNav($('#hamburger'));// esc
			back();
		}
		if (e.which === 27 && $('.modalDialog').hasClass('open')) closeModal();// esc
		if (e.which === 8) back();// backspace
		e.preventDefault();
		e.stopPropagation();
	});
	
	$('ol.sl li').click(function () {
		let tab_id = $(this).attr('data-tab');
		$('.active_desc > .title').removeClass('move_up');
		$('.active_desc > .text').removeClass('move_text');
		$('.active_desc > .shest').removeClass('move_down');
		$(".description").removeClass('active_desc');
		// $(".description>::before").addClass('move_down');
		$("#" + tab_id).addClass('active_desc');
		$('.active_desc > .title').addClass('move_up');
		$('.active_desc > .text').addClass('move_text');
		$('.active_desc > .shest').addClass('move_down');
		$('ol.sl li').removeClass('active_red');
		$(this).addClass('active_red');
		
		if($('.active_desc').hasClass('bg_grey') ){
			$(".wedo").addClass('grey');
		}
		else{
			$(".wedo").removeClass('grey');
		}
		if($(window).width() > 1024){
			$('.description').height($('100vh'));
		}
		else if ($(window).width() <= 1024 && $(window).width() > 700) {
			$('.wrap').height($("#" + tab_id).innerHeight());
		}
		else{
			$('.wrap').height('auto');
		}
	});
	
	$(window).on('resize', function() {
		let tab_id = $('ol.sl li.active_red').attr('data-tab');
		if($('.active_desc').hasClass('bg_grey') ){
			$(".wedo").addClass('grey');
		}
		else{
			$(".wedo").removeClass('grey');
		}
		if($(window).width() > 1024){
			$('.wrap').height('100vh');
		}
		else if ($(window).width() <= 1024 && $(window).width() > 700) {
			$('.wrap').height($("#" + tab_id).innerHeight());
		}
		else{
			$('.wrap').height('auto');
		}
	});
	
	$(window).resize(() => {
		let windowWidth = parseInt($(window).width(), 10);
		if (windowWidth < 700 ) {
			$(".wedo").removeClass('grey');
		}
	});
		
	window.onscroll = function() {
		let top = ($(window).scrollTop() || $("body").scrollTop());
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
	
	//Back to top
	$('.back_top').click(function () {
		$('body').animate({
			scrollTop: 0
		}, 'slow');
	});
	/////
	
	// GOOGLE MAP
	let map,
		marker,
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
		];
	
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





