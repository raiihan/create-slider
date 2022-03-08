const imagesSection = document.querySelector('.images');
const imagesGallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchButton = document.getElementById('search-btn');
const sliderButton = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');

let sliderImages = [];
let timer;
let slideIndex = 0;
// API KEY
const KEY = '15674931-a9d714b6e9d654524df198e00&q';


searchButton.addEventListener('click', () => {
    const searchField = document.getElementById('search');
    const searchText = searchField.value;
    getApi(searchText);
    searchField.value = '';

    document.querySelector('.main').style.display = 'none';
    clearInterval(timer);
    sliderImages.length = 0;
})

const getApi = searchText => {
    // get images by api
    fetch(`https://pixabay.com/api/?key=${KEY}=${searchText}&image_type=photo&pretty=true`)
        .then(res => res.json())
        .then(data => displayImages(data.hits))
        .catch(err => console.log(err))
}

const displayImages = images => {
    imagesGallery.textContent = '';
    // display the gallery header
    galleryHeader.style.display = 'flex'
    images.forEach(image => {
        let div = document.createElement('div');
        div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
        div.innerHTML = `<img class="img-fluid img-thumbnail" onclick=selectImage(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`
        imagesGallery.appendChild(div);
    })
}

const selectImage = (event, img) => {
    const imgElement = event.target;
    imgElement.classList.add('added');
    const imgItem = sliderImages.indexOf(img);
    if (imgItem === -1) {
        sliderImages.push(img);
    }
    else {
        alert('Hey! Image allready added')
    }
}



const createSlider = () => {
    if (sliderImages.length < 2) {
        alert('Select atleat 2 Image');
        return;
    }

    // Create previous and next 
    sliderContainer.textContent = '';
    const prevNext = document.createElement('div');
    prevNext.className = 'prev-next d-flex w-100 justify-content-between align-items-center';
    prevNext.innerHTML = `
    <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
    <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;
    sliderContainer.appendChild(prevNext);
    document.querySelector('.main').style.display = 'block';
    // hide image aria
    imagesSection.style.display = 'none'
    const duration = document.getElementById('duration').value || 1000;

    sliderImages.forEach(slide => {
        let itemImg = document.createElement('div');
        itemImg.className = "slider-item";
        itemImg.innerHTML = `<img class="w-100"
        src="${slide}"
        alt="">`;
        sliderContainer.appendChild(itemImg);
    })
    changeSlide(0)
    timer = setInterval(() => {
        slideIndex++;
        changeSlide(slideIndex)
    }, duration)
    console.log(slideIndex);
}

const changeItem = index => {
    changeSlide(slideIndex += index)
};

const changeSlide = index => {
    const items = document.querySelectorAll('.slider-item');
    if (index < 0) {
        slideIndex = items.length - 1
        index = slideIndex;
    };

    if (index >= items.length) {
        index = 0;
        slideIndex = 0;
    }

    items.forEach(item => {
        item.style.display = "none"
    })

    items[index].style.display = "block"
}

sliderButton.addEventListener('click', () => {
    createSlider();
    console.log('click')
})