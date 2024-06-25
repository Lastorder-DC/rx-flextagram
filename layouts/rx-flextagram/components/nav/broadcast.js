function refreshStylesheet(url, interval) {
    let link = document.querySelector(`link[href="${url}"]`);
    
    if (!link) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
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