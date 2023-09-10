import $ from 'jquery'
import 'slick-slider/slick/slick'

import preloaderDesk1 from '../../../assets/images/brand/preloader-desk1.gif'
import preloaderMob1 from '../../../assets/images/brand/preloader-mob1.gif'

$(document).ready(function () {
  const peculiaritiesSlider = $('.peculiarities-items')
  let i = 1
  let $windowWidth = $(window).width()

  if ($windowWidth <= 550) {
    $('.about-brand-item').on('click', aboutItemSettings)
  }

  function aboutItemSettings() {
    const aboutItem = $('.about-brand-item')
    const selectedItem = $(this)

    if (selectedItem.hasClass('active')) {
      selectedItem.removeClass('active')
    } else {
      aboutItem.removeClass('active')
      selectedItem.addClass('active')
    }
  }

  function debounce(callee, timeoutMs = 175) {
    return function perform(...args) {
      let previousCall = this.lastCall
      this.lastCall = Date.now()
      if (previousCall && this.lastCall - previousCall <= timeoutMs) {
        clearTimeout(this.lastCallTimer)
      }
      this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
    }
  }

  function dinoMove() {
    if (i !== 4) {
      i++
      $('.dino-game').removeClass('step-1 step-2 step-3 step-4')
      $('.dino-game__info').removeClass('active')
      $('.dino-game').addClass(`step-${i}`)
      $(`.step-info-${i}`).addClass('active')
    } else {
      i = 1
      $('.dino-game').removeClass('step-1 step-2 step-3 step-4')
      $('.dino-game__info').removeClass('active')
      $('.dino-game').addClass(`step-${i}`)
      $(`.step-info-${i}`).addClass('active')
    }
  }

  $('.dino-game__btn').on('click', debounce(dinoMove))

  function slickify() {
    peculiaritiesSlider.slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '.slider-pagination__peculiarities .slider-pagination__arrow_prev',
      nextArrow: '.slider-pagination__peculiarities .slider-pagination__arrow_next',
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 991,
          settings: 'unslick',
        },
      ],
    })
  }

  slickify()

  $(window).resize(function () {
    let $windowWidth = $(window).width()
    if ($windowWidth <= 991) {
      slickify()
    }
    if ($windowWidth <= 550) {
      $('.about-brand-item').on('click', aboutItemSettings)
    }
  })

  $(window).on('scroll', function () {
    let w_top = $(window).scrollTop()
    let w_height = $(window).height()

    const animateSvg = (selector, w_top, w_height) => {
      const svg = $(selector)
      const svgHeight = svg.offset().top
      const svgOuterHeight = svg.outerHeight()
      if (w_top + w_height > svgHeight && w_top < svgHeight + svgOuterHeight) {
        svg.addClass('animate')
      }
    }

    animateSvg('.speakers-info__svg-desktop', w_top, w_height)
    animateSvg('.speakers-info__svg-mobile', w_top, w_height)
    animateSvg('.course-bottom__svg-desktop', w_top, w_height)
    animateSvg('.course-bottom__svg-mobile', w_top, w_height)
  })

  // Preloader
  const html = document.getElementsByTagName("html")[0];
  const brandPreloader = document.querySelectorAll(".brand-preloader")[0];
  const imgDesktop = brandPreloader.querySelector(".brand-preloader__desktop");
  const imgMobile = brandPreloader.querySelector(".brand-preloader__mobile");
  imgDesktop.setAttribute("src", preloaderDesk1);
  imgMobile.setAttribute("src", preloaderMob1);

  setTimeout(() => {
    html.style.overflow = "auto";
    brandPreloader.classList.add("hide");
    imgDesktop.removeAttribute("src");
    imgMobile.removeAttribute("src");
    brandPreloader.remove();
  }, 6000);

  // CURSOR
  $('#personal-brand-page').prepend('<div class="cursor-dot-outline"></div>')
  $('#personal-brand-page').prepend('<div class="cursor-dot"></div>')

  const cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: window.innerWidth / 2,
    endY: window.innerHeight / 2,
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function () {
      this.dotSize = this.$dot.offsetWidth
      this.outlineSize = this.$outline.offsetWidth

      this.setupEventListeners()
      this.animateDotOutline()
    },

    setupEventListeners: function () {
      var self = this

      function addToggleCursorSize(el, self) {
        el.addEventListener('mouseover', function () {
          self.cursorEnlarged = true
          self.toggleCursorSize()
        })
        el.addEventListener('mouseout', function () {
          self.cursorEnlarged = false
          self.toggleCursorSize()
        })
      }

      document.querySelectorAll('a').forEach(function (el) {
        addToggleCursorSize(el, self)
      })
      document.querySelectorAll('button').forEach(function (el) {
        addToggleCursorSize(el, self)
      })
      document.querySelectorAll('.about-brand-item').forEach(function (el) {
        addToggleCursorSize(el, self)
      })

      document.querySelectorAll('.slider-pagination__arrow').forEach(function (el) {
        addToggleCursorSize(el, self)
      })

      document.addEventListener('mousedown', function () {
        self.cursorEnlarged = true
        self.toggleCursorSize()
      })

      document.addEventListener('mouseup', function () {
        self.cursorEnlarged = false
        self.toggleCursorSize()
      })

      document.addEventListener('mousemove', function (e) {
        self.cursorVisible = true
        self.toggleCursorVisibility()

        self.endX = e.clientX
        self.endY = e.clientY
        self.$dot.style.top = self.endY + 'px'
        self.$dot.style.left = self.endX + 'px'
      })

      document.addEventListener('mouseenter', function (e) {
        self.cursorVisible = true
        self.toggleCursorVisibility()
        self.$dot.style.opacity = 1
        self.$outline.style.opacity = 1
      })

      document.addEventListener('mouseleave', function (e) {
        self.cursorVisible = true
        self.toggleCursorVisibility()
        self.$dot.style.opacity = 0
        self.$outline.style.opacity = 0
      })
    },

    animateDotOutline: function () {
      var self = this

      self._x += (self.endX - self._x) / self.delay
      self._y += (self.endY - self._y) / self.delay
      self.$outline.style.top = self._y + 'px'
      self.$outline.style.left = self._x + 'px'

      requestAnimationFrame(this.animateDotOutline.bind(self))
    },

    toggleCursorSize: function () {
      var self = this
      if (self.cursorEnlarged) {
        self.$dot.style.transform = 'translate(-50%, -50%) scale(4)'
        self.$outline.style.transform = 'translate(-50%, -50%) scale(0)'
      } else {
        self.$dot.style.transform = 'translate(-50%, -50%) scale(1)'
        self.$outline.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    },

    toggleCursorVisibility: function () {
      var self = this

      if (self.cursorVisible) {
        self.$dot.style.opacity = 1
        self.$outline.style.opacity = 1
      } else {
        self.$dot.style.opacity = 0
        self.$outline.style.opacity = 0
      }
    },
  }

  cursor.init()
})
