// ==UserScript==
// @name         Things 3 like Todoist
// @namespace    http://tampermonkey.net/
// @version      0.2
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
      svgWrapper.style.marginRight = "6px"

      svgWrapper.innerHTML = html
      name.prepend(svgWrapper)

      mark(name)
        return svgWrapper
    }

    const addHeroIconsToSomedayAndAnytime = () => {

        const projectList = document.getElementById("projects_list")
        if (!projectList) return;

        const children = Array.from(projectList.children)

        children[0] && addIcon(children[0], `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 20 20" fill="#34D399">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>`)
        children[1] && addIcon(children[1], `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 20 20" fill="#FBBF24">
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
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

        areas.forEach((item, index) => {
            addIcon(item, `
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>`)

            if (index > 1) {
                item.style.marginTop = "12px"
            }
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
        cloned.setAttribute("width", "40")
        cloned.setAttribute("height", "40")
        cloned.style.transform = "translateY(9px)"

        if (text === "Inbox") {
            cloned.style.color = "#5297ff"
        } else if (text.includes("Today")) {
            cloned.style.color = "#FFD400"
        }

        h1.style.transform = "translateY(-12px)"
        h1.style.fontSize = "32px"

        svgWrapper.append(cloned)

        h1.prepend(svgWrapper)

        mark(h1)
    }
    const replaceDefaultIcons = () => {
        const replaceDefaultIcon = (iconSvg, id) => {
            const el = document.getElementById(id)
            if (!el) return;

            let icon = el.querySelector(".item_icon")
            if (!icon) return;

            const link = el.querySelector("a")
            if (!link) return;

            if (isMarked(link)) return;

            icon.remove()
            const item = addIcon(link, iconSvg, true)

            item.style.marginLeft = "4px"

            mark(link)
        }

        const icons = [
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="#FFD400">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>`,
                filter: "filter_today",
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 20 20" fill="#a970ff">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>`,
                filter: "filter_upcoming",
            },
        ]

        icons.forEach(item => replaceDefaultIcon(item.icon, item.filter))

        const el = document.getElementById("filter_inbox")
        if (!el) return;

        let icon = el.querySelector(".item_icon")
        if (!icon) return;

        if (isMarked(el)) return;

        icon.remove()
        const item = addIcon(el, `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 20 20" fill="#5297ff">
                  <path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd" />
                </svg>`, true)

        el.style.display = "flex"
        item.style.marginLeft = "4px"

        mark(el)
    }
    const increasingFontSizeAndAddingProperFontWeightOnMenuItems = () => {
        const areas = document.querySelectorAll(".indent_1")
        if (!areas) return;

        const filters = document.querySelectorAll(".filter")
        if (!filters) return;

        const sideMenuItems = [...Array.from(areas), ...Array.from(filters)]
        sideMenuItems.forEach(item => {
            const text = item.querySelector(".name") || item.querySelector(".item_content")

            text.style.fontSize = "17px"
            text.style.fontWeight = "600"
        })
    }

    const loop = () => {
        replaceDefaultIcons()
        addHeroIconsToSomedayAndAnytime()
        inboxYellowCounter()
        replicatingAreas()
        addingIconOfCurrentViewOnMainTitle()
        increasingFontSizeAndAddingProperFontWeightOnMenuItems()


        requestAnimationFrame(loop)
    }
    loop()
    // setInterval(loop, 2000)
    // requestAnimationFrame(loop)
})();
