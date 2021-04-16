window.addEventListener('DOMContentLoaded', function(){

	contactMap();
	contactsTabs();
	
})

const contactsTabs = () => {

	$('.contacts__button').on('click', function(){

		$(this).addClass('_active').siblings().removeClass('_active');
		$('.contacts__content-card').removeClass('_active');
		$('.contacts__content-card').eq($(this).index()).addClass('_active');
	});
}

const contactMap = () => {

	let selector = document.querySelectorAll('.js-contacts-map');

	selector.forEach(item => contactMap(item));

	function contactMap(item){

		let container = item;
		let map;
		let marker;
		let popup;
		let markerPopupContent = '<p class="marker_content">Barnimstraße 26 14770 Brandenburg / Havel</p>';
		let marketIcon = {
			url: 'icons/marker.png'
			// size: new google.maps.Size(49, 65),
			// origin: new google.maps.Point(-3, 0),
			// anchor: new google.maps.Point(-40, 140)
		};
		let coordinates = { 
			lat: +container.dataset.lat, 
			lng: +container.dataset.lng, 
		}

		let mapStyle = [
		{
			"featureType": "landscape",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 60
				}
			]
		},
		{
			"featureType": "road.local",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 40
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "transit",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "administrative.province",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "water",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"lightness": 30
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#ef8c25"
				},
				{
					"lightness": 40
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#b6c54c"
				},
				{
					"lightness": 40
				},
				{
					"saturation": -40
				}
			]
		},
		{}
		]

		if(container)initMap();

		function initMap() {

			map = new google.maps.Map(container, {
				center: coordinates,
				// disableDefaultUI: true,
				zoom: 16,
				styles: mapStyle,
			});

			marker = new google.maps.Marker({
				position: coordinates,
				map: map,
				icon: marketIcon,
				// animation: google.maps.Animation.DROP
			});

			// popup = new google.maps.InfoWindow({
			// 	content: markerPopupContent
			// });

			// marker.addListener('click', function() {
			// 	popup.open(map, marker);
			// });
		}

	};

}
window.addEventListener('DOMContentLoaded', function(){

	categoryCarousel()
})

const categoryCarousel = () => {

	let slider;
	const condition = function(){
		let itemsWidth = 0;
		let containerWidth = $('.blog-categories__slider').outerWidth();

		$('.blog-categories__item').each(function(index, item){

			itemsWidth += $(item).outerWidth();
		})

		return itemsWidth > containerWidth 

	};

	condition() ? sliderInit() : sliderRemove();
	
	function sliderRemove(){

		$('.blog-categories__button').remove();
	}

	function sliderInit(){

		slider = new Swiper('.js-category-carousel', {
			
			slidesPerView: 'auto',
			loop: true,

			on: {
			
				beforeInit: function(){

					$('.blog-categories__slider').removeClass('_disabled');
					$('.blog-categories__item').each(function(i, item){

						$(item).parent().css('width', $(item).find('span').outerWidth() + 60 + 'px');
					})
				},
			},

			navigation: {

				nextEl: '.blog-categories__navigation ._next',
				prevEl: '.blog-categories__navigation ._prev',
				disabledClass: '_disabled'
			},
		});	
	}

	$('.blog-categories__item').on('click', function(){

		$('.blog-categories__item').removeClass('_active');
		$(this).addClass('_active');
	})

}
window.addEventListener('DOMContentLoaded', function(){

	faqInit();

	if(document.querySelector('.scroll-section')) scrollContainer();
	
})

const faqInit = () => {

	$('.faq-item__button').on('click', function(){

		if($(this).hasClass('_active')) {

			$(this).removeClass('_active');
			$(this).next('.faq-item__content').slideUp(400);
		} else {

			$('.faq-item__button').removeClass('_active');
			$('.faq-item__content').slideUp(400);
			$(this).addClass('_active');
			$(this).next('.faq-item__content').slideDown(400);
		}

	});
}

