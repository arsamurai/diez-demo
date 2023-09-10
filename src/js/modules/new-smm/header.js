addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('header')

  const callback = entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        headerContainer.classList.add('active')
      } else {
        headerContainer.classList.remove('active')
      }
    })
  }

  let observer = new IntersectionObserver(callback, {
    rootMargin: '0px',
    threshold: 0,
  })
  observer.observe(document.getElementById('heroEndAnchor'))
})
