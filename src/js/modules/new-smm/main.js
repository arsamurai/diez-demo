import swipers from './swiper'
import threeModel from './three'

import preloaderDesk from '../../../assets/images/new-smm/preloader-desk.gif'
import preloaderMob from '../../../assets/images/new-smm/preloader-mob.gif'

const getModal = name => {
  return document?.querySelector(`[data-modal=${name}]`)
}

const setModalState = (btn, menu, activate) => {
  const action = activate ? 'add' : 'remove'

  btn?.classList[action]('open')
  menu?.classList[action]('active')
}

const goTo = sectionId => {
  const top = document.getElementById(sectionId)?.offsetTop
  window?.scrollTo({
    top,
    behavior: 'smooth',
  })
}

const addProgramAccordion = windowWidth => {
  const btns = document.querySelectorAll('[data-accordion-button]')
  const bodies = document.querySelectorAll('[data-accordion-body]')
  const mobile = windowWidth < 1200

  if(mobile) {
    btns.forEach(btn => {
      btn.setAttribute('data-bs-toggle', 'collapse')
    })
    bodies.forEach(body => {
      body.classList.remove('show')
    })
  } else {
    btns.forEach(btn => {
      btn.removeAttribute('data-bs-toggle')
    })
    bodies.forEach(body => {
      body.classList.add('show')
    })
  }
}

addEventListener('DOMContentLoaded', async () => {
  // buttons
  const burgerBtn = document.querySelector('[data-burger-btn]')
  const reserveButtons = document.querySelectorAll('[data-reserve-btn]')
  const forWhomSlideNavigation = document.querySelectorAll('[data-forWhom-slide]')

  // redirect links
  const scrollLinks = document.querySelectorAll('[data-scroll-to]')

  // modals
  const burgerMenu = getModal('menu')
  const reserveModal = getModal('reserve')
  //
  // // Preloader
  // const html = document.getElementsByTagName("html")[0];
  // const smmPreloader = document.querySelectorAll(".smm-preloader")[0];
  // const imgDesktop = smmPreloader.querySelector(".smm-preloader__desktop");
  // const imgMobile = smmPreloader.querySelector(".smm-preloader__mobile");
  // imgDesktop.setAttribute("src", preloaderDesk);
  // imgMobile.setAttribute("src", preloaderMob);
  //
  // imgMobile.onload = () => {
  //   setTimeout(() => {
  //     html.style.overflow = "auto";
  //     smmPreloader.classList.add("hide");
  //     imgDesktop.removeAttribute("src");
  //     imgMobile.removeAttribute("src");
  //     smmPreloader.remove();
  //   }, 4000);
  // }

  burgerBtn?.addEventListener('click', ({ currentTarget }) => {
    const isActiveMenu = currentTarget.classList.contains('open')

    if (isActiveMenu) {
      setModalState(currentTarget, burgerMenu, false)
      setModalState(currentTarget, reserveModal, false)
    } else {
      setModalState(currentTarget, burgerMenu, true)
    }
  })

  reserveButtons.forEach(reserveBtn => {
    reserveBtn.addEventListener('click', _ => {
      setModalState(burgerBtn, reserveModal, true)
    })
  })

  burgerMenu?.addEventListener('click', ({ target, currentTarget }) => {
    const parent = target.closest('.menu__sidebar_wrapper')
    if (!parent) {
      setModalState(burgerBtn, currentTarget, false)
    }
  })

  scrollLinks.forEach(link => {
    link.addEventListener('click', ({ currentTarget }) => {
      const sectionId = currentTarget.getAttribute('data-scroll-to').replace('#', '')
      setModalState(burgerBtn, burgerMenu, false)
      goTo(sectionId)
    })
  })

  // three js
  const { rotateRight, rotateLeft } = await threeModel.init()

  // sliders
  const swiper = swipers.forWhomSwiper()
  swipers.problemsSwiper()
  swipers.speakersSwiper()
  swipers.communitySwiper()

  forWhomSlideNavigation.forEach(btn => {
    btn.addEventListener('click', ({ currentTarget }) => {
      const isNext = currentTarget.getAttribute('data-forWhom-slide') === 'next'
      if (isNext) {
        rotateRight()
      } else {
        rotateLeft()
      }
    })
  })

  swiper.on('touchEnd', e => {
    if (e.swipeDirection === 'prev') {
      rotateRight()
    }
    if (e.swipeDirection === 'next') {
      rotateLeft()
    }
  })

  const resultContainer = document.getElementById('result')

  let index = 1
  const resultTitles = ['сммити', 'продавати', 'організовувати']
  const resultDescriptions = [
    'на рівні senior.',
    'свої послуги дорого та системно навіть під час війни.',
    'роботу над проєктами так, щоб не потопати в дедлайнах та не вигоряти.',
  ]

  resultContainer.addEventListener('click', ({ currentTarget }) => {
    const hide = [{ opacity: '1' }, { opacity: '0' }]
    const show = [{ opacity: '0' }, { opacity: '1' }]
    const timing = {
      duration: 450,
      iterations: 1,
    }

    const content = currentTarget.querySelector('.result__content')
    const circles = currentTarget.querySelector('.bg-circles').children
    const title = currentTarget.querySelector('h3.result__main-title')
    const desc = currentTarget.querySelector('p.result__desk')
    ;[...circles].forEach((circle, idx, array) => {
      circle.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)' },
          { transform: `translate(-50%, -50%) scale(${1 + (array.length - idx) * 0.03})` },
          { transform: 'translate(-50%, -50%) scale(1)' },
        ],
        {
          duration: (array.length - idx) * 100 + 250,
          iterations: 1,
          delay: idx * 200,
        },
      )
    })

    const player = content.animate(hide, timing)
    player.onfinish = () => {
      desc.innerText = resultDescriptions[index % 3]
      title.innerText = resultTitles[index % 3]
      content.animate(show, timing)
      index++
    }
  })

  // Dino-game
  function debounce(callee, timeoutMs = 175) {
    let lastCall = 0
    let lastCallTimer

    return function perform(...args) {
      const currentTime = Date.now()

      if (lastCall && currentTime - lastCall <= timeoutMs) {
        clearTimeout(lastCallTimer)
      }

      lastCall = currentTime
      lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
    }
  }

  let i = 1
  const dinoGame = document.querySelector('[data-dino-game]')
  const dinoGameInfo = document.querySelectorAll('[data-dino-info]')
  const dinoBtn = document.querySelector('[data-dino-btn]')

  function dinoMove() {
    if (i !== 4) {
      i++
    } else {
      i = 1
    }

    dinoGame.classList.remove('step-1', 'step-2', 'step-3', 'step-4')
    dinoGameInfo.forEach(item => {
      item.classList.remove('active')
    })
    dinoGame.classList.add(`step-${i}`)
    const stepInfos = document.querySelectorAll(`.step-info-${i}`)
    stepInfos.forEach(item => {
      item.classList.add('active')
    })
  }

  dinoBtn.addEventListener('click', debounce(dinoMove))

  // Program Accordion
  const windowWidth = window.innerWidth
  addProgramAccordion(windowWidth)
})

addEventListener('resize', () => {
  const windowWidth = window.innerWidth
  addProgramAccordion(windowWidth)
})
