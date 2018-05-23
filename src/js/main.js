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



});