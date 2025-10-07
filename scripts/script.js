'use strict';

$(function () {
    $('.parallax').parallax({imageSrc: '../image/bg-follow-full.png', speed: .8});
    $('.parallax2').parallax({imageSrc: '../image/bg-follow-full.png', speed: .5});

    $('.barber__list').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true,
        variableWidth: true,
        infinite: false,
        dots: false,
        asNavFor: '.arrows__list',
    });
    $('.arrows__list').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.barber__list',
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        variableWidth: true,
        infinite: true,
    })
})