const scrollContainer = () => {

	const section = $('.scroll-section');
	const container = $('.scrolled-container');

	$(window).on('scroll', function(){


		if($(window).scrollTop() + 120 > section.offset().top ){

			container.addClass('_fixed');
		} else {

			container.removeClass('_fixed');
			container.find('img').attr('src', '');
		}

		$('.scroll-block').each(function(index, item){

			// first image
			if( index === 0 ){

				let currentImageSRC = $(this).find('.scroll-block__image').attr('data-src');
				container.find('img').attr('src', currentImageSRC);

				if($(window).scrollTop() + 120 >= $(this).offset().top) {

					$(this).find('.scroll-block__image').css('opacity', '0'); 
				} else {

					$(this).find('.scroll-block__image').css('opacity', '1');
				}
			}

			// All Images Logic
			if($(window).scrollTop() + 300 >= $(this).offset().top){
				
				let currentImageSRC = $(this).find('.scroll-block__image').attr('data-src');
				container.find('img').attr('src', currentImageSRC);

			} 

			// last image
			if( index === $('.scroll-block').length - 1 ) {

				let offsetTriger = 800;
				let lastBLock = $(this);
				let imageurl = lastBLock.find('.scroll-block__image').attr('data-src');
				let offset = lastBLock.offset().top + lastBLock.outerHeight();


				if($(window).scrollTop() > offset - offsetTriger - 80) {

					container.css('opacity', 0);
					$(this).find('.scroll-block__media').css('align-items', 'flex-end');
					$(this).find('.scroll-block__image').css('opacity', 1);
					$(this).find('.scroll-block__image').attr('src', imageurl);

				} else {

					container.css('opacity', 1);
					$(this).find('.scroll-block__image').css('opacity', 0);
				}
				
			}
			
		});

	}).scroll();


	
}
window.addEventListener('DOMContentLoaded', function(){
	// All Pages
	currencyDropdown();
	videoPlayer();
	seoToggleContent();
	scrollTop();
	sortSelect();
	modalsInit();
	maskHandler();
	formValidation();

	// Need For Filter
	selectCheckbox();
	selectCheckboxPrice();
	filter();
	
	// Home-Page
	categorySlider();
	cardWishlist();
	catalogTabs();
	testimonialSlider();
	testimonialHomeReadMore();
	
});

const testimonialHomeReadMore = () => {

	const deltaHeight = 228;
	const moreText = 'смотреть еще';
	const lessText = 'закрыть'
	let container = $('.testimonials-slide__typography');
	let btnReadMore = `<button class="button testimonial-card__readmore">${moreText}</button>`;
	let resetSliderHeight;

	container.each(function (insex, item){

		item = $(item);
		let itemHeight = item.outerHeight();

		toggleContent(item, itemHeight);
	});

	function toggleContent(item, itemHeight){

		if(itemHeight >=  deltaHeight){

			item.css('height', deltaHeight + 'px');
			item.parent().append(btnReadMore);
			item.parent().find('.testimonial-card__readmore').on('click', function(){

				if(item.outerHeight() <=  deltaHeight){
					item.css('height', itemHeight + 'px');
					$(this).html(lessText);
				} else {
					item.css('height', deltaHeight + 'px');
					$(this).html(moreText);
				}
			});

			resetSliderHeight = function(){

				item.css('height', deltaHeight + 'px');
				$(this).html(moreText);
			}

		}

	}

	$('.testimonials-slider__nav .button').on('click', function(){
		resetSliderHeight();
	});

}

const formValidation = () => {

	const forms = document.querySelectorAll('.js-validate');

    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( value );
    }

    forms.forEach(function (form) {
        let forms = $(form).validate({
            errorElement: "em",
            errorPlacement: function (error, element) {
                element.parent().parent().append(error);
            }

        });

        $('.js-clear-validation').on('click', function(){
            forms.resetForm();
        });

    });
}

const maskHandler = () => {

	// Filter Price Mask
	if(document.querySelector('.js-price-mask')){

		let $price =  document.querySelectorAll('.js-price-mask');

		$price.forEach(item => {

			IMask(item, {
				mask: "num",
				blocks: {
					num: {
						// nested masks are available!
						mask: Number,
						thousandsSeparator: " "
					}
				}
			});
		});	
	}

	// Phone Number Mask
	if(document.querySelector('.js-phone-mask')){

		let $price =  document.querySelectorAll('.js-phone-mask');

		$price.forEach(item => {

			IMask(item, {
				mask: "+num",
				blocks: {
					num: {
						// nested masks are available!
						mask: Number,
						thousandsSeparator: " "
					}
				}
			});
		});	
	}

}

const modalsInit = () => {

	$('[data-fancybox="modal"]').fancybox({

		type: 'inline',
		modal: true,
		baseClass: "site__fancybox",
		arrows: false,
		// hideScrollbar: false,
	});

	$('.contact-card__callback button').on('click', function(){

		$.fancybox.open({
			src  : '#contuct-us',
			type : 'inline',
			modal: true,
			baseClass: "site__fancybox",
			arrows: false,

		});
	});
}

