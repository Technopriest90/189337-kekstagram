'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COUNT_PHOTOS = 25;
var NUMBERS_OF_PHOTO = getArrayOfNumbers(COUNT_PHOTOS);
var photosPlace = document.querySelector('.pictures');
var photoUnits = getPhotoUnits(NUMBERS_OF_PHOTO, COMMENTS, COUNT_PHOTOS);
var photoTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

addPhotos(photoUnits, photoTemplate, photosPlace);
var cardPlace = document.querySelector('.gallery-overlay');
cardPlace.classList.remove('hidden');
addDataToCard(photoUnits[0], cardPlace);

function getArrayOfNumbers(number) {
  var newArr = new Array(number);
  var counter = 1;
  for (var i = 0; i < newArr.length; i++) {
    newArr[i] = counter++;
  }
  return newArr;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNonrepeatingRandomValue(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1);
}

function getRandomArray(array) {
  var newArr = new Array(getRandomNumber(1, 2));
  var temp = array.slice();
  for (var i = 0; i < newArr.length; i++) {
    newArr[i] = getNonrepeatingRandomValue(temp);
  }
  return newArr;
}

function getPhotoUnits(numbers, comments, count) {
  var photos = new Array(count);
  for (var i = 0; i < photos.length; i++) {
    photos[i] = {
      url: 'photos/' + getNonrepeatingRandomValue(numbers) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: getRandomArray(comments)
    };
  }
  return photos;
}

function renderPhoto(photoUnit, template) {
  var photo = template.cloneNode(true);
  photo.querySelector('img').setAttribute('src', photoUnit.url);
  photo.querySelector('.picture-likes').textContent = photoUnit.likes;
  photo.querySelector('.picture-comments').textContent = photoUnit.comments;
  return photo;
}

function addPhotos(photos, template, photoPlace) {
  var temp = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    temp.appendChild(renderPhoto(photos[i], template));
  }
  photoPlace.appendChild(temp);
}

function addDataToCard(photoUnit, place) {
  place.querySelector('.gallery-overlay-image').setAttribute('src', photoUnit.url);
  place.querySelector('.likes-count').textContent = photoUnit.likes;
  place.querySelector('.comments-count').textContent = photoUnit.comments.length;
}
