const imagesSection = document.querySelector('.images');
const imagesGallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchButton = document.getElementById('search-btn');
const sliderButton = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');

let sliderImages = [];

// API KEY
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

searchButton.addEventListener('click', () => {
    const searchField = document.getElementById('search');
    const searchText = searchField.value;

    // get images by api
    fetch(`https://pixabay.com/api/?key=${KEY}=${searchText}&image_type=photo&pretty=true`)
        .then(res => res.json())
        .then(data => displayImages(data.hits))
        .catch(err => console.log(err))

    searchField.value = '';
})

const displayImages = images => {
    console.log(images)
    imagesGallery.textContent = '';
    // display the gallery header
    galleryHeader.style.display = 'flex'
    images.forEach(image => {
        let div = document.createElement('div');
        div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
        div.innerHTML = `<img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`
        imagesGallery.appendChild(div);
    })
}