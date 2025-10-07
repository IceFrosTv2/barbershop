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
        width: 1004,
        autoWidth: true,
    });

    const thumbnailSlider = new Splide('#thumbnail-slider', {
        autoWidth: true,
        isNavigation: true,
        gap: 10,
        pagination: false,
        arrows: true,
        keyboard: 'global',
        rewind: true,
    });

    splide.sync(thumbnailSlider);
    splide.mount();
    thumbnailSlider.mount();

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

})
