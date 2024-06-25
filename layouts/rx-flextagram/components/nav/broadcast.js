function refreshStylesheet(url, interval) {
    let link = document.querySelector(`link[href^="${url}"]`);
    
    if (!link) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
        link.onload = () => {
            var element = document.getElementById('broadcast-badge');
            if (element && element.hasAttribute('style')) {
                element.removeAttribute('style');
            }
        };
    }
    
    setInterval(() => {
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = `${url}&t=${new Date().getTime()}`;

        newLink.onload = () => {
            link.parentNode.removeChild(link);
            link = newLink;
        };

        document.head.appendChild(newLink);
    }, interval);
}

function refreshJSONP(url, interval) {
    let script = document.querySelector(`script[src^="${url}"]`);
    
    if (!script) {
        script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
    }
    
    setInterval(() => {
        const newScript = document.createElement('script');
        newScript.src = `${url}&t=${new Date().getTime()}`;

        newScript.onload = () => {
            script.parentNode.removeChild(script);
            script = newScript;
        };

        document.head.appendChild(newScript);
    }, interval);
}

function changeLiveBadge(data) {
    if(data.status == "OPEN") {
        var badgeElement = document.getElementById('broadcast-badge');
        if (badgeElement && badgeElement.hasAttribute('style')) {
            badgeElement.removeAttribute('style');
        }

        document.getElementById('broadcast-on').setAttribute("style", "display: block");
        document.getElementById('broadcast-off').setAttribute("style", "display: none");

        var badgeIconElement = document.getElementById('broadcast-icon');
        var oldTitle = badgeIconElement.getAttribute("data-prepend");
        badgeIconElement.setAttribute("title", oldTitle + " - " + data.liveTitle);
        $('#broadcast-icon').tooltipster();
    } else {
        var badgeElement = document.getElementById('broadcast-badge');
        if (badgeElement && !badgeElement.hasAttribute('style')) {
            badgeElement.setAttribute("style", "display: none");
        }

        document.getElementById('broadcast-on').setAttribute("style", "display: none");
        document.getElementById('broadcast-off').setAttribute("style", "display: none");
    }
}