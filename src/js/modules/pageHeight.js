addEventListener('DOMContentLoaded', () => {
  let intervalId

  window.scrollTo(0, +localStorage.getItem('page_scroll'))

  window.addEventListener('scroll', ({ currentTarget }) => {
    if (intervalId) {
      clearTimeout(intervalId)
    }

    intervalId = setTimeout(() => {
      localStorage.setItem('page_scroll', currentTarget.scrollY)
    }, 200)
  })
})
