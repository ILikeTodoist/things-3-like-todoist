// ==UserScript==
// @name         Things 3 like Todoist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Things 3 like Todoist JavaScript code.
// @author       None of your business
// @match        https://todoist.com/app/*
// @icon         https://www.google.com/s2/favicons?domain=todoist.com
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    const isMarked = el => el && el.dataset.marked === 'true'
    const mark = el => {
        if (!el) return;
        el.dataset.marked = true
    }
    const addIcon = (li, html, jumpToAdder) => {
      let name
      if (!jumpToAdder) {
        name = li.querySelector(".text")
        if (!name || isMarked(name)) return;
      } else name = li

      name.style.display = "inline-flex"

      const svgWrapper = document.createElement('span')

      svgWrapper.style.display = "inline-flex"
      svgWrapper.style.alignItems = "center"
      svgWrapper.style.marginLeft = "-3.5px"
      svgWrapper.style.marginRight = "10px"

      svgWrapper.innerHTML = html
      name.prepend(svgWrapper)

      mark(name)
        return svgWrapper
    }

    const addHeroIconsToSomedayAndAnytime = () => {

        const projectList = document.getElementById("projects_list")
        if (!projectList) return;

        const children = Array.from(projectList.children)

        children[0] && addIcon(children[0], `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 24 24" stroke="#34D399">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
</svg>`)
        children[1] && addIcon(children[1], `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 24 24" stroke="#FBBF24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
</svg>`)
    }
    const inboxYellowCounter = () => {
        const inbox = document.getElementById("filter_inbox")
        if (!inbox) return;
        const small = inbox.querySelector("small")
        if (!small || !small.innerText) {
            small.style.backgroundColor = "transparent"
            return;
        }

        small.style.color = "black"
        small.style.backgroundColor = "#FCD34D"
        small.style.padding = ".5px 12px"
        small.style.borderRadius = "6px"
        small.style.marginRight = "-12px"
        small.style.fontWeight = "700"
        small.style.fontSize = "14px"
    }
    const replicatingAreas = () => {
        let areas = document.querySelectorAll(".indent_1")
        if (!areas) return;

        areas = Array.from(areas)

        areas.forEach(item => {
            addIcon(item, `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
</svg>`)
        })
    }
    const addingIconOfCurrentViewOnMainTitle = () => {
        const current = document.querySelector("li.current")
        if (
            !current ||
            current.classList.contains("indent_2") ||
            current.classList.contains("indent_3") ||
            current.classList.contains("indent_4") ||
            current.classList.contains("indent_5")
        ) return;

        const icons = current.querySelectorAll("svg")
        if (!icons) return;

        let icon

        if (icons.length === 4) {
            icon = icons[2]
        } else if (icons.length === 3) {
            icon = icons[1]
        } else {
            icon = icons[0]
        }
        if (!icon) return;

        const view = document.querySelector(".view_header__content")
        if (!view) return;

        const h1 = view.children[0]
        if (isMarked(h1)) return;

        const text = h1.textContent

        const svgWrapper = document.createElement('span')

        svgWrapper.style.display = "inline-flex"
        svgWrapper.style.alignItems = "center"
        svgWrapper.style.marginLeft = "-3.5px"
        svgWrapper.style.marginRight = "10px"
        // svgWrapper.style.color = "hsla(0,0%,100%,.87)"

        const cloned = icon.cloneNode(true)
        cloned.setAttribute("width", "34")
        cloned.setAttribute("height", "34")
        cloned.style.transform = "translateY(10px)"

        if (text === "Inbox") {
            cloned.style.color = "#5297ff"
        } else if (text.includes("Today")) {
            cloned.style.color = "#FFD400"
        }

        h1.style.transform = "translateY(-12px)"

        svgWrapper.append(cloned)

        h1.prepend(svgWrapper)

        mark(h1)
    }
    const replaceTodayIconWithStar = () => {
        const today = document.getElementById("filter_today")
        if (!today) return;

        const icon = today.querySelector(".item_icon")
        if (!icon) return;

        const link = today.querySelector("a")
        if (!link) return;

        if (isMarked(link)) return;

        icon.remove()
        const item = addIcon(link, `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#FFD400">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
</svg>`, true)

        item.style.marginLeft = "4px"

        mark(link)
    }

    const loop = () => {
        replaceTodayIconWithStar()
        addHeroIconsToSomedayAndAnytime()
        inboxYellowCounter()
        replicatingAreas()
        addingIconOfCurrentViewOnMainTitle()

        requestAnimationFrame(loop)
    }
    loop()
    // setInterval(loop, 2000)
    // requestAnimationFrame(loop)
})();
