// Подключение функционала "Чертогов Фрилансера"
// import { log } from 'gulp-util';
// import { lightGalleryCoreSettings } from 'lightgallery/lg-settings.js';
import {
  isMobile,
  menuClose,
  menuOpen,
  _slideUp,
  _slideDown,
  closeAllSubMenus,
  bodyLock,
  bodyUnlock,
  bodyLockToggle,
  bodyLockStatus,
} from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';
// import { log } from 'gulp-util';

// document.addEventListener('DOMContentLoaded', () => {

// Находим хедер
const header = document.querySelector('.header');

// Функция для проверки скролла
const onScroll = () => {
  if (window.scrollY > 0) {
    header.classList.add('header_scrolled'); // Добавляем класс, если прокручено
  } else {
    header.classList.remove('header_scrolled'); // Убираем класс, если на самом верху
  }
};

// Слушаем событие прокрутки
window.addEventListener('scroll', onScroll);
// Вызываем сразу, чтобы учесть положение при загрузке
onScroll();

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.createElement('div');
  overlay.classList.add('image-popup-overlay');

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('image-popup-overlay__close', '_icon-close');
  closeButton.setAttribute('aria-label', 'Закрыть');

  overlay.appendChild(closeButton);
  document.body.appendChild(overlay);

  const lockBodyScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  const unlockBodyScroll = () => {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  let scale = 1;
  let startDistance = 0;
  let currentImg = null;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;

  const calculateDistance = (touches) => {
    const [touch1, touch2] = touches;
    const deltaX = touch1.pageX - touch2.pageX;
    const deltaY = touch1.pageY - touch2.pageY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  document.querySelectorAll('.enlargeable-img').forEach((img) => {
    img.addEventListener('click', () => {
      const enlargedImg = img.cloneNode(true);
      overlay.innerHTML = '';
      overlay.appendChild(closeButton);
      overlay.appendChild(enlargedImg);
      scale = 1;
      translateX = 0;
      translateY = 0;
      enlargedImg.style.transform = `translate(0, 0) scale(${scale})`;
      overlay.style.display = 'flex';
      lockBodyScroll();
      currentImg = enlargedImg;
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeButton) {
      overlay.style.display = 'none';
      unlockBodyScroll();
      currentImg = null;
    }
  });

  overlay.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2 && currentImg) {
      startDistance = calculateDistance(e.touches);
    } else if (e.touches.length === 1 && currentImg && scale > 1) {
      const touch = e.touches[0];
      startX = touch.pageX - translateX;
      startY = touch.pageY - translateY;
    }
  });

  overlay.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && currentImg) {
      const currentDistance = calculateDistance(e.touches);
      const zoomFactor = currentDistance / startDistance;
      const newScale = Math.max(1, Math.min(zoomFactor, 3));

      if (newScale === 1) {
        translateX = 0;
        translateY = 0;
      }

      scale = newScale;
      currentImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    } else if (e.touches.length === 1 && currentImg && scale > 1) {
      const touch = e.touches[0];
      translateX = touch.pageX - startX;
      translateY = touch.pageY - startY;
      const maxTranslateX = (currentImg.offsetWidth * (scale - 1)) / 2;
      const maxTranslateY = (currentImg.offsetHeight * (scale - 1)) / 2;
      translateX = Math.min(
        Math.max(translateX, -maxTranslateX),
        maxTranslateX
      );
      translateY = Math.min(
        Math.max(translateY, -maxTranslateY),
        maxTranslateY
      );
      currentImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
  });

  overlay.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      startDistance = 0;
    }
  });

  window.addEventListener('resize', () => {
    overlay.style.display = 'none';
    unlockBodyScroll();
    currentImg = null;
  });
});

// // новый
// document.addEventListener('DOMContentLoaded', () => {
//   const overlay = document.createElement('div');
//   overlay.classList.add('image-popup-overlay');

//   const closeButton = document.createElement('button');
//   closeButton.type = 'button';
//   closeButton.classList.add('image-popup-overlay__close', '_icon-close');
//   closeButton.setAttribute('aria-label', 'Close');

//   document.body.appendChild(overlay);
//   overlay.appendChild(closeButton);

//   const lockBodyScroll = () => {
//     document.body.style.overflow = 'hidden';
//     document.body.style.touchAction = 'none';
//   };

//   const unlockBodyScroll = () => {
//     document.body.style.overflow = '';
//     document.body.style.touchAction = '';
//   };

//   let scale = 1;
//   let startDistance = 0;
//   let currentImg = null;
//   let startX = 0;
//   let startY = 0;
//   let translateX = 0;
//   let translateY = 0;

//   const calculateDistance = (touches) => {
//     const [touch1, touch2] = touches;
//     const deltaX = touch1.pageX - touch2.pageX;
//     const deltaY = touch1.pageY - touch2.pageY;
//     return Math.sqrt(deltaX ** 2 + deltaY ** 2);
//   };

