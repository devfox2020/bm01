
console.log("bm01.js");

const LOG01 = console.log;

fn01();

function fn01() {
    const ta = getTopadvert();
    appendLink(ta);
}


function getTopadvert() {
    let ta = document.querySelector('script[type="text/topadvert"]');

    ta = ta.innerText;

    ta = ta.split("\n")
        .map(e => e.split(": ", 2))
        .filter(e => e.length == 2)
        .reduce( (m, [k,v]) => {m[k] = v; return m; }, {} );

    LOG01(ta);

    return ta;
}

function appendLink(ta) {
    const links = document.querySelectorAll(".download_lnk");

    let link = links[1];


    const f = link.querySelector(".f").innerText;
    const t = link.querySelector(".t").innerText;

    //const newLink = document.createElement("a");
    const newLink = document.createElement("p");
    newLink.href = link.href;

    const fullName = ta['book_author'] + " - " + t + "." + f;
    newLink.style = "font-weight: bold";
    newLink.innerText = fullName;
    newLink.download = fullName;

    LOG01(newLink);

    link.parentElement.insertBefore(newLink, link.nextSibling);

}