const sortSelect = () => {

	$('.sort-select').on('click', function(){

		$(this).toggleClass('_active');
		$(this).find('.sort-select__list').slideToggle(200);
	});

	$('.sort-select__item').on('click', function(){

		let current = $(this).parents('.sort-select').find('.sort-select__current');
		let currentTitle = current.html();

		current.html($(this).html());
		$(this).html(currentTitle);
	});

	
}

const scrollTop = () => {
    let toTopBtn = $('.to-top');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 600) {
            toTopBtn.addClass('_visible');
        } else {
            toTopBtn.removeClass('_visible');
        }
    });

    $(document).on('click', '.to-top', () => {
        $('html, body').animate({ scrollTop: 0 }, 0);
    });
};

const testimonialSlider = () => {

	let slider;

	slider = new Swiper('.js-testimonial-slider', {

		speed: 800,
		preloadImages: false,
		// autoHeight: true,
		
		lazy: {
			loadPrevNext: true
		},

		effect: 'fade',
	
		navigation: {

			nextEl: '.testimonials-slider__nav ._next',
			prevEl: '.testimonials-slider__nav ._prev',
			disabledClass: '_disabled'
		},

		pagination: {

			el: '.testimonials-slider__counter',
			type: 'fraction',
		}
		
	})
};

const currencyDropdown = () => {

	// $('.currency-dropdown').on('click', '.currency-dropdown__button', function(e){
	// 	e.stopPropagation();
	// 	e.preventDefault();

	// 	$(this).parents('.currency-dropdown').find('.currency-dropdown__list').slideToggle(500);
	// 	$(this).toggleClass('_active');	
	// });

	$('.currency-dropdown').on('click', '.currency-dropdown__item', function(e){
		e.stopPropagation();
		e.preventDefault();

		let currency = '';
		const button = $(this).parents('.currency-dropdown').find('.currency-dropdown__button');


		// $(this).parents('.currency-dropdown').find('.currency-dropdown__list').slideUp(500);
		$(this).parents('.currency-dropdown').find('.currency-dropdown__button').removeClass('_active');
		currency = $(this).html();
		$(this).html(button.html());
		
		button.html(currency);
	})
}

const selectCheckbox = () => {

	const elements = $('.select-checkbox');

	elements.each(function(index, el){

		let button = $(el).find('.select-checkbox__button');
		let checkbox = $(el).find('.checkbox input');

		button.on('click', buttonHandler);
		checkboxCounter(checkbox, button);
	})

	function buttonHandler(){
		
		const button = $(this);
		const list = button.siblings('.select-checkbox__list');

		button.toggleClass('_active');
		listToggle(list);

		// hide other select's
		$('.select-checkbox__list').not(list).slideUp(400);
		$('.select-checkbox__button').not(button).removeClass('_active');
	}

	function listToggle(list) {

		list.slideToggle(400);
	}

	function checkboxCounter(ckeckbox, button){

		let count = 0;
		let firstCheckedText = '';
		let lastCheckedText = '';
		let buttonDefaultText = button.html();

		ckeckbox.on('click', function(e){
			e.stopPropagation();
			firstCheckedText = $(this).next('span').html();

			$(this).prop('checked') ? increment() : decrement();

			function increment(){
				count++

				if(count <= 1){
					button.html(firstCheckedText);
				} else {
					button.html('Выбрано ' + count);
				}
			}

			function decrement() {
				count--

				if(count === 0){
					button.html(buttonDefaultText)
				} else if( count === 1 ){
					findLastChecked();
					button.html(lastCheckedText);
				} else {
					button.html('Выбрано ' + count);
				}
			}

		});

		function findLastChecked(){
			ckeckbox.each(function (inadex, el) {

				if($(el).prop('checked')) lastCheckedText = $(el).next('span').html();

			});
		}
	}

	// Hide Select Ckiced Outside Select
	$(document).on('click', function(e){

		if($(e.target).parents('.select-checkbox').is('.select-checkbox')) {
			return
		} else {

			$('.select-checkbox__list').not($(e.target)).slideUp(400);
			$('.select-checkbox__list').not($(e.target)).siblings().removeClass('_active');
		}
	});

}

const selectCheckboxPrice = () => {


	$('.select-checkbox input._from').on('input', function(e){
		const result = $(this).parents('.select-checkbox').find('.button ._from');

		result.html($(this).val());
		if($(this).val() == ''){
			result.html(result.attr('data-placeholder'));
		}
	});

	$('.select-checkbox input._to').on('input', function(e){
		const result = $(this).parents('.select-checkbox').find('.button ._to');

		result.html($(this).val());
		if($(this).val() == ''){
			result.html(result.attr('data-placeholder'));
		}
	});
}

const filter = () => {

	$('.filter__button-type').on('click', function(){

		$(this).addClass('_active').siblings().removeClass('_active');
	});

	$('.filter__reset').on('click', clearFilterData);

	function clearFilterData(){

		$('.filter input').each(function(i, el){

			$(el).attr('type') == 'checkbox' ? $(el).prop('checked', false) : $(el).val('');
		});

		$('.select-checkbox__button').each(function(){

			$(this).html($(this).attr('data-select-placeholder'));
			$(this).find('span._from').html($(this).find('span._from').attr('data-placeholder'));
			$(this).find('span._to').html($(this).find('span._to').attr('data-placeholder'));
		});
		
	}

	// Show Button "Clear Filter"
	function showClearButton(){
		$('.filter input').each(function(){
			$(this).attr('checked');
		})
	}

	showClearButton();

}

const categorySlider = () => {

	let slider;

	slider = new Swiper('.js-category-slider', {

		speed: 800,
		preloadImages: false,
		loop: true,
		
		lazy: {
			loadPrevNext: true
		},

		effect: 'fade',
	
		navigation: {

			nextEl: '.category-slider__nav ._next',
			prevEl: '.category-slider__nav ._prev',
			disabledClass: '_disabled'
		},

		pagination: {

			el: '.category-slider__counter',
			type: 'fraction',
		},

		on: {

			beforeInit: function () {

				let firstImageUrl;
				
				$('.category-slide').each(function(index, el){

					let container = $(this).find('.category-slide__media');
					let currImage = $(this).find('.category-slide__image');
					let currImageUrl = currImage.attr('data-src');
					let nextImageUrl = $(this).parent().next().find('.category-slide__image').attr('data-src');
					let imageTemplate = `
						<figure class="category-slide__thumb _cloned">
							<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${nextImageUrl}" alt="" class="category-slide__secondary-image swiper-lazy">
							<div class="swiper-lazy-preloader"></div>
						</figure>`;

					if(index === 0) firstImageUrl = currImageUrl;
					if(index === $('.category-slide').length - 1) imageTemplate = `
						<figure class="category-slide__thumb _cloned">
							<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${firstImageUrl}" alt="" class="category-slide__secondary-image swiper-lazy">
							<div class="swiper-lazy-preloader"></div>
						</figure>`;
					
					container.append(imageTemplate)

				});

			},
		}
		
	})
	
}

const cardWishlist = () => {

	$('.js-wishlist-toggle').on('click', function(e){

		e.stopPropagation();
		e.preventDefault();

		let addText = "Добавить в избранное";
		let removeText = "Убрать из избранного";

		$(this).toggleClass('_active');
		if($(this).hasClass('_active')) {

			$(this).find('span').html(removeText);
		} else {

			$(this).find('span').html(addText);
		}
		
	});
}

const catalogTabs = () => {

	$('.catalog-tabs__button-tab').on('click', function(){

		$(this).addClass('_current').siblings().removeClass('_current');

		$('.catalog-tabs__content').siblings().removeClass('_current').eq($(this).index()).addClass('_current')
	});
}

const videoPlayer = () => {

	$('.yt-player').on('click', '.yt-player__button', function(){

		let player = $(this).parents('.yt-player').find('.yt-player__iframe');
		player.attr('src', player.attr('data-src'));
		$(this).remove();
	});
}

const seoToggleContent = () => {

	$('.section-typography__button').on('click', function(){

		let height = $('.section-typography__body .typography').outerHeight();
		let moretext = $(this).attr('data-more-text');
		let lesstext = $(this).attr('data-less-text');

		if($('.section-typography__body').hasClass('_visible')) {
			$('.section-typography__body').css('height', '').removeClass('_visible');
			$(this).html(moretext);
		} else {
			$('.section-typography__body').css('height', height + 'px').addClass('_visible');
			$(this).html(lesstext);
		}

	});
}



window.addEventListener('DOMContentLoaded', function(){

	productGallery();
	productMap();
	productFormTags()
	
})

const productFormTags = () => {

	$('.product-form__tag').on('click', function(e){


		if(!$(this).hasClass('_checked')){
			$(this).addClass('_checked');
			$(this).find('input').attr('checked', true);	
		} else {
			$(this).removeClass('_checked');
			$(this).find('input').attr('checked', false);
		}
	});
}

