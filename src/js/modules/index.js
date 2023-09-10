import preloaderDesk from '../../assets/images/preloader-desk.gif'
import preloaderMob from '../../assets/images/preloader-mob.gif'

addEventListener('DOMContentLoaded', async () => {
  // Preloader
  const html = document.getElementsByTagName('html')[0]
  const mainPreloader = document.querySelectorAll('.main-preloader')[0]
  const imgDesktop = mainPreloader.querySelector('.main-preloader__desktop')
  const imgMobile = mainPreloader.querySelector('.main-preloader__mobile')
  imgDesktop.setAttribute('src', preloaderDesk)
  imgMobile.setAttribute('src', preloaderMob)

  mainPreloader.children[0].classList.add('white')

  imgMobile.onload = () => {
    setTimeout(() => {
      html.style.overflow = 'auto'
      mainPreloader.classList.add('hide')
      imgDesktop.removeAttribute('src')
      imgMobile.removeAttribute('src')
      mainPreloader.remove()
    }, 3000)
  }

  imgMobile.onerror = () => {
  		mainPreloader.remove()
  }
})
