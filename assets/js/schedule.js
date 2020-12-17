const { createLoremIpsum, dateConverter } = require("./helpers")
require("bootstrap");
const createEl = require("./domMethods");


$(document).ready(function () {
    // DOM manipulation code specific to each page.
    // })


    // if (window.location.href.indexOf("schedule") > -1) {

    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();

    function onEventClick(calEvent) {

        const start = dateConverter(calEvent.start);
        localStorage.setItem("currentEvent", JSON.stringify({
            title: calEvent.title,
            subtitle: start,
            description: calEvent.description,
            image: calEvent.image
        }))

        // window.location.href = "events.html"

        }


        const pageEl = document.querySelector("#page");

        function createCards(events) {
            const cards = events.map((event) => (
                createEl("div", { class: "card-body clickable", onClick: () => onEventClick(event) },
                    createEl("h5", { class: "card-title" }, event.title || ""),
                    createEl("p", { class: "card-text" }, event.description || createLoremIpsum()),
                    createEl("hr")
                )
            ))
            return cards
        }

        const containerEl1 = createEl("div", { class: "container mt-5" },
            createEl("div", { class: "card mb-5" },
                createEl("h5", { class: "card-header" }, "Day 1"),
                ...createCards(events.slice(0, 3))
            )
        )

        const containerEl2 = createEl("div", { class: "container" },
            createEl("div", { class: "card mb-5" },
                createEl("h5", { class: "card-header" }, "Day 2"),
                ...createCards(events.slice(3, 6))
            )
        )

        const containerEl3 = createEl("div", { class: "container" },
            createEl("div", { class: "card mb-5" },
                createEl("h5", { class: "card-header" }, "Day 3"),
                ...createCards(events.slice(6, 9))
            )
        )

        pageEl.appendChild(containerEl1);
        pageEl.appendChild(containerEl2);
        pageEl.appendChild(containerEl3);

    })