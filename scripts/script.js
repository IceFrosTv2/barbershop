'use strict';

$(function () {
  $('.parallax').parallax({imageSrc: '../image/bg-follow-full.png', speed: .8});
  $('.parallax2').parallax({
    imageSrc: '../image/bg-follow-full.png',
    speed: .5
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

  // ______Choose service, barber and time_______________________________________________________________________________________
  let clientName = document.getElementById('name');
  let barberName = $('.barber__name');
  let barberNameData = [];
  let priceName = $('.price__name');
  let priceNameData = [];

  // ________Input only letters____________________________________________________________________________________
  clientName.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
  });

  // ________Phone mask____________________________________________________________________________________
  const phone = document.getElementById('phone');
  const phoneOptions = {
    mask: '+{7} (000) 000 - 00 - 00'
  };
  IMask(phone, phoneOptions);

  // ________Select2____________________________________________________________________________________
  $.fn.select2.defaults.set("width", "100%");

  barberName.each(function (index, element) {
    barberNameData.push({
      id: index + 1,
      text: element.textContent.trim(),
    });
  });
  priceName.each(function (index, element) {
    priceNameData.push({
      id: index + 1,
      text: element.textContent.trim()
    });
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


  // _________Date mask and datepicker___________________________________________
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

  // _________Select time options____________________________________________________________________________________
  const select = document.getElementById('select__time');
  const startHour = 10;
  const endHour = 18;
  const intervalMinutes = 30;

  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  // Заполняем select вариантами: 10:00, 10:30, ..., 17:30, 18:00
  for(let hour = startHour; hour <= endHour; hour++) {
    for(let min = 0; min < 60; min += intervalMinutes) {
      // Ограничиваем последний интервал, чтобы не выйти за 18:00
      if(hour === endHour && min > 0) break;

      const option = document.createElement('option');
      option.value = `${pad(hour)}:${pad(min)}`;
      option.textContent = `${pad(hour)}:${pad(min)}`;
      select.appendChild(option);
    }
  }

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
  const barberButton = $('.barber__button ');
  const serviceButton = $('.service__button ');
  let chooseBarber = $('#main-slide');
  let chooseService = $('#inputs-block');

  barberButton.click(function () {

    chooseBarber.animate({opacity: 0}, 500, function () {
      chooseBarber.hide();
      chooseService.animate({opacity: 1}, 500);
      $('.inputs-block').css('display', 'block');
    });
  });

  // serviceButton.click(function () {
  //
  //   chooseService.animate({opacity: 0}, 500, function () {
  //     chooseService.hide();
  //     let submissionForm = $('.submission');
  //
  //     submissionForm.on('blur input', function() {
  //       let isEmpty = $(this).val().trim() === '';
  //       // $(this).parent().toggleClass('error', isEmpty);
  //     });
  //   })
  // })


  // _____________________________________________________________________________________________


});




