//   document.querySelectorAll('.enlargeable-img').forEach((img) => {
//     img.addEventListener('click', () => {
//       overlay.innerHTML = '';
//       overlay.appendChild(closeButton);

//       const enlargedImg = img.cloneNode(true);
//       enlargedImg.style.transform = `translate(0, 0) scale(1)`;
//       enlargedImg.style.transition = 'transform 0.2s ease-out';

//       overlay.appendChild(enlargedImg);
//       overlay.style.display = 'flex';

//       scale = 1;
//       translateX = 0;
//       translateY = 0;
//       currentImg = enlargedImg;

//       lockBodyScroll();
//     });
//   });

//   const closeOverlay = () => {
//     overlay.style.display = 'none';
//     unlockBodyScroll();
//     currentImg = null;
//   };

//   overlay.addEventListener('click', (e) => {
//     if (e.target === overlay || e.target === closeButton) {
//       closeOverlay();
//     }
//   });

//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && currentImg) {
//       closeOverlay();
//     }
//   });

//   overlay.addEventListener('touchstart', (e) => {
//     if (e.touches.length === 2 && currentImg) {
//       startDistance = calculateDistance(e.touches);
//     } else if (e.touches.length === 1 && currentImg && scale > 1) {
//       const touch = e.touches[0];
//       startX = touch.pageX - translateX;
//       startY = touch.pageY - translateY;
//     }
//   });

//   overlay.addEventListener('touchmove', (e) => {
//     if (currentImg) {
//       if (e.touches.length === 2) {
//         const currentDistance = calculateDistance(e.touches);
//         scale = Math.max(
//           1,
//           Math.min(3, (currentDistance / startDistance) * scale)
//         );

//         if (scale === 1) {
//           translateX = 0;
//           translateY = 0;
//         }

//         currentImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
//       } else if (e.touches.length === 1 && scale > 1) {
//         const touch = e.touches[0];
//         translateX = touch.pageX - startX;
//         translateY = touch.pageY - startY;

//         const maxTranslateX = (currentImg.offsetWidth * (scale - 1)) / 2;
//         const maxTranslateY = (currentImg.offsetHeight * (scale - 1)) / 2;

//         translateX = Math.min(
//           Math.max(translateX, -maxTranslateX),
//           maxTranslateX
//         );
//         translateY = Math.min(
//           Math.max(translateY, -maxTranslateY),
//           maxTranslateY
//         );

//         currentImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
//       }
//     }
//   });

//   overlay.addEventListener('touchend', () => {
//     startDistance = 0;
//   });

//   window.addEventListener('resize', () => {
//     closeOverlay();
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.school-slider');

  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll('.school-slider__slide');
    const prevBtn = slider.querySelector('.school-slider__arrow_prev');
    const nextBtn = slider.querySelector('.school-slider__arrow_next');

    if (!slides.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    const showSlide = (index) => {
      slides.forEach((slide) => slide.classList.remove('is-active'));
      slides[index].classList.add('is-active');
    };

    prevBtn.addEventListener('click', () => {
      currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      showSlide(currentIndex);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const priceSlider = document.querySelector('.price__slider');

  if (!priceSlider) return;

  const track = priceSlider.querySelector('.price__track');
  const cards = priceSlider.querySelectorAll('.price-card');
  const prevBtn = priceSlider.querySelector('.price__arrow_prev');
  const nextBtn = priceSlider.querySelector('.price__arrow_next');
  const currentEl = priceSlider.querySelector('.price__counter-current');
  const totalEl = priceSlider.querySelector('.price__counter-total');

  if (!track || !cards.length || !prevBtn || !nextBtn || !currentEl || !totalEl)
    return;

  let currentIndex = 0;

  totalEl.textContent = cards.length;

  const getCardStep = () => {
    const card = cards[0];
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;

    return card.offsetWidth + gap;
  };

  const updateSlider = () => {
    const step = getCardStep();

    track.scrollTo({
      left: currentIndex * step,
      behavior: 'smooth',
    });

    currentEl.textContent = currentIndex + 1;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
  };

  prevBtn.addEventListener('click', () => {
    if (currentIndex === 0) return;

    currentIndex -= 1;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex === cards.length - 1) return;

    currentIndex += 1;
    updateSlider();
  });

  track.addEventListener('scroll', () => {
    const step = getCardStep();
    const index = Math.round(track.scrollLeft / step);

    if (index !== currentIndex) {
      currentIndex = Math.max(0, Math.min(index, cards.length - 1));
      currentEl.textContent = currentIndex + 1;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === cards.length - 1;
    }
  });

  window.addEventListener('resize', updateSlider);

  updateSlider();
});
