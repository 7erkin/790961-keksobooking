'use strict'

var ADS_QUANTITY = 8;
var TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
];
var MAX_PRICE = 1e6;
var MIN_PRICE = 1e3;
var TYPE = [
    'palace', 
    'flat', 
    'house', 
    'bungalo'
];
var CHECKPOINT = [
    '12:00',
    '13:00',
    '14:00'
];
var MAX_ROOMS = 5;
var MIN_ROOMS = 1;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MIN_X_LOCATION = 300;
var MAX_X_LOCATION = 900;
var MIN_Y_LOCATION = 130;
var MAX_Y_LOCATION = 630; 
var FEATURES = [
    'wifi', 
    'dishwasher', 
    'parking', 
    'washer', 
    'elevator',
    'conditioner'
];

var createAds = function () {
    var ads = [];
    for(var i = 0; i < ADS_QUANTITY; ++i){
        var ad = {};
        ad.author = {};
        ad.author.avatar = 'img/avatars/user0' + i + '.png'; 
        ad.offer = {};
        var offer = ad.offer;
        offer.title = TITLE[getRandomValue(0, TITLE.length)];
        offer.address = getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION) ;
        offer.price = getRandomValue(MIN_PRICE, MAX_PRICE);
        offer.type = TYPE[getRandomValue(0, TYPE.length)];
        offer.rooms = getRandomValue(MIN_ROOMS, MAX_ROOMS);
        offer.guests = getRandomValue(MIN_GUESTS, MAX_GUESTS);
        offer.checkin = getRandomValue(0, CHECKPOINT.length);
        offer.checkout = getRandomValue(0, CHECKPOINT.length);
        offer.features = getFeatures();
        offer.description = ' ';
        offer.photos = [
            'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ];
        ad.location = {};
        ad.location.x = getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION);
        ad.location.y = getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION);
        ads.push(ad);
    }
};

var getRandomValue = function (minValue, maxValue) {
    return Math.round(maxValue - (maxValue - minValue) * Math.random());
}
var getFeatures = function(){
    var features = [];
    var howManyFeatures = getRandomValue(0, FEATURES.length);
    var temp = getRandomValue(0, FEATURES.length);
    for(var i = 0; i < howManyFeatures; ++i){
        features.push(FEATURES[temp + i]);
    }
    return features;
}