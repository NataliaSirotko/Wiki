;(function () {
    'use strict';

    //const markdownSourceElement = document.querySelector('#markdown-source');
    const markdownResultElement = document.querySelector('#markdown-result');
    const lastArticlesListElement = document.querySelector('#last-articles');
    const allArticlesListElement = document.querySelector('#all-articles');
    const readArticleButton = document.querySelector('#read-article');

    const json = localStorage.getItem('articles');
    const articles = JSON.parse(json);
   // console.log(articles);
   const article = articles[articles.length - 1];

    // опубликовать 200 символов последней из добавленных статей
   markdownResultElement.innerHTML = marked(article.content.substr(0, 200) + '...');

   // вывести список всех статей
   let str = '';
   for (let i=0; i<articles.length; i++) {
       const currentArticle = articles[i];
       str += '<li class="other-list__item"><a class="other-list__link" href="article.html?id=' + currentArticle.id + '">' + currentArticle.title + '</a></li>';
   }

   allArticlesListElement.innerHTML = str;

   //вывести список 3 последних мтатей
   str = '';
   for (let i=articles.length-3; i<articles.length; i++) {
       const currentArticle = articles[i];
       str += '<li class="articles-list-item"><a href="article.html?id=' + currentArticle.id + '" class="articles-list-link">' + currentArticle.title + '</a></li>';
   }

   lastArticlesListElement.innerHTML = str;

   readArticleButton.addEventListener('click', function() {
       location.replace('article.html?id=' + article.id);
   });

//     const str = `## Заголовок статьи

// Далеко-далеко за [словесными горами в стране](#), гласных и согласных живут рыбные тексты. Использовало однажды гор семь, снова раз. Города большой безорфографичный меня.
    
// Lorem имени, продолжил своего реторический своих послушавшись грустный даль страну парадигматическая океана рыбными, рыбного переписывается, страна? Свой заголовок свое, он.
//     `;

//     markdownResultElement.innerHTML = marked(str);

})();