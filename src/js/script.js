$(document).ready(() => {
	$('select').selectric();

	$('#header nav>ul>li>a').hover(function(){
		if($.is_mobile)return;
		const a = $(this);
		const li = $(this).parent();
		if(!a.hasClass('active')){
			$('#header nav>ul>li>a.active').removeClass('active');
			li.find('>ul').css('padding-left',li.position().left+5);
			li.find('>ul>div').css('left',$('#header nav>ul>li:last').position().left+5);
			a.addClass('active');
		}
	},$.noop);
	$('#header .navbar').hover($.noop,function(){
		if($.is_mobile)return;
		$('#header nav>ul>li>a.active').removeClass('active');
	}); 


	//tabs
	$("body").on("click", ".tabs[data-target] > *:not(.active)", function (e) {
		e.preventDefault();
		const tab_parent = $(this).closest(".tabs"),
			target = tab_parent.attr("data-target");
		if (tab_parent.length > 0 && target) {
			const tab = $(this),
				tabs = tab_parent.find(">*"),
				index = tabs.index(tab),
				content = $(target).find(">*");

			tabs.removeClass("active");
			content.removeClass("active");

			tab.addClass("active");
			content.eq(index).addClass("active");
		}
	});

	//popups
	$("body").on("click", ".open_popup", function (e) {
		e.preventDefault();
		if ($(this).attr("data-target")) {
			$($(this).attr("data-target")).openPopup();
		}
	});

	$("body").on("click", ".popup button.close", function (e) {
		e.preventDefault();
		$(this).closest(".popup").closePopup();
	});

	$("body").on("click", ".open-popup", function (e) {
		e.preventDefault();
		if ($(this).attr("data-target")) $($(this).attr("data-target")).openPopup();
	});

	$("body").on("click", ".side_popup button.close", function (e) {
		e.preventDefault();
		$(this).closest(".side_popup").closePopup();
	});

	$("[data-match-height]").each(function () {
		$(this).find($(this).attr("data-match-height")).matchHeight();
	});

	const media = window.matchMedia("(max-width: 991px)");
	mobileSupport(media);
	media.addListener(mobileSupport);

	$('body').on('click', '.open_side_menu', function () {
		$('.side_menu').addClass('animate');
		setTimeout(() => $('.side_menu').addClass('active'), 1);
		$('body').addClass('disable_scroll');
	});

	$('body').on('click', '.side_popup .header .close', function () {
		const popup = $(this).closest('.side_popup');
		popup.removeClass('active');
		setTimeout(() => popup.removeClass('animate'), 400);
		$('body').removeClass('disable_scroll');
	});

	$(".bg_overlay").click(function(){
		$(".side_menu").removeClass('active');
		$('body').removeClass('disable_scroll');
	});

	$("form.validation").validationEngine({
    showPrompts:false,
    addFailureCssClassToField:"error"
  });

  var $window = $(window);
  if ($window.width() < 991) {
	$('body').on('click', '.open_mobile_menu', function () {
		$('.mobile_menu').addClass('animate');
		setTimeout(() => $('.mobile_menu').addClass('active'), 1);
		$('body').addClass('disable_scroll');
	});
	
	$('body').on('click', '.mobile_popup .header .close', function () {
		const popup = $(this).closest('.mobile_popup');
		popup.removeClass('active');
		setTimeout(() => popup.removeClass('animate'), 400);
		$('body').removeClass('disable_scroll');
	});
	
	$(".bg_overlay").click(function(){
		$(".mobile_menu").removeClass('active');
		$('body').removeClass('disable_scroll');
	  });

	  $(".open_side_menu").click(function(){
		$(".mobile_menu").removeClass('active');
		$('body').removeClass('disable_scroll');
	  });
  } 

  //mobile-menu nav
	$("body").on("click", ".m_nav li:has(ul) .m_nav_link", function (e) {
		e.preventDefault();
		$(".m_nav .m_subnav").slideUp(),
			$(this).next().is(":visible") || $(this).next().slideDown(),
			e.stopPropagation();
	});

	if ($(".partners").length > 0) {
		tns({
			container: ".partners .slider",
			controlsText: ["", ""],
			loop: false,
			autoplay: true,
			autoplayButton: false,
			mouseDrag: true,
			touch: true,
			responsive: {
				0: {
					items: 2.3,
					gutter: 15,
				},
				550: {
					items: 2,
				},
				767: {
					items: 3,
				},
				"992": {
					items: 3,
					gutter: 20,
				},
				"1230": {
					items: 6,
					gutter: 20,
				},
			},
		});
	}

	if ($(".blog_detail_page").length > 0) {
		tns({
			container: ".blog_detail_page .slider",
			controlsText: ["", ""],
			loop: false,
			touch: true,
			mouseDrag: true,
			responsive: {
				0: {
					items: 1,
					gutter: 15,
				},
				550: {
					items: 2,
				},
				"992": {
					items: 3,
					gutter: 30,
				},
			},
		});
	}

	if ($(".home_slider").length > 0) {
		$(window)
			.resize(() => {
				$(".home_slider .item").each(function () {
					const img = $(this).find(">img");
					const desc = $(this).find(">.container>div>.desc");
					const dor = desc.offset().left + desc.width() + 10;
					img.removeClass("center").removeAttr("style");
					if (!$.is_mobile && dor > img.offset().left) {
						img.addClass("center").css("left", dor);
					}
				});
			})
			.trigger("resize");
		$(document).on("mobile_on", () => {
			$(".home_slider .item >img").removeClass("center").removeAttr("style");
		});
		$(document).on("mobile_off", () => {
			$(window).trigger("resize");
		});
	}

	$("[data-mask]").each(function () {
		const type = $(this).data("mask");
		switch (type) {
			case "phone":
				$(this).inputmask({
					showMaskOnHover: false,
					mask: "0*-###-##-##",
					oncomplete: function () {
						const p = $(this).parent();
						if (!p.find("i.success").length)
							$("<i/>").addClass("success").appendTo(p);
						p.addClass("success");
					},
					onincomplete: function () {
						$(this).parent().removeClass("success");
					},
					definitions: {
						"#": {
							validator: "[0-9]",
							cardinality: 1,
							casing: "lower",
						},
						"*": {
							validator: "(10|50|51|55|60|70|77|99)",
							cardinality: 2,
							prevalidator: [{ validator: "[15679]", cardinality: 1 }],
						},
					},
				});
				break;
			case "numeric":
			case "integer":
				$(this).inputmask(type, { rightAlign: false });
				break;
			case "cur":
				$(this).inputmask({
					suffix: " " + $(this).data("currency"),
					groupSeparator: ",",
					alias: "numeric",
					placeholder: "0",
					autoGroup: !0,
					digits: 2,
					digitsOptional: !1,
					clearMaskOnLostFocus: !1,
					rightAlign: false,
				});
				break;
		}
	});

	var numberSpinner = (function () {
		$(".number-spinner>.ns-btn>a").click(function () {
			var btn = $(this),
				input = btn.closest(".number-spinner").find("input"),
				max = input.attr("max") * 1,
				min = input.attr("min") * 1,
				oldValue = input.val().trim(),
				newVal = 0;
	
			if (btn.attr("data-dir") === "up") {
				newVal = parseInt(oldValue) + 1;
			} else {
				if (oldValue > 0) {
					newVal = parseInt(oldValue) - 1;
				} else {
					newVal = 0;
				}
			}
	
			if (newVal <= max && newVal >= min) input.val(newVal);
		});
		$(".number-spinner>input").keypress(function (evt) {
			evt = evt ? evt : window.event;
			var charCode = evt.which ? evt.which : evt.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57)) {
				return false;
			}
			return true;
		});
		$(".number-spinner>input").blur(function () {
			var input = $(this),
				max = input.attr("max") * 1,
				min = input.attr("min") * 1,
				val = input.val().trim();
	
			if (val > max) input.val(max);
			if (val < min) input.val(min);
		});
	})();

	var num =70; 

	$(window).bind('scroll', function () {
	if ($(window).scrollTop() > num) {        
		$('.navbar').addClass('fixed');
		$('.side_menu .popup_inner').addClass('margin');
	} else {
		$('.navbar').removeClass('fixed')
		$('.side_menu .popup_inner').removeClass('margin');
	}

	});

	if($('.basket').length>0)$('#footer').addClass('white');

	$('#message').keyup(function () {
		var max = 99;
		var len = $(this).val().length;
		if (len >= max) {
			$('#message_label').addClass('hide');
		} else {
		  var char = max - len;
		  $('#message_label').removeClass('hide');
		}
	  });

});

$.is_mobile = false;
const mobileSupport = (media) => {
	if (media.matches) {
		$.is_mobile = true;

		$(document).trigger("mobile_on");
	} else {
		$.is_mobile = false;

		$(document).trigger("mobile_off");
	}
};
$.fn.openPopup = function () {
	const elem = $(this);
	if (elem.length > 0) {
		const opened_popup = $(".popup").filter(".show");

		if (opened_popup.length) opened_popup.closePopup();
		$("body").addClass("disable_scroll");
		elem.addClass("show");
		setTimeout(() => elem.addClass("animate"), 1);
		elem.trigger("openPopup");
	}
};
$.fn.closePopup = function () {
	const elem = $(this);
	if (elem.length > 0) {
		elem.removeClass("animate");
		setTimeout(() => elem.removeClass("show"), 400);
		elem.trigger("closePopup");
		$("body").removeClass("disable_scroll");
	}
};