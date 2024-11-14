window.setInterval(function() {
    actualDaySpan = document.querySelector("footer > p > span");
    var d = new Date();

    var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    actualDaySpan.innerHTML = datestring;
})


var summary = document.querySelector("main > div.summary > ul");
document.addEventListener("DOMContentLoaded", function() {
    var articles = document.querySelectorAll("main > article, main > article > div > article");
    articles.forEach(function(article) {
        processArticle(article, 0);
    });  
});

function processArticle(article, padding) {
    var id = article.getAttribute('id');
    if (id) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + id;

        li.style.marginLeft = padding + 'px';
        a.textContent = id.replace("-", " ");
        li.appendChild(a);
        summary.appendChild(li);
    }
    var children = Array.from(article.children).filter(function(child) {
        return child.tagName.toLowerCase() === 'article' || (child.tagName.toLowerCase() === 'div' && child.querySelector('article'));
    });
    children.forEach(function(child) {
        if (child.tagName.toLowerCase() === 'div') {
            var nestedArticles = child.querySelectorAll('article');
            nestedArticles.forEach(function(nestedArticle) {
                processArticle(nestedArticle, padding + 20);
            });
        } else {
            processArticle(child, padding + 20);
        }
    });
}