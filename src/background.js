// background.js

var toggle = false

const init = () => {
    getToggle(toggle => {
        if (toggle) {}
        setToggle(toggle, () => {
            update(toggle)
        })
    })
}

const getToggle = callback => {
    chrome
        .storage
        .local
        .get("toggle", data => {
            if (data.toggle === undefined) {
                callback(true)
            } else {
                callback(data.toggle)
            }
        })
}

const setToggle = (value, callback) => {
    chrome
        .storage
        .local
        .set({
            toggle: value
        }, () => {
            if (chrome.runtime.lastError) {
                throw Error(chrome.runtime.lastError)
            } else {
                callback()
            }
        })
}

const disable = () => {
    chrome
        .browserAction
        .setIcon({
            path: "images/icon_inactive.png"
        })
}

const enable = () => {
    chrome
        .browserAction
        .setIcon({
            path: "images/icon_active.png"
        })
}

const update = toggle => {
    if (toggle) {
        enable()
    } else {
        disable()
    }
}

chrome
    .browserAction
    .onClicked
    .addListener(function (tab) {
        getToggle(function (toggle) {
            toggle = !toggle
            setToggle(toggle, function () {
                update(toggle)
            })
        })
    })

init()