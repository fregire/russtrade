$(document).ready(function(){
	// Адаптивное меню 
	$(".header .menu__btn, .menu__title").click(function(){
		$(this).siblings(".header__menu-list").slideToggle(300, function(){
			if($(this).css("display") === "none"){
				$(this).removeAttr("style");
			} 
		});
	});

	// Открытие/закрытие записи блога
	$(".blog__more").click(function(){
		if($(this).siblings(".blog__text").hasClass("visually-hidden")){
			$(this).siblings(".blog__intro").addClass("visually-hidden");
			$(this).siblings(".blog__text").removeClass("visually-hidden");
			$(this).text("Свернуть обратно");	
		} else {
			$(this).siblings(".blog__intro").removeClass("visually-hidden");
			$(this).siblings(".blog__text").addClass("visually-hidden");
			$(this).text("Показать все");
		}

	});

	// Форма поиска на сайте
	$(".options__search-btn").click(function(e) {
		var btn = $(this);
		if($(this).parent().hasClass("options__search--closed")){
			e.preventDefault();
		};
		$(this).parent().removeClass("options__search--closed");
		$(this).siblings(".options__search-form").css("visibility", "visible");
		$(this).siblings(".options__search-form").focus();
		setTimeout(function(){
			btn.siblings(".options__close").fadeIn(400);
		}, 300);
		btn.addClass("options__search-btn--opened");
		// Форма поиска в футере
		if($(this).parent().hasClass("options__search--footer")){
			$(this).parent().css("border-color", 'transparent');
		}
	});

	$(".options__close").click(function(e) {
		e.preventDefault();
		$(this).parent().addClass("options__search--closed");
		$(this).siblings(".options__search-form").css("visibility", "hidden");
		$(this).siblings(".options__search-form").blur();
		$(this).siblings('.options__search-btn').removeClass("options__search-btn--opened");
		$(this).fadeOut(400);
		$(this).removeAttr("style");

		// Форма поиска в футере
		if($(this).parent().hasClass("options__search--footer")){
			$(this).parent().removeAttr("style");
		}
	});


	// Чекбокс для поиска в новостях
	$(".checkbox-field").click(function(){
		if($(this).children(".checkbox-field__checkbox").prop("checked") === false){
			$(this).children(".checkbox-field__checkbox").prop("checked", true);
			$(this).addClass("checkbox-field--checked");	
		} else {
			$(this).children(".checkbox-field__checkbox").prop("checked", false);
			$(this).removeClass("checkbox-field--checked");
		}
	});

	//Слайдер для страницы контактов
	$(".address__slider").slick({
		slidesToShow: 1
	});



	var valueOfDashOffset = 60;
	var timerProgressBar;
	var svgCircle = "<svg width='25' height='24' xmlns='http://www.w3.org/2000/svg''><circle class='circle' r='8.5' cx='11' cy='10' stroke='rgba(255, 255, 255, 1)' fill='transparent' stroke-width='3' stroke-dasharray='60' stroke-dashoffset='60'></circle></svg>";
	//Сладйре для направлений с кнопкой скачать презентацию
	$(".path-slider").on('init', function(slick){
		$('.path-slider .slick-dots .slick-active').append(svgCircle);
		var $circle = $('.path-slider .slick-dots .slick-active').children("svg").children(".circle")[0];
		$circle.setAttribute("stroke-dashoffset", valueOfDashOffset);
		var value = valueOfDashOffset;
		timerProgressBar = setInterval(function(){
			value--;	
			$circle.setAttribute("stroke-dashoffset", value);	
			if($circle.getAttribute("stroke-dashoffset") <= 6) {
				clearInterval(timerProgressBar);
				$('.path-slider').slick('slickNext');
			}
		}, 70);
	});
	$(".path-slider").slick({
		dots: true
	});
	//  Вставка svg прогресс бара для слайд точекера
	$(".path-slider").on('beforeChange', function(event, slick, currentSlide){
		$(".path-slider .slick-dots li").children("svg").remove();
		clearInterval(timerProgressBar);
	});
	$(".path-slider").on('afterChange', function(slick, currentSlide){
		clearInterval(timerProgressBar);
		$('.path-slider .slick-dots .slick-active').append(svgCircle);
		var $circle = $('.path-slider .slick-dots .slick-active').children("svg").children(".circle")[0];
		var value = valueOfDashOffset;
		timerProgressBar = setInterval(function(){
			$($circle).attr("stroke-dashoffset", value);	
			value--;	
			console.log(value);
			if($($circle).attr("stroke-dashoffset") <= 6) {
				clearInterval(timerProgressBar);
				$('.path-slider').slick('slickNext');
			}
		}, 70);
	});

	// Слайдер для направлений с мальеньким размером
	$(".paths__our-ways").slick({
		slidesToShow: 4,
		responsive: [
			{
			  breakpoint: 1100,
		      settings: {
		        slidesToShow: 3
		      }
			},
			{
			  breakpoint: 1085,
		      settings: {
		        slidesToShow: 2
		      }
			},
			{
			  breakpoint: 600,
		      settings: {
		        slidesToShow: 1
		      }
			}

		]
	});


	


});
console.log(parseFloat(127.2));
// Google карта 
var cities = document.querySelectorAll(".address__item-city");
function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.querySelector('.address__map-main'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      icon: '../img/geo-icon.png'
    });
	for(let i = 0; i < cities.length; i++){
		cities[i].addEventListener("click", function(){
			map = new google.maps.Map(document.querySelector('.address__map-main'), {
		      zoom: 4,
		      center: {lat: parseFloat(cities[i].getAttribute('data-lat')), lng: parseInt(cities[i].getAttribute('data-lng'))}
		    });
		    marker = new google.maps.Marker({
		      position: {lat: parseFloat(cities[i].getAttribute('data-lat')), lng: parseInt(cities[i].getAttribute('data-lng'))},
		      map: map,
		      icon: '../img/geo-icon.png'
		    });
		});
	}
}
