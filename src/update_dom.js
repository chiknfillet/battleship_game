function initialize() {
  const body = document.querySelector('body')

  const header = document.createElement('header')
  header.textContent = 'Battleship'
  const main = document.createElement('main')
  main.textContent = 'aasd'
  const footer = document.createElement('footer')
  footer.textContent = 'Developed by Marlex C. Estores'

  body.appendChild(header)
  body.appendChild(main)
  body.appendChild(footer)
}

export {initialize}