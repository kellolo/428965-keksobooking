'use strict';
var USERS = 8;
var TITLES = ["Большая уютная квартира", 
"Маленькая неуютная квартира", "Огромный прекрасный дворец", 
"Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", 
"Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var MAXROOMS = 5;


var map = document.querySelector('.map');
map.classList.remove('map--faded');

//ОСНОВНАЯ ФУНКЦИЯ

var getRandom = function (min, max) {
  return Math.floor(min + Math.random() * max);
};

var generateData = function (shuffle, createUsers, users, xLocation, yLocation, avatar, title, price, uType, rooms, guests, checkIn, checkOut, photos, totalFeatures, feature) {

  avatar = [];
  title = [];
  uType = [];
  rooms = [];
  guests = [];
  checkIn = [];
  checkOut = [];
  photos = [];
  users = [];
  totalFeatures = [];

  //ФУНКЦИЯ СОЗДАНИЯ МАССИВОВ ДАННЫХ ПО КАТЕГОРИЯМ С ЧАСТИЧНО НЕПОВТОРЯЮЩИМИСЯ МАССИВАМИ

  shuffle = function (usersData, ava, tit, uTy, roo, gue, chIn, chOut, phot, totFeat, feat) {
    for (var j = 0; j < USERS;) {

      ava = getRandom(1, USERS);
      tit = TITLES[getRandom(0, TITLES.length)];
      uTy = TYPE[getRandom(0, 2)];
      roo = getRandom(1, MAXROOMS);
      gue = getRandom(1, 10);
      chIn = CHECKIN[getRandom(0, CHECKIN.length)];
      chOut = CHECKOUT[getRandom(0, CHECKOUT.length)];
      phot = PHOTOS[getRandom(1, PHOTOS.length)];
      usersData = [];
      totFeat = [];

      while (totFeat.length < getRandom(0, FEATURES.length)) {
        feat = FEATURES[getRandom(0, FEATURES.length)];
        if (totFeat.indexOf(feat) < 0) {
          totFeat.push(feat);
        }
      }

      if (avatar.indexOf(ava) < 0 && title.indexOf(tit) < 0) {
        avatar.push(ava);
        title.push(tit);
        uType.push(uTy);
        rooms.push(roo);
        guests.push(gue);
        checkIn.push(chIn);
        checkOut.push(chOut);
        photos.push(phot);
        totalFeatures.push(totFeat);

        j++;

      } 
    }

    usersData = {
      avatars: avatar,
      titles: title,
      prices: price,
      types: uType,
      rooms: rooms,
      guests: guests,
      in: checkIn,
      out: checkOut,
      features: totalFeatures,
      photos: photos
    };
    
    return usersData; //возвращает объект массивов данных по категориям
  };


  //ФУНКЦИЯ СОРТИРОВКИ СГЕНЕРИРОВАННЫХ ДАННЫХ ПО КОНКРЕТНЫМ ПОЛЬЗОВАТЕЛЯМ

  createUsers = function (incoming, newUser) {
      incoming = shuffle();

      while (users.length < USERS) {
        var xLocation = getRandom(300, 600);
        var yLocation = getRandom(300, 350);

        newUser = {
          author: {
            avatar: 'img/avatars/user0' + incoming.avatars[users.length] + '.png'
          },
          location: {
            x: xLocation,
            y: yLocation
          },
          offer: {
            title: incoming.titles[users.length],
            adress: xLocation  + ', ' + yLocation,
            price: getRandom(1000, 900000),
            type: incoming.types[users.length],
            rooms: incoming.rooms[users.length],
            guests: incoming.guests[users.length],
            checkin: incoming.in[users.length],
            checkout: incoming.out[users.length],
            features: incoming.features[users.length],
            description: '',
            photos: incoming.photos[users.length]
          }
        };

        users.push(newUser);
      }
  };
  
  createUsers();

  return users; //возвращает массив объектов по пользователям
};

var userTemplate;
var fragment = document.createDocumentFragment();

var generateTemplate = function (button, avatar, users) {
  users = generateData();

  for (var i = 0; i < USERS; i++){
    button = document.createElement('button');
    avatar = document.createElement('img');
    button.style.left = users[i].location.x + 'px';
    button.style.top = users[i].location.y + 'px';
    button.classList.add('map__pin');

    avatar.style.width = 40 + 'px';
    avatar.style.height = 40 + 'px';
    avatar.draggable = 'false';
    avatar.src = users[i].author.avatar;

    button.appendChild(avatar);
    fragment.appendChild(button);
  }
};


generateTemplate ();

var mapTarget = document.querySelector('.map__pins');
mapTarget.appendChild(fragment);
