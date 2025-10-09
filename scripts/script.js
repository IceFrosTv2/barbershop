'use strict';

$(function () {
  $('.parallax').parallax({imageSrc: '../image/bg-follow-full.png', speed: .8});
  $('.parallax2').parallax({
    imageSrc: '../image/bg-follow-full.png',
    speed: .5
  });
  const thumbnails = document.getElementsByClassName('thumbnail');
  let current;
  ymaps.ready(init);
  let center = [55.9174276443194, 37.99588015321116];

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

  function init() {
    var map = new ymaps.Map("footer-map", {
      center: center,
      zoom: 15,
    });

    let placemark = new ymaps.Placemark(center, {}, {
      iconLayout: 'default#image',
      iconImageHref: '../image/icon-geo.svg',
      iconImageSize: [40, 50],
      iconImageOffset: [-20, -40]
    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    map.geoObjects.add(placemark); // помещаем флажок на карту
  }

});




















