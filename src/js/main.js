$(document).ready(function(){
	//// Адаптивное меню  ////

	$(".header .menu__btn, .menu__title").click(function(){
		$(this).siblings(".header__menu-list").slideToggle(300, function(){
			if($(this).css("display") === "none"){
				$(this).removeAttr("style");
			} 
		});
	});
	// При изменении размеров окна атрибут style удаляется у меню,
	// чтобы меню могло вернуться в исходное положение
	$(window).resize(function(){
		$('.menu__list').removeAttr("style");
	})

	////  Открытие/закрытие записи блога ////

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

	////  Форма поиска на сайте ////

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


	////  Чекбокс для поиска в новостях ////

	$(".checkbox-field").click(function(){
		if($(this).children(".checkbox-field__checkbox").prop("checked") === false){
			$(this).children(".checkbox-field__checkbox").prop("checked", true);
			$(this).addClass("checkbox-field--checked");	
		} else {
			$(this).children(".checkbox-field__checkbox").prop("checked", false);
			$(this).removeClass("checkbox-field--checked");
		}
	});

	///// Слайдер для страницы контактов ////

	$(".address__slider").slick({
		slidesToShow: 1
	});


	//// Табы(вкладки) для схемы работы со слайдером ////

	// Линия, которая перемещается под элементами
	var $tabLine = $(".scheme__tab-underline");

	// При загрузке страницы линия становится на место под первым пунктом
	$tabLine.css("width", $(document.querySelector(".scheme__tab")).width());
	$(".scheme__tab").first().addClass("scheme__tab--active");

	// Первый пункт активен и виден пользователю
	$($(".scheme__group")[0]).addClass("scheme__group--active");

	// При клике на один из пунктов линия становится под этот пункт
	$(".scheme__tab").on("click", moveUnderlineTab);
	function moveUnderlineTab(){
		var leftPos = $(this).position().left;
		var widthLine = $(this).width();

		// Индекс, чтобы связать со слайдером сверху
		var indexOfTab = $(this).attr("data-index");
		var marginTabs = 20;

		$(".scheme__group").removeClass("scheme__group--active");

		// Очищение активного класса у всех элементов, 
		// чтобы затем добавить его к текущему пункту
		$('.scheme__tab').removeClass("scheme__tab--active");

		if($(window).width() <= 550){
			// top у линии(обводки снизу) равен позиции элемента по отношению 
			// к родителю + его высота, минус 6 - это высота самой обводки
			var topPos = $(this).position().top + $(this).outerHeight() - 6;
			$($tabLine).css("top", topPos);
			// В медиа прописаны margin слева и справа для элементов
			// при экранах меньше чем 550. Поэтому к ширине добавляем эти margin
			widthLine += marginTabs;
		};

		// Для слайдера с заданным индексом добавляем класс
		// чтобы он появился
		$($(".scheme__group")[indexOfTab]).addClass("scheme__group--active");
		// Делаем вкладку активной и перемещаем обводку снизу
		$(this).addClass("scheme__tab--active");
		$($tabLine).css("left", leftPos);
		$($tabLine).css("width", widthLine);
	}
	//// Слайдер с иконками ////

	// Функция для изменения прозрачности в слайдере - страницы 'Услуги' 
	function addOpacitySlick(){
		// Добавляем всем класс с прозрачностью 25%
	    $(".scheme__group .slick-slide").addClass("opacity_025");
		// Очищаем все классы для элементов
		$('.scheme__group .slick-slide').removeClass('opacity_08');
		$('.scheme__group .slick-slide').removeClass('opacity_06');
		// У текущего(посередине) элемента убираем все классы
		// Чтобы он был с прозрачностью 100%
		$('.scheme__group .slick-current').removeClass(["opacity_06", "opacity_08", "opacity_025"])

		// Добавляем следующему и предыдущему элменту
		// после текущего прозрачность в 80%
		$('.scheme__group .slick-current').next().addClass("opacity_08");
		$('.scheme__group .slick-current').prev().addClass("opacity_08");


		//прозрачность в 60%
	    $('.scheme__group .slick-current').next().next().addClass("opacity_06");
	    $('.scheme__group .slick-current').prev().prev().addClass("opacity_06");
	};

	$(".scheme__group").on("init", addOpacitySlick);
	// Активация слайдера для Схемы работы
	$(".scheme__group").slick({
		slidesToShow: 7,
		centerMode: true,
		focusOnSelect: true,
		responsive: 
		[{
		  breakpoint: 1100,
	      settings: {
	        slidesToShow: 5
	      }
		},
		{
		  breakpoint: 800,
	      settings: {
	        slidesToShow: 3
	      }
	    },
	    {
	    	breakpoint: 500,
	    	settings: {
	    		slidesToShow: 1,
	    		centerMode: true
	    	}
	    }]
	});
	$(".scheme__group").on("afterChange", addOpacitySlick);	

	// Если в слайдере недостаточно слайдов (меньше 7)
	// то мы перемещаем его в центр и убираем возможность 
	// сделать фокус на элемент
	function centerIfNotASlider(){
		var g = 0;
		for(var i = 0; i < $('.scheme__group').length; i++){
			var $groupSlides = $('.scheme__group .slick-track')[i];
			if($($groupSlides).children().length <= 7) {
				$($groupSlides).addClass("without-translate");	
				$($groupSlides).children().addClass("scheme__item-usual");
			} else {
				console.log(g++);
			}
		};	
	};
	centerIfNotASlider();
	$(window).resize(centerIfNotASlider);

	//// Слайдер с прогресс барами вместо точек ////
	var valueOfDashOffset = 60;
	var timerProgressBar; // Таймер для прогресс баров
	var svgCircle = "<svg width='25' height='24' xmlns='http://www.w3.org/2000/svg''><circle class='circle' r='8.5' cx='11' cy='10' stroke='rgba(255, 255, 255, 1)' fill='transparent' stroke-width='3' stroke-dasharray='60' stroke-dashoffset='60'></circle></svg>";
	//Слайдер с прогресс баром снизу
	$(".progress-slider").on('init', moveSlidesWithProgressCircle);
	$(".progress-slider").slick({
		dots: true
	});
	//  Вставка svg прогресс бара для слайд точекера
	$(".progress-slider").on('beforeChange', function(){
		$(".progress-slider .slick-dots li").children("svg").remove();
		clearInterval(timerProgressBar);
	});
	$(".progress-slider").on('afterChange', moveSlidesWithProgressCircle);

	function moveSlidesWithProgressCircle(){
		clearInterval(timerProgressBar);
		$('.progress-slider .slick-dots .slick-active').append(svgCircle);
		var $circle = $('.progress-slider .slick-dots .slick-active').children("svg").children(".circle")[0];
		var value = valueOfDashOffset;
		timerProgressBar = setInterval(function(){
			$($circle).attr("stroke-dashoffset", value);	
			value-=0.4;	
			if($($circle).attr("stroke-dashoffset") <= 6) {
				clearInterval(timerProgressBar);
				$('.progress-slider').slick('slickNext');
			}
		}, 70);
	}

	//// Слайдер для направлений с мальеньким размером ////
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
//// Google карта  ////
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
