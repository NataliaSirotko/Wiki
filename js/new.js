;(function () {
    'use strict';

    const markdownSourceElement = document.querySelector('#markdown-source');
    const markdownResultElement = document.querySelector('#markdown-result');
    const saveArticleButton = document.querySelector('#save-article-button');
    const articleTitleElement = document.querySelector('#article-title');
    const json = localStorage.getItem('articles');
    const articles = JSON.parse(json);

    const id = parseInt(location.search.substr(4));

    if (id) { 
        let article = null;
        for (let i=0; i<articles.length; i++) {
            if (articles[i].id === id) {
                article = articles[i];
            }
        }
        markdownSourceElement.value = article.content;
        articleTitleElement.value = article.title;
        //чтобы сразу в предпросмотре статья была
        const result = marked(markdownSourceElement.value);
        markdownResultElement.innerHTML = result;
    }
    
   // markdownSourceElement.value = 'uuuu';

//    markdownResultElement.innerHTML = `
//     <h1>Заголовок статьи</h1>
// 	<p>Далеко-далеко за <a href="#">словесными горами в стране</a>, гласных и согласных живут рыбные тексты. Использовало однажды гор семь, снова раз. Города большой безорфографичный меня.</p>
// 	<p>Lorem имени, продолжил своего реторический своих послушавшись грустный даль страну парадигматическая океана рыбными, рыбного переписывается, страна? Свой заголовок свое, он.</p>
// 	<h2>Заголовок второго уровня</h2>
// 	<p>Что, повстречался последний всеми его щеке не, знаках встретил использовало, прямо, раз свой. Города силуэт, заглавных всеми, свою прямо но!</p>
// 	<p>Текстов которой вскоре журчит рекламных свою, сбить на берегу рот. Великий страну проектах знаках над что путь языком, подпоясал, свой они!</p>
// 	<h3>Заголовок третьего уровня</h3>
// 	<p>Скатился переулка первую единственное имени над запятых, грустный заголовок переписывается власти переписали. Букв строчка вскоре продолжил, страна злых раз страну.</p>
// 	<p>Букв переписали, продолжил. Силуэт, путь текста журчит переписывается назад от всех его выйти однажды, бросил букв, путь несколько вскоре даже рукопись.</p>
//    `;

//     markdownSourceElement.value = `## Заголовок статьи

// Далеко-далеко за [словесными горами в стране](#), гласных и согласных живут рыбные тексты. Использовало однажды гор семь, снова раз. Города большой безорфографичный меня.</Далеко-далеко>

// Lorem имени, продолжил своего реторический своих послушавшись грустный даль страну парадигматическая океана рыбными, рыбного переписывается, страна? Свой заголовок свое, он.

// ## Заголовок второго уровня

// Что, повстречался последний всеми его щеке не, знаках встретил использовало, прямо, раз свой. Города силуэт, заглавных всеми, свою прямо но!

// Текстов которой вскоре журчит рекламных свою, сбить на берегу рот. Великий страну проектах знаках над что путь языком, подпоясал, свой они!

// ### Заголовок третьего уровня

// Скатился переулка первую единственное __имени__ над запятых, грустный заголовок переписывается власти переписали. Букв строчка вскоре продолжил, страна злых раз страну.

// Букв переписали, продолжил. Силуэт, путь текста журчит переписывается назад от всех его выйти однажды, бросил букв, путь несколько вскоре даже рукопись.

// [Наталья Сиротко](https://vk.com/id7047476)
//     `;

    markdownSourceElement.addEventListener('keyup', function() {
        //console.log(markdownSourceElement.value);
        const result = marked(markdownSourceElement.value);
        //console.log(result);
        markdownResultElement.innerHTML = result;
    });
    //console.log(markdownSourceElement, markedResultElemennt);

    saveArticleButton.addEventListener('click', function() {
        if (id) {
            for (let i=0; i<articles.length; i++) {
                if (articles[i].id === id) {
                    articles[i].title = articleTitleElement.value;
                    articles[i].content = markdownSourceElement.value;
                }
            }
        } else {
            const newArticle = {
                id: 0,
                title: articleTitleElement.value,
                content: markdownSourceElement.value
            };

            newArticle.id = articles.length + 1;
            articles.push(newArticle);
        }
        
        localStorage.setItem('articles', JSON.stringify(articles));

        if (id) {
           location.replace('article.html?id=' + id); 
        } else {
            location.replace('article.html?id=' + articles[articles.length - 1].id);
        }
        
    });

})();