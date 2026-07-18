"use strict";

function Paperview() {
    const LoadStylesheet = (url) => {
        const cssLinkElement = document.createElement('link');
        cssLinkElement.rel = 'stylesheet';
        cssLinkElement.type = 'text/css';
        cssLinkElement.media = 'all';
        cssLinkElement.href = url;
        document.getElementsByTagName('head')[0].appendChild(cssLinkElement);
    }
  
    // callback that will replace document content with readable version
    const MakeReadable = () => {   
        
        var documentCopy = document.cloneNode(true);
        var article = new Readability(documentCopy).parse();
        document.title = article.title;

        // strip stray styling from the html tag itself
        var htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.removeAttribute("class");
        htmlTag.removeAttribute("style");

        // reset head to nothing but paperview's stylesheet
        document.head.innerHTML = "";
        LoadStylesheet('//charsi.github.io/paperview/paperview.css');

        // reset body html to nothing but reformatted content  
        document.body.removeAttribute("class");
        document.body.removeAttribute("style");
        document.body.innerHTML = `<h1>${article.title}</h1>${article.content}`;
    };

    // load readability script and set it to be applied when loaded
    const ppvScriptElement = document.createElement('script');
    ppvScriptElement.type='text/javascript';
    ppvScriptElement.src='//cdn.jsdelivr.net/npm/@mozilla/readability@0.6.0/Readability.min.js';
    
    ppvScriptElement.onreadystatechange = MakeReadable;
    ppvScriptElement.onload = MakeReadable;
    document.getElementsByTagName('head')[0].appendChild(ppvScriptElement);

    // Bind arrow keys for navigation
    document.addEventListener("keyup", (o) => {
        switch (o.key) {
            case "ArrowRight":
                window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
                break;
            case "ArrowLeft":
                window.scrollBy({ top: -1 * window.innerHeight, behavior: "smooth" });
        }
    });
};
