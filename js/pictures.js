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
/**
 * Gets an array of numbers from 1 to number.
 * @param {array} number - The last number in the array.
 * @return {array} newArr - Returns an array from 1 to number.
 */
function getArrayOfNumbers(number) {
  var newArr = new Array(number);
  var counter = 1;
  for (var i = 0; i < newArr.length; i++) {
    newArr[i] = counter++;
  }
  return newArr;
}
/**
 * Gets a random number from the range includes extreme values
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @return {string} - Returns a random number from range.
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Gets a random nonreapeating element from an array
 * @param {array} array - Group of elements to produce a random from them.
 * @return {string} - Returns a random nonreapeating element of the array.
 */
function getNonrepeatingRandomValue(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1);
}
/**
 * Gets a random subarray from an array with maximum length of 2.
 * @param {array} array - Group of elements to extract the subarray.
 * @return {array} newArr - Returns a random subarray with length 1 or 2.
 */
function getRandomArray(array) {
  var newArr = new Array(getRandomNumber(1, 2));
  var temp = array.slice();
  for (var i = 0; i < newArr.length; i++) {
    newArr[i] = getNonrepeatingRandomValue(temp);
  }
  return newArr;
}
/**
 * Creates an array of photo units based on the obtained data.
 * @param {array} numbers - An array of the numbers for pictures.
 * @param {array} comments - An array of comments to photos.
 * @param {number} count - Number of photos.
 * @return {array} photos - Returns an array of photo units.
 */
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
/**
 * Generates a photo.
 * @param {object} photoUnit - Information about the photo.
 * @param {object} template - The template of photo.
 * @return {object} photo - Returns render photo.
 */
function renderPhoto(photoUnit, template) {
  var photo = template.cloneNode(true);
  photo.querySelector('img').setAttribute('src', photoUnit.url);
  photo.querySelector('.picture-likes').textContent = photoUnit.likes;
  photo.querySelector('.picture-comments').textContent = photoUnit.comments;
  return photo;
}
/**
 * Add pins to markup.
 * @param {object} photos - Information about the photos.
 * @param {object} template - The template of photo.
 * @param {object} photoPlace - Place to add a photo.
 */
function addPhotos(photos, template, photoPlace) {
  var temp = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    temp.appendChild(renderPhoto(photos[i], template));
  }
  photoPlace.appendChild(temp);
}
/**
 * Adds information about photo to card.
 * @param {object} photoUnit - Information about photo.
 * @param {object} place - The location of the card.
 */
function addDataToCard(photoUnit, place) {
  place.querySelector('.gallery-overlay-image').setAttribute('src', photoUnit.url);
  place.querySelector('.likes-count').textContent = photoUnit.likes;
  place.querySelector('.comments-count').textContent = photoUnit.comments.length;
}
