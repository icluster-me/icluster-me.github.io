var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');
var questButton = document.getElementById('quest');
var loadingContainer = document.getElementById('loading');

var currentSlideId = 0;
var nbSlides = 6;

function updateSlide(slideId) {
    var oldSlide = document.getElementById('slide-' + currentSlideId);
    var newSlide = document.getElementById('slide-' + slideId);

    var dem = document.getElementById('dem-' + currentSlideId);
    dem?.classList.add('hide');
    dem?.classList.add('d-none');
    if (questButton.classList.contains('active')) {
        questButton.classList.remove('active');
    }

    currentSlideId = slideId;
    newSlide.classList.remove('d-none');
    setTimeout(() => {
        newSlide.classList.remove('hide');
    }, 64);
    oldSlide.classList.add('d-none');
    oldSlide.classList.add('hide');
}


nextButton.addEventListener('click', evt => {
    updateSlide(currentSlideId+1);
    if (currentSlideId == nbSlides-1) {
        nextButton.setAttribute('disabled', true);
    }
})

prevButton.addEventListener('click', evt => {
    if (currentSlideId == 0) return;
    updateSlide(currentSlideId-1);
    if (nextButton.getAttribute('disabled') == 'true') {
        nextButton.removeAttribute('disabled');
    }
})

questButton.addEventListener('click', evt => {
    questButton.classList.toggle('active');

    var dem = document.getElementById('dem-' + currentSlideId);
    if (!dem) {
        return;
    }

    dem.classList.toggle('d-none');
    setTimeout(() => {
        dem.classList.toggle('hide');
    }, 64);
})