let notesEl

function blockScroll() {
  document.body.classList.add('scrollBarHidden')
}
function unblockScroll() {
  document.body.classList.remove('scrollBarHidden')
}
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth
}
function addStyle() {
  const scrollbarWidth = getScrollbarWidth()

  // block body scroll if mouse is over notes block
  if (notesEl) {
    notesEl.addEventListener('mouseenter', blockScroll)
    notesEl.addEventListener('mouseleave', unblockScroll)
  }

  const style = document.createElement('style')
  style.setAttribute('id', 'ud-rearrange-components')

  const css = /* css */ `
  body.scrollBarHidden {
    overflow-y: hidden !important;
    width:  ${window.innerWidth - scrollbarWidth}px !important;
  }
  .ud-app-loader main > div > div:nth-child(2) {
    display: none;
  }
  .ud-app-loader main > div > div:nth-child(3) {
    position: fixed !important;
    left: 75% !important;
    bottom: 0 !important;
    width: 25% !important;
    background-color: white !important;
    z-index: 2;
    height: calc(100vh - 56px);
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }
  body.scrollBarHidden .ud-app-loader main > div > div:nth-child(3) {
    left: ${(window.innerWidth - scrollbarWidth) * 0.75}px !important;
    width: ${(window.innerWidth - scrollbarWidth) * 0.25}px !important;
  }
  .ud-app-loader main > div > div, p, span {
    font-size: 14px !important;
  }
  `

  style.innerHTML = css

  document.head.append(style)
}

function removeStyle(sStyle) {
  sStyle.parentNode.removeChild(sStyle)

  if (notesEl) {
    notesEl.removeEventListener('mouseenter', blockScroll)
    notesEl.removeEventListener('mouseleave', unblockScroll)
  }
}

window.addEventListener('resize', () => {
  const sStyle = document.getElementById('ud-rearrange-components')
  if (sStyle) {
    removeStyle(sStyle)
  }
})

chrome.runtime.onMessage.addListener((message) => {
  const sStyle = document.getElementById('ud-rearrange-components')
  notesEl = document.querySelector(
    '.ud-app-loader main > div > div:nth-child(3)'
  )

  // remove if style has already set
  if (sStyle) {
    removeStyle(sStyle)

    return true
  }

  addStyle()

  return true
})
