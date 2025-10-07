'use strict';

$(function () {
    $('.parallax').parallax({imageSrc: '../image/bg-follow-full.png', speed: .8});
    $('.parallax2').parallax({imageSrc: '../image/bg-follow-full.png', speed: .5});

    const splide = new Splide('#main-slide', {
        pagination: false,
        arrows: false,
        type: 'loop',
        perPage: 3,
        focus: 'center',
        gap: -20,
        width: 1004,
        autoWidth: true,
    });

    const thumbnails = document.getElementsByClassName('thumbnail');
    let current;

    for (let i = 0; i < thumbnails.length; i++) {
        barberList(thumbnails[i], i);
    }

    function barberList(thumbnail, index) {
        thumbnail.addEventListener('click', function () {
            splide.go(index);
        });
    }

    splide.on('mounted move', function () {
        const thumbnail = thumbnails[splide.index];

        if (thumbnail) {
            if (current) {
                current.classList.remove('is-active');
            }

            thumbnail.classList.add('is-active');
            current = thumbnail;
        }
    });

    const thumbnailSlider = new Splide('#thumbnail-slider', {
        autoWidth: true,
        isNavigation: true,
        gap: 10,
        // focus: 'center',
        pagination: false,
        arrows: true,
        keyboard: 'global',
        dragMinThreshold: {
            mouse: 4,
            touch: 10,
        },
    });

    thumbnailSlider.sync(splide);
    thumbnailSlider.mount();
    splide.mount();
})
