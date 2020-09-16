$(document).ready(function () {
    $('.menu-burger-btn').on('click', function () {
        $('.burger-open').toggleClass('display-none');
        $('.burger-close').toggleClass('display-block');
        $('.menu-burger-navigation').toggleClass('display-block');
    });
});