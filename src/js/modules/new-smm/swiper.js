import Swiper, { EffectCoverflow, EffectFade, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-fade'

const swipers = {
  problemsSwiper: () =>
    new Swiper('.problems__swiper', {
      slidesPerView: 1.25,
      spaceBetween: 14,
      loop: true,
      allowTouchMove: false,
      modules: [Navigation],
      navigation: {
        nextEl: '.problems__swiper-btn',
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
          allowSlideNext: false
        },
      },
    }),
  forWhomSwiper: () =>
    new Swiper('.forWhom__swiper', {
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      effect: 'coverflow',
      loop: true,
      modules: [Navigation, EffectCoverflow],
      coverflowEffect: {
        scale: 0.8,
        stretch: 10,
        depth: 50,
        rotate: -10,
        slideShadows: false,
        modifier: 1,
      },
      navigation: {
        nextEl: '.slider-btn.next',
        prevEl: '.slider-btn.prev',
      },
    }),
  speakersSwiper: () =>
    new Swiper('.speakers__swiper', {
      slidesPerView: 1.25,
      slidesPerGroup: 1,
      spaceBetween: 14,
      centeredSlides: false,
      loop: true,
      grabCursor: true,
      modules: [Navigation],
      navigation: {
        nextEl: '.slider-btn.next',
        prevEl: '.slider-btn.prev',
      },
      breakpoints: {
        576: {
          slidesPerGroup: 2,
          slidesPerView: 2,
          centeredSlides: false,
        },
        992: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 28,
          centeredSlides: false,
        },
      },
    }),
  communitySwiper: () =>
    new Swiper('.community__phones-swiper', {
      slidesPerView: 1,
      effect: 'fade',
      loop: true,
      modules: [Navigation, EffectFade],
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: '.slider-btn.next',
        prevEl: '.slider-btn.prev',
      },
    }),
}

export default swipers
