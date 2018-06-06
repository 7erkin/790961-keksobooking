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


var randomGenerator = {
    modeGenerator: {
        hard: true,
        soft: false
    },
    getRandomValue: function (minValue, maxValue, mode) {
        var randomValue = maxValue - (maxValue - 1 - minValue) * Math.random();
        return mode ? Math.round(randomValue) : Math.floor(randomValue);
    }
};

var createAds = function (adsQuantity) {
    var ads = [];
    var genMode = randomGenerator.modeGenerator;
    for(var i = 0; i < adsQuantity; ++i){
        var ad = {};
        ad.author = {};
        ad.author.avatar = 'img/avatars/user0' + i + '.png'; 
        ad.offer = {};
        var offer = ad.offer;
        offer.title = TITLE[randomGenerator.getRandomValue(0, TITLE.length, genMode.soft)];
        offer.address = randomGenerator.getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION, genMode.hard) + ', ' + randomGenerator.getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION, genMode.hard) ;
        offer.price = randomGenerator.getRandomValue(MIN_PRICE, MAX_PRICE, genMode.hard);
        offer.type = TYPE[randomGenerator.getRandomValue(0, TYPE.length, genMode.soft)];
        offer.rooms = randomGenerator.getRandomValue(MIN_ROOMS, MAX_ROOMS, genMode.hard);
        offer.guests = randomGenerator.getRandomValue(MIN_GUESTS, MAX_GUESTS, genMode.hard);
        offer.checkin = CHECKPOINT[randomGenerator.getRandomValue(0, CHECKPOINT.length, genMode.soft)];
        offer.checkout = CHECKPOINT[randomGenerator.getRandomValue(0, CHECKPOINT.length, genMode.soft)];
        offer.features = getFeatures();
        offer.description = ' ';
        offer.photos = [
            'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ];
        ad.location = {};
        ad.location.x = randomGenerator.getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION, genMode.hard);
        ad.location.y = randomGenerator.getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION, genMode.hard);
        console.log(ad);
        ads.push(ad);
    }
};

var getFeatures = function(){
    var features = [];
    var genMode = randomGenerator.modeGenerator;
    var howManyFeatures = randomGenerator.getRandomValue(0, FEATURES.length, genMode.soft);
    var temp = randomGenerator.getRandomValue(0, FEATURES.length, genMode.soft);
    for(var i = 0; i < howManyFeatures; ++i){
        features.push(FEATURES[(temp + i) % FEATURES.length]);
    }
    return features;
}

var array = createAds(ADS_QUANTITY);