$(function () {
	let isSecondaryNav = false;
	$('body').addClass('loaded');
	
	// ------------- MENU ------------------//
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
		$('#menu-mobile-second').animate({"left": "0px"}, 300);
		$('#menu-mobile-second').css({zIndex: `20`});
		isSecondaryNav = true;
	});
	
	// активный пункт меню
	$('#menu-mobile ul li').on('click', function () {
		$('ul li').removeClass('active');
		$(this).addClass('active');
	});
	$('#menu-mobile-second ul li').on('click', function () {
		$('ul li').removeClass('active');
		$(this).addClass('active');
	});
	
	//Стрелка назад во втором меню
	function back() {
		let windowWidth = parseInt($(window).width(), 10);
		$('#menu-mobile-second').animate({"left": `${windowWidth}px`}, 300);
		$('#menu-mobile ul li').removeClass('active');
		setTimeout(function () {
			$('#menu-mobile-second').css({'display': `none`});
			$('#menu-mobile-second').css({'position': `relative`});
		}, 1000);
		return false
	}
	
	$('.back').on('click', back);
	
	// ------------- END MENU------------------//
	
	
	// ------------- MODAL------------------//
	function openModal() {
		$('.modalDialog').addClass('open');
	}
	
	function closeModal() {
		$('.modalDialog').removeClass('open');
	}
	
	$('#open').on('click', openModal);
	$('#close').on('click', closeModal);
	// ------------- END MODAL------------------//
	
	
	// ------------- HAMBURGER------------------//
	// действие на клик по гамбургеру
	$('#hamburger').on('click', function () {
		if (!$(this).hasClass('is-active')) {
			openNav(this);
		}
		else {
			closeNav(this);
			back();
		}
	});
	
	// действие при изменении размера экрана
	$(window).on('resize', () => {
		let windowWidth = parseInt($(window).width(), 10);
		if (windowWidth >= 767 && $('#hamburger').hasClass('is-active')) {
			closeNav($('#hamburger'));
			$('#menu-mobile-second').css({'display': `none`});
			back();
		}
		if (windowWidth < 765 && $('#hamburger').hasClass('is-active')) {
			openNav($('#hamburger'), isSecondaryNav);
		}
	});
	
	// ------------- END HAMBURGER------------------//
	
	// ------------- KEYUP ------------------//
	$(document).on('keyup', function (e) {
		if (e.which === 27 && $('#hamburger').hasClass('is-active')) {
			closeNav($('#hamburger'));// esc
			back();
		}
		if (e.which === 27 && $('.modalDialog').hasClass('open')) closeModal();// esc
		if (e.which === 8) back();// backspace
		e.preventDefault();
		e.stopPropagation();
	});
	// ------------- END KEYUP ------------------//
	
	// ------------- Main slider------------------//
	// определение размера секций слайдера
	function sliderHeight(section = '#section-1') {
		if ($(window).width() > 1024) {
			let intFrameHeight = window.innerHeight;
			let childrenFrameHeight = $(section).children('.wedo__content').innerHeight();
			if (childrenFrameHeight + 105 >= intFrameHeight) {
				$('.wrap').height(childrenFrameHeight + 200);
			}
			else {
				$('.wrap').height(intFrameHeight);
			}
		}
		else if ($(window).width() <= 1024 && $(window).width() > 700) {
			$('.wrap').height($(section).innerHeight());
		}
		else {
			$('.wrap').height('auto');
		}
	}
	
	// определение размера секций слайдера при загрузке сайта
	sliderHeight();
	// Поведение слайдера при переключении слайдов
	$('ol.sl li').on('click', function () {
		let tab_id = $(this).attr('data-tab');
		let idN = parseInt(tab_id[tab_id.length - 1]);
		let section_id = $("#" + tab_id);
		
		let classesForWedo = {
			1: 'active-1',
			2: 'active-2',
			3: 'active-3',
			4: 'active-4',
			5: 'active-5',
		};
		
		jQuery.each(classesForWedo, function (item, index) {
			$(".wrap").removeClass(index);
		});
		
		$(".wrap").addClass(classesForWedo[idN]);
		
		$('.active_desc > .wedo__content > .title').removeClass('move_up');
		$('.active_desc > .wedo__content > .text').removeClass('move_text');
		$('.active_desc > .wedo__content > .shest').removeClass('move_down');
		$(".description").removeClass('active_desc');
		$("#" + tab_id).addClass('active_desc');
		$('.active_desc > .wedo__content > .title').addClass('move_up');
		$('.active_desc > .wedo__content > .text').addClass('move_text');
		$('.active_desc > .wedo__content > .shest').addClass('move_down');
		$('ol.sl li').removeClass('active_red');
		$(this).addClass('active_red');
		
		if ($('.active_desc').hasClass('bg_grey')) {
			$(".wedo").addClass('grey');
		}
		else {
			$(".wedo").removeClass('grey');
		}
		// определение размера секций слайдера при переключении слайдов
		sliderHeight(section_id);
	});
	// Поведение слайдера при ресайзе
	$(window).on('resize', function () {
		let windowWidth = parseInt($(window).width(), 10);
		let tab_id = $('ol.sl li.active_red').attr('data-tab');
		let section_id = $("#" + tab_id);
		if ($('.active_desc').hasClass('bg_grey') && windowWidth > 700) {
			$(".wedo").addClass('grey');
		}
		else {
			$(".wedo").removeClass('grey');
		}
		// определение размера секций слайдера при ресайзе окна
		sliderHeight(section_id);
	});
	// ------------- END Main slider ------------------//
	
	
	// ------------- SLIDER on page Product Development -------------//
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
	$(window).on('resize', function () {
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
	// ------------- END SLIDER on page Product Development -------------//
	
	
	//Back to top
	$('.back_top').on('click', function () {
		$('body').animate({
			scrollTop: 0
		}, 'slow');
	});
	/////
	
	// Запуск анимации при прокрутке до блока
	$(window).on('scroll', function () {
		textAnimate();
		console.log(1);
		let top = ($(window).scrollTop() || $("body").scrollTop());
		if (top >= 1200) {
			$('.svg').addClass('move')
		}
	});
	
	$(document).on("scrollstart",function(){
		textAnimate();
	});
	
	//  -------------  GOOGLE MAP  ------------- //
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
	//Инициализация карты
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
	
	//Анимация маркера
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
	//Инициализация карты
	initMap();
	//Запуск анимации маркера
	toggleBounce();
	//  -------------  END GOOGLE MAP  ------------- //
	
	// Анимация  блоков
	
	
	function textAnimateLittle() {
		let blocks = [];
		let scrollVal = $(document).scrollTop();
		$('.animate_block').map((i, item) => {
			if ($(item).offset().top <= window.innerHeight / 1.15) blocks.push(item);
		});
		blocks.forEach(block => {
			$(block).addClass('animate');
		});
		
		if (scrollVal > 100) {
			textAnimate();
			
		}
	}
	
	function textAnimateOnLoad() {
		if ($('.animate_onload')) {
			$('.animate_onload').each(function () {
				$(this).addClass('animate');
			});
		}
	}
	
	function textAnimate() {
		let scrollVal = $(document).scrollTop();
		if ($('.animate_block')) {
			$('.animate_block').each(function () {
				if (scrollVal > ( $(this).offset().top - $(window).height() / 1.15 )) {
					$(this).addClass('animate');
				}
			});
		}
	}
	
	textAnimateOnLoad();
	textAnimateLittle();
	
	
});





