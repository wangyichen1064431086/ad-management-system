if (window.parent && window.parent.parent && window.parent.parent.ga) {
  //console.log('track ga for ad subscription');
  const ga = window.parent.parent.ga;
  const adTitle = document.getElementsByTagName('title')[0].innerHTML;
  const category = `Subscription HouseAd: ${adTitle}`;
  const action = 'click';

  const headArticle = document.querySelector('.head-article a');
  const labelForHeadArticle = 'Head Article';
  //console.log(headArticle);
  headArticle.onclick = function() {
    ga('send', 'event', category, action, labelForHeadArticle);
  }

  const subBtn = document.querySelector('.payinfo a');
  const labelForSubBtn = 'Subscription Button';
  subBtn.onclick = function() {
    ga('send', 'event', category, action, labelForSubBtn);
  }

  const articleLists = Array.from(document.querySelectorAll('.article-list .article a'));
  articleLists.forEach((elem, index) => {
    (function() {
       elem.addEventListener('click', function(){
        const labelForListArticle = `Article: ${index+1}`;
        ga('send', 'event', category, action, labelForListArticle);
       })
    })(index);
  });
}