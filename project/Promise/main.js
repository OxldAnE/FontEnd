const action = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' },
  { transform: 'rotate(0) scale(1)' },
]

const times = {
  duration: 1000,
}

const images = document.querySelectorAll('img')

images[0].animate(action, times).
  finished.
  then(() => images[1].animate(action, times).finished).
  then(() => images[2].animate(action, times).finished).
  catch(error => console.error(`Error img${error}`))

