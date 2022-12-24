console.log("kx01.js");
const LOG01 = console.log;


updateLinks_main();

function updateLinks_main() {
    const ta = getTopadvert();
    const t = getTitle();
    const ft = createFullTitle(ta, t);
    const ls = getLinks();
    ls.forEach( l => {
        updateLink(l.linkElem, joinTitleAndFormat(ft, l.format));
    });
}



function getTopadvert() {
    let topAdvert = document.querySelector('script[type="text/topadvert"]').innerText;
    topAdvert = topAdvert.split("\n")
        .map(e => e.split(": ", 2))
        .filter(e => e.length == 2)
        .reduce( (m, [k,v]) => {m[k] = v; return m; }, {} );
    return topAdvert;
}


function getTitle() {
    const titleElem = document.querySelector('.download_lnk .t');
    const title = titleElem.innerText;
    titleElem.remove();
    return title;
}


function getLinks() {
    const links = [];
    const download_links = document.querySelectorAll('.download_lnk .f');
    download_links.forEach( dl => {
        links.push({
            linkElem: dl.parentElement,
            format: dl.innerText,
            href: dl.parentElement.href,
        })
    });
    return links;
}


function createFullTitle(topAdvert, title) {
    title = title.replace(':', '.');
    let fullTitle = "???";
    if(topAdvert['book_author'] == "Коллектив авторов") {
        fullTitle = title + " (Коллектив авторов).";
    } else {
        fullTitle = topAdvert['book_author'] + " - " + title;
    }
    return fullTitle;
}


function joinTitleAndFormat(title, format) {
    if(format === "djv") format = "djvu";
    const titleAndFormat = title + '.' + format;
    return titleAndFormat;
}


function updateLink(linkElem, fullName) {
    const newElem = document.createElement("p");
    newElem.style = "font-weight: bold; font-size: small;";
    newElem.innerText = fullName;

    const clickFn = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(fullName)
            .then( () => {
                LOG01("clipboard OK");
                event.target.style.color = "green";
            })
            .catch( () => { 
                LOG01("clipboard FAIL");
                event.target.style.color = "red";
            });

        return true;
    };

    newElem.addEventListener('click', clickFn);
    linkElem.addEventListener('click', clickFn);

    insertNodeAfter( linkElem, newElem );
}


function insertNodeAfter(node, newNode) {
    node.parentElement.insertBefore(newNode, node.nextSibling);
}
