'use strict';

$(function () {
  // ________Parallax____________________________________________________________________________________
  $('.parallax').parallax({imageSrc: '../image/bg-follow-full.png', speed: .8});
  $('.parallax2').parallax({
    imageSrc: '../image/bg-follow-full.png',
    speed: .5
  });

  // ________Phone mask____________________________________________________________________________________
  const phone = document.getElementById('phone');

  const phoneMask = IMask(phone, {
    mask: '+{7} (000) 000 - 00 - 00'
  });

  phoneMask.on('accept', function() {
    checkInput($('#phone'));
  });

  // _______Input validation______________________________________________________________________________________
  let selectInputs = $('.select__input');

  function checkInput(inputValidate) {
    let hasError;
    if (inputValidate.is('select')) {
      // Для селекта проверяем, что выбранное значение не пустое
      hasError = inputValidate.val() === null || inputValidate.val() === '';
    } else if (inputValidate.attr('id') === 'phone') {
      // Для телефона проверяем, что введено 11 цифр
      hasError = phoneMask.unmaskedValue.length !== 11;
    } else {
      // Для обычных инпутов проверяем пустоту текста
      hasError = inputValidate.val().trim() === '';
    }

    // let hasError = inputValidate.is('select')
    //   ? (inputValidate.val() === null || inputValidate.val() === '')
    //   : inputValidate.val().trim() === '';

    inputValidate.parent().toggleClass('error', hasError);
    return hasError;
  }

  selectInputs.on('blur input change', function () {
    checkInput($(this));
  });

  function validateForm() {
    let isValid = true;
    selectInputs.each(function () {
      if (checkInput($(this))) isValid = false;
    });
    return isValid;
  }


  // ______Choose service, barber and time_______________________________________________________________________________________
  let clientName = document.getElementById('name');
  let barberName = $('.barber__name');
  let barberNameData = [];
  let priceName = $('.price__name');
  let priceNameData = [];

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

  // _________slider carousel____________________________________________________________________________________
  let current;
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

  // ________Input only letters____________________________________________________________________________________
  clientName.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
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
  const selectTime = document.getElementById('select-time');
  const startHour = 10;
  const endHour = 18;
  const intervalMinutes = 30;

  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  // Заполняем select вариантами: 10:00, 10:30, ..., 17:30, 18:00
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let min = 0; min < 60; min += intervalMinutes) {
      // Ограничиваем последний интервал, чтобы не выйти за 18:00
      if (hour === endHour && min > 0) break;

      const option = document.createElement('option');
      option.value = `${pad(hour)}:${pad(min)}`;
      option.textContent = `${pad(hour)}:${pad(min)}`;
      selectTime.appendChild(option);
    }
  }

  // _______Yandex Maps______________________________________________________________________________________
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
      chooseService.animate({opacity: 1}, 500).css('display', 'block');
    });
  });

  serviceButton.click(function () {
    let loader = $('.loader-background');
    let inputsBlock = $('.inputs-block__form');

    const service = document.getElementById('select-service');
    const barber = document.getElementById('select-a-master');
    const date = document.getElementById('date');

    if (validateForm()) {
      loader.css('display', 'flex');
      $.ajax({
        method: 'POST',
        url: 'https://testologia.ru/checkout',
        data: {
          name: clientName.value.trim(),
          phone: phone.value.trim(),
          service: service.value,
          barber: barber.value,
          date: date.value,
          time: selectTime.value,
        }
      })
        .done(function (message) {
          loader.hide();
          if (message.success) {
            inputsBlock.animate({opacity: 0}, 500, function () {
              inputsBlock.hide();
              $('.inputs-block__title').text('Спасибо что выбрали Strong Club!');
              $('.thanks-block__description').css('display', 'block');
              $('.service__button').css('display', 'none');
            })
          } else {
            alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
          }
        });
    } else {
      return false;
    }
  })

  // ____________Close button click_________________________________________________________________________________
  $('.close-button').click(function () {
    chooseService.animate({opacity: 0}, 500, function () {
      chooseService.hide();
      chooseBarber.animate({opacity: 1}, 500).css('display', 'block');
    });
  })

});