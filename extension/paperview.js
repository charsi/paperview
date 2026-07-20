"use strict";

require('Readability.min.js')
const MakeReadable = async () => {   
    
    const documentCopy = document.cloneNode(true);
    const article = new Readability(documentCopy).parse();
    document.title = article.title;

    // strip stray styling from the html tag itself
    const htmlTag = document.getElementsByTagName("html")[0];
    htmlTag.removeAttribute("class");
    htmlTag.removeAttribute("style");

    // reset head to nothing but paperview's stylesheet
    document.head.innerHTML = "";

    // reset body html to nothing but reformatted content  
    document.body.removeAttribute("class");
    document.body.removeAttribute("style");
    document.body.innerHTML = `<h1>${article.title}</h1>${article.content}`;

    await document.body.requestFullscreen({ screen: primaryScreen });
};

// register keys
document.addEventListener("keyup", (o) => {
    switch (o.key) {
        case "ArrowRight":
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
            break;
        case "ArrowLeft":
            window.scrollBy({ top: -1 * window.innerHeight, behavior: "smooth" });
    }
});

MakeReadable();