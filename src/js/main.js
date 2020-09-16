/////////////////// Burger Menu    /////////////////
const burger = document.querySelector('.burger');
const body = document.querySelector('body');
const overlay = document.querySelector('.header__overlay');

burger.addEventListener('click', function() {
    if (!overlay.classList.contains('header__overlay_active')) {
      overlay.classList.add('header__overlay_active');
      burger.classList.add('burger_active');
      body.classList.add('overflow');
    } else {
      overlay.classList.remove('header__overlay_active');
      burger.classList.remove('burger_active');
      body.classList.remove('overflow');
    }
  });

/////////////// Slider Offers ///////////


$(document).ready(function(){
  $('.offers__list').slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow:  '<a class="offer-arrow offer-arrow_prev">&#10094;</a>',
    nextArrow: '<a class="offer-arrow offer-arrow_next">&#10095;</a>',
    mobileFirst: true,
    responsive: [{
      breakpoint: 769,
      settings: 'unslick'
    }]
  });
});


///////////////// Pagination Main Page and Services     ////////////

const items = document.querySelectorAll('.paginator__link');
let section = document.querySelector('.page-content');
const sectionNews = document.querySelector('.news');

for (let item of items) {
  
    item.addEventListener('click', function(e) {
        e.preventDefault();

        items.forEach(item => {
            item.closest('.paginator__item').classList.remove('paginator__item_active');
        });
        item.closest('.paginator__item').classList.add('paginator__item_active');  


        let newsOnPage = 2;

        const news = document.querySelectorAll('.news-item');
        const services = document.querySelectorAll('.services-item');

        news.forEach(element => {
            element.classList.remove('news-item_active');
        });

        services.forEach(element => {
          element.classList.remove('services-item_active');
        });

        let arr = [];
        let arrServices = [];
        
        for (let i=0; i < news.length; i++) {
            arr.push(news[i]);
        };
        for (let j=0; j < services.length; j++) {
               arrServices.push(services[j]);
        }

        const pageNum = Number(this.innerHTML);
        const start = (pageNum - 1) * newsOnPage;
        const end = start + newsOnPage;
        const curNews = arr.slice(start, end);
        const curServices = arrServices.slice(start, end);
         
        curNews.forEach(element => {
            element.classList.add('news-item_active');
        });  
        
        curServices.forEach(element => {
          element.classList.add('services-item_active');
        });
        
        $('html, body').animate({
          scrollTop: $(sectionNews).offset().top
       }, 500);

        $('html, body').animate({
          scrollTop: $(section).offset().top
       }, 500);

    });
}
