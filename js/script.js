const intro_callout = () => {
  let callout = document.querySelector('.callout')
  let timeToCallout = setTimeout(() => {
    callout.classList.add('show')
  },5000)
  window.addEventListener('scroll', (e) => {
    clearTimeout(timeToCallout)
    callout.classList.remove('show')
  })
}

beardy(data)
intro_callout()