const productMap = () => {

	let container = document.querySelector('.js-product-map');
	let map;
	let marker;
	let popup;
	let markerPopupContent = '<p class="marker_content">Barnimstraße 26 14770 Brandenburg / Havel</p>';
	let marketIcon = {
		url: 'icons/marker.png'
		// size: new google.maps.Size(49, 65),
		// origin: new google.maps.Point(-3, 0),
		// anchor: new google.maps.Point(-40, 140)
	};
	let coordinates = { 
		lat: 36.5433118, 
		lng: 31.986317 
	}

	let mapStyle = [
		{
			"featureType": "landscape",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 60
				}
			]
		},
		{
			"featureType": "road.local",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 40
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "transit",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "administrative.province",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "water",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"lightness": 30
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#ef8c25"
				},
				{
					"lightness": 40
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#b6c54c"
				},
				{
					"lightness": 40
				},
				{
					"saturation": -40
				}
			]
		},
		{}
	]

	if(container)initMap();

    function initMap() {

		map = new google.maps.Map(container, {
			center: coordinates,
			// disableDefaultUI: true,
			zoom: 16,
			styles: mapStyle,
		});

		marker = new google.maps.Marker({
			position: coordinates,
			map: map,
			icon: marketIcon,
			animation: google.maps.Animation.DROP
		});

		popup = new google.maps.InfoWindow({
	        content: markerPopupContent
	    });

		marker.addListener('click', function() {
			popup.open(map, marker);
		});
    }

}

const productGallery = () => {

	let swiper;
	let fancy;

	swiperInit();
	swiperFuncybox();

	function swiperInit(){

		swiper = new Swiper('.js-product-gallery', {

			speed: 600,
			preloadImages: false,
			slidesPerView: 1,
			spaceBetween: 10,

			lazy: {
				loadPrevNext: true
			},
		
			navigation: {

				nextEl: '.product-gallery__navigation-item._next',
				prevEl: '.product-gallery__navigation-item._prev',
				disabledClass: '_disabled'
			},

			pagination: {

				el: '.product-gallery__pagination',
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					return `<span class="_current" >${current}</span>
							<div class="_separator"></div>
							<span class="_totla" >${total}</span>`;
				}
			},

			on: {

				init: function(swiper){

					$('.product-gallery__badge ._total').html(swiper.slides.length);
				}
			}


		})
	}
	
	function swiperFuncybox(){
		
		fancy = $('[data-fancybox="swiper-gallery"]').fancybox({


			buttons: [
				"zoom",
				//"share",
				"slideShow",
				"fullScreen",
				//"download",
				"thumbs",
				"close"
			],

			animationEffect: false,
			backFocus: true,

			thumbs: {
				autoStart: true, 
				hideOnClose: true, 
			},

			beforeShow: function( instance, current ) {
				swiper.slideTo(current.index, 0);
			},
		});
	}

	$('.product-gallery__badge').on('click', function() {
		$.fancybox.open( $('[data-fancybox="swiper-gallery"]'), {
			buttons: [
				"zoom",
				//"share",
				"slideShow",
				"fullScreen",
				//"download",
				"thumbs",
				"close"
			],

			animationEffect: false,
			backFocus: true,

			thumbs: {
				autoStart: true, 
				hideOnClose: true, 
			},

			beforeShow: function( instance, current ) {
				swiper.slideTo(current.index, 0);
			},
		});
	});

	// $('.product-gallery__navigation .button').hover(function(){
	
	// 	$(this).parent().css('background', 'rgba(230, 217, 215, 0.5)');
	// } , 

	// 	function(){

	// 		$(this).parent().css('background', '');
	// 	}
	// );
	
	
}
window.addEventListener('DOMContentLoaded', function(){

	testimonialReadMore();
	
});

const testimonialReadMore = () => {

	const deltaHeight = 215;
	const moreText = 'смотреть еще';
	const lessText = 'закрыть'
	let container = $('.testimonial-card__typography');
	let btnReadMore = `<button class="button testimonial-card__readmore">${moreText}</button>`;

	container.each(function (insex, item){

		item = $(item);
		let itemHeight = item.outerHeight();

		toggleContent(item, itemHeight);
	});

	function toggleContent(item, itemHeight){

		if(itemHeight >=  deltaHeight){

			item.css('height', deltaHeight + 'px');
			item.parent().append(btnReadMore);
			item.parent().find('.testimonial-card__readmore').on('click', function(){

				if(item.outerHeight() <=  deltaHeight){
					item.css('height', itemHeight + 'px');
					$(this).html(lessText);
				} else {
					item.css('height', deltaHeight + 'px');
					$(this).html(moreText);
				}
			});
		}
	}

}