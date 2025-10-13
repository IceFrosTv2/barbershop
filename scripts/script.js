'use strict';

$(function () {
  $('.parallax').parallax({imageSrc: '../image/bg-follow-full.png', speed: .8});
  $('.parallax2').parallax({
    imageSrc: '../image/bg-follow-full.png',
    speed: .5
  });
  // ______Choose service, barber and time_______________________________________________________________________________________
  let clientName = document.getElementById('name');
  let barberName = $('.barber__name');
  let barberNameData = [];
  let priceName = $('.price__name');
  let priceNameData = [];
  $.fn.select2.defaults.set("width", "100%");

  clientName.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
  });

  barberName.each(function (index, element) {
    barberNameData.push({
      id: index + 1,
      text: element.innerText.trim(),
    });
    console.log(barberNameData)
  });
  priceName.each(function (index, element) {
    priceNameData.push({
      id: index + 1,
      text: element.innerText.trim()
    });
    console.log(priceNameData)
  });

  $('.select__service').select2({
    placeholder: 'Выберите услугу',
    minimumResultsForSearch: Infinity,
    data: priceNameData,
    dropdownAutoWidth: true,
    allowClear: true,
  });
  $('.select__master').select2({
    placeholder: 'Выберите мастера',
    minimumResultsForSearch: Infinity,
    data: barberNameData,
    allowClear: true,
  });
  $('.select__time').select2({
    placeholder: 'Выберите время',
    minimumResultsForSearch: Infinity,
    allowClear: true,
  });

  const phone = document.getElementById('phone');
  const phoneOptions = {
    mask: '+{7} (000) 000 - 00 - 00'
  };
  IMask(phone, phoneOptions);

  IMask(
    document.getElementById('date'),
    {
      mask: Date,
      lazy: true,
      autofix: true,
      // min: new Date(2025, 0, 1),
      // max: new Date(2026, 0, 1),
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          placeholderChar: 'd',
          from: 1,
          to: 31,
          maxLength: 2
        },
        m: {
          mask: IMask.MaskedRange,
          placeholderChar: 'm',
          from: 1,
          to: 12,
          maxLength: 2
        },
        Y: {
          mask: IMask.MaskedRange,
          placeholderChar: 'y',
          from: 1900,
          to: 2999,
          maxLength: 4
        }
      },
    }
  )

  $('#date').datepicker({
    format: "dd.mm.yyyy",
    todayBtn: "linked",
    language: "ru",
    autoclose: true,
    todayHighlight: true
  });

  // _________slider carousel____________________________________________________________________________________
  const thumbnails = document.getElementsByClassName('thumbnail');
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
  // _______Yandex Maps______________________________________________________________________________________
  let current;
  ymaps.ready(init);
  let center = [55.9174276443194, 37.99588015321116];

  function init() {
    const map = new ymaps.Map("footer-map", {
      center: center,
      zoom: 15,
    });

    const placemark = new ymaps.Placemark(center, {}, {
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

  // _______Barber button click______________________________________________________________________________________

  $('.barber.is-active .barber__button ').click(function () {
    let chooseBarber = $('#main-slide');
    let chooseService = $('#inputs-block');

    chooseBarber.animate({opacity: 0}, 500, function () {
      chooseBarber.hide();
      chooseService.animate({opacity: 1}, 500);
      $('.inputs-block').css('display', 'block');
    });

  });


  // _____________________________________________________________________________________________


});




















