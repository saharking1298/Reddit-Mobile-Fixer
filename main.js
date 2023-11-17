function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            attributes: true,
            attributeFilter: ['class'],
            subtree: true
        });
    });
}

function fixReddit () {
    // Hiding NSFW warning
    const warningEls = document.getElementsByTagName("xpromo-nsfw-blocking-modal");
    for (let el of warningEls) {
        el.remove();
    }
    // Hiding page NSFW blur
    const tempEl = document.getElementsByTagName("reddit-breadcrumbs")[0];
    if (tempEl) {
        tempEl.nextElementSibling.style.filter = "";
    }

    // Hiding "See this post in app" warning
    waitForElement(".XPromoPopupRpl").then(el => {
        el.remove();
        setTimeout(() => {
            document.body.classList.remove("scroll-disabled");
        }, 1000);
    });
    waitForElement("body.scroll-disabled").then(el => {
        el.classList.remove("scroll-disabled");
    });
    

    // Making page scrollable
    document.body.style.overflow = "scroll";
}

window.addEventListener('load', fixReddit);