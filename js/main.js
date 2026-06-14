// JS propio de Carchic. Mantener al mínimo: BidJS gestiona toda la lógica de subasta.

// Login hero: solo visible en #!/login
function syncLoginHero() {
  var hero = document.getElementById('carchic-login-hero')
  if (!hero) return
  hero.hidden = location.hash !== '#!/login'
}
window.addEventListener('hashchange', syncLoginHero)
syncLoginHero()

// Hero carousel: solo visible en inicio (hash vacío o #!/)
function syncCarouselHero() {
  var carousel = document.querySelector('.carchic-hero-carousel')
  if (!carousel) return
  var hash = location.hash
  carousel.hidden = hash !== '' && hash !== '#' && hash !== '#!/'
}
window.addEventListener('hashchange', syncCarouselHero)
syncCarouselHero()

// Hero carousel
;(function () {
  var track = document.querySelector('.carchic-carousel-track')
  if (!track) return
  var dots = document.querySelectorAll('.carchic-carousel-dot')
  var current = 0
  var count = 3
  var timer

  function goTo(index) {
    current = (index + count) % count
    track.style.transform = 'translateX(-' + (current * 100 / count) + '%)'
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === current)
    })
  }

  function start() {
    timer = setInterval(function () { goTo(current + 1) }, 10000)
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      clearInterval(timer)
      goTo(i)
      start()
    })
  })

  start()
})()

document.querySelector('.carchic-menu-toggle').addEventListener('click', function () {
  document.querySelector('.menu-carchic-desktop').classList.toggle('is-open')
})

// Animaciones de entrada (scroll-triggered)
const animObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      animObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.carchic-animate').forEach(function (el) {
  animObserver.observe(el)
})
