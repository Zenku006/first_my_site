document.addEventListener("DOMContentLoaded", () => {
    // Получаем элементы
    var burgerBtn = document.getElementById("burger-btn");
    var navLinks = document.getElementById("nav-links");

    // Функция переключения меню
    function toggleMenu() {
        navLinks.classList.toggle("active"); // Показываем/скрываем меню
        burgerBtn.classList.toggle("active"); // Анимация кнопки
    }

    // Привязываем событие клика
    burgerBtn.addEventListener("click", toggleMenu);
});

// Скролл

var headerEl = document.getElementById("header");
var isHeaderMini = false;

window.addEventListener("scroll", function () {
    var scrollPos = window.scrollY;

    if (scrollPos >= 1 && !isHeaderMini) {
        headerEl.classList.add("header_mini");
        isHeaderMini = true;
    } else if (scrollPos < 1 && isHeaderMini) {
        headerEl.classList.remove("header_mini");
        isHeaderMini = false;
    }
});


// var observer = new IntersectionObserver(
//     ([entry]) => {
//         if (!entry.isIntersecting) {
//             header.classList.add("header_mini");
//         } else {
//             header.classList.remove("header_mini");
//         }
//     },
//     { threshold: [0] }
// );

// observer.observe(document.body);



// Логика перевода

document.addEventListener("DOMContentLoaded", () => {
    var langButtons = document.querySelectorAll(".lang-btn");
    var elementsToTranslate = document.querySelectorAll("[data-lang-key]");

    // Функция для смены языка
    function switchLanguage(lang) {
        // Проверяем, есть ли переводы для выбранного языка
        if (translations[lang]) {
            // Обновляем текст для всех элементов с data-lang-key
            elementsToTranslate.forEach((el) => {
                var key = el.getAttribute("data-lang-key");
                if (translations[lang][key]) {
                    el.innerHTML = translations[lang][key];
                }
            });

            // Обновляем src для iframe, если они есть на текущей странице
            if (iframeData[lang]) {
              var iframe1 = document.getElementById("iframe-1");
              var iframe2 = document.getElementById("iframe-2");

              if (iframe1) iframe1.src = iframeData[lang].iframe1;
              if (iframe2) iframe2.src = iframeData[lang].iframe2;
          }

            // Сохраняем текущий язык в localStorage
            localStorage.setItem("language", lang);

        }
    }

    // Устанавливаем язык при загрузке страницы
    var savedLanguage = localStorage.getItem("language") || "en";
    switchLanguage(savedLanguage);

    // Добавляем обработчики событий для кнопок
    langButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            var selectedLang = btn.getAttribute("data-lang");
            switchLanguage(selectedLang);
        });
    });
});


// Слайдер

var sliderTrack = document.querySelector('.slider-track');
var slides = Array.from(document.querySelectorAll('.slide'));
var prevButton = document.querySelector('.slider-button.prev');
var nextButton = document.querySelector('.slider-button.next');
var dotsContainer = document.querySelector('.slider-dots');

var currentIndex = 0;
var autoSlideInterval;

// Создаём точки навигации
slides.forEach((_, index) => {
  var dot = document.createElement('div');
  dot.classList.add('slider-dot');
  if (index === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

var dots = Array.from(document.querySelectorAll('.slider-dot'));

function updateSliderPosition() {
  var offset = -currentIndex * 100;
  sliderTrack.style.transform = `translateX(${offset}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Добавляем обработчики событий для точек
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSliderPosition();
    resetAutoSlide();
  });
});

// Кнопки "вперёд" и "назад"
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
  updateSliderPosition();
  resetAutoSlide();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
  updateSliderPosition();
  resetAutoSlide();
});

// Автоматическое пролистывание
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateSliderPosition();
  }, 3000); // Интервал в миллисекундах
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Запускаем автоматическое пролистывание
startAutoSlide();

// Логика перевода аудио

// Найдем кнопки переключения языка
var langButtons = document.querySelectorAll('.lang-btn');

// Добавим обработчики на каждую кнопку
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        var selectedLang = button.getAttribute('data-lang'); // Получаем язык из кнопки
        updateAudioSources(selectedLang); // Меняем аудио
    });
});

// Функция для изменения языка в пути
function updateAudioSources(language) {
    // Находим все аудиоэлементы
    var audioElements = document.querySelectorAll('audio');

    audioElements.forEach(audio => {
        var source = audio.querySelector('source'); // Находим <source> внутри <audio>
        var currentSrc = source.getAttribute('src'); // Текущий путь

        // Меняем часть пути с языком
        var newSrc = currentSrc.replace(/\/(ru|en|uk)\//, `/${language}/`);

        // Устанавливаем новый путь
        source.setAttribute('src', newSrc);

        // Перезагружаем аудио
        audio.load();
    });
}