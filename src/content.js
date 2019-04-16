// content.js

const previewBackgroundImageCount = 7
const previewBackgroundTransitionPeriod = 3000
const previewBackgroundActivePeriod = 30000
let previewBackgroundCurrentImage = 0

// BACKGROUND PREVIEW

const initBackgroundPreview = () => {
  setInterval(() => {
    if (previewBackgroundCurrentImage === previewBackgroundImageCount) {
      previewBackgroundCurrentImage = 0 // reset -> loop
    }
    transitionToNextBackground()
  }, previewBackgroundActivePeriod)
}

const transitionToNextBackground = () => {
  const number = ++previewBackgroundCurrentImage > 9 ? previewBackgroundCurrentImage : `0${previewBackgroundCurrentImage}`
  const backgroundImageUrl = chrome.extension.getURL(`images/background/background_${number}.png`)
  const node = document.querySelector("#sb_bg")
  const div = node || document.createElement("div")
  if (!node) {
    div.id = "sb_bg"
    div.style.background = `url("${backgroundImageUrl}") no-repeat`
    div.style.backgroundSize = "cover"
  } else {
    node.classList.add("fade-out")
    setTimeout(() => {
      div.style.background = `url("${backgroundImageUrl}") no-repeat`
      div.style.backgroundSize = "cover"
      node && node.classList.remove("fade-out")
    }, previewBackgroundTransitionPeriod)
  }
  return div
}

// DOM HELPERS

const createDiscoHowToElement = () => {
  const span = document.createElement("span")
  span.id = "sb_disco_howto"
  span.innerHTML = "<span id='sb_disco_dude'>\u{1F57A}</span> Slack '/kudos @your.mate for being awesome!'" // 🕺
  return span
}


const createDiscoLogoElement = () => {
  const div = document.createElement("div")
  const backgroundImageUrl = chrome.extension.getURL("images/disco.png")
  div.id = "sb_disco_logo"
  div.style.background = `url("${backgroundImageUrl}") no-repeat`
  return div
}

const insertElements = () => {
  const app = document.querySelector("#app")
  app.parentNode.insertBefore(createDiscoHowToElement(), app)
  app.parentNode.insertBefore(transitionToNextBackground(), app)
}

const initTabAutoRefresh = () => {
  const minutes = 60
  setTimeout(() => { window.location.reload(true); }, minutes * 60000)
}

// MAIN

const start = () => {
  console.log("Restyling Disco TV with Custom Theme...")
  initBackgroundPreview()
  insertElements()
  initTabAutoRefresh()
}


chrome
  .storage
  .local
  .get('toggle', data => {
    data.toggle && start()
  })