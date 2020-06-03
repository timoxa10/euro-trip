$( document ).ready(function() {
  $(".slider-single").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    adaptiveHeight: true,
    infinite: false,
    useTransform: true,
    speed: 400,
    cssEase: "cubic-bezier(0.77, 0, 0.18, 1)"
  });

  $(".slider-nav").on("init", function (event, slick) {
    $(".slider-nav .slick-slide.slick-current").addClass("is-active");
  })
  .slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: false,
    focusOnSelect: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  $(".slider-single").on("afterChange", function (event, slick, currentSlide) {
    $(".slider-nav").slick("slickGoTo", currentSlide);
    var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
    $(".slider-nav .slick-slide.is-active").removeClass("is-active");
    $(currrentNavSlideElem).addClass("is-active");
  });

  $(".slider-nav").on("click", ".slick-slide", function (event) {
    event.preventDefault();
    var goToSingleSlide = $(this).data("slick-index");
    $(".slider-single").slick("slickGoTo", goToSingleSlide);
  });

  $( ".list__info--greece" ).on( "click", function() {
    $('.slick-slide:eq(0)').click();
  });
  $( ".list__info--albania" ).on( "click", function() {
    $('.slick-slide:eq(1)').click();
  });
  $( ".list__info--macedonia" ).on( "click", function() {
    $('.slick-slide:eq(2)').click();
  });
  $( ".list__info--montenegro" ).on( "click", function() {
    $('.slick-slide:eq(3)').click();
  });
  $( ".list__info--croatia" ).on( "click", function() {
    $('.slick-slide:eq(4)').click();
  });
});
