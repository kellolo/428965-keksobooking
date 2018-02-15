'use strict';
var USERS = 8;
var TITLES = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var MAXROOMS = 5;


var map = document.querySelector('.map');
map.classList.remove('map--faded');

//ОСНОВНАЯ ФУНКЦИЯ

var generateData = function (shuffle, createUsers, users, xLocation, yLocation, avatar, title, price, uType, rooms, guests, checkIn, checkOut, photos, totalFeatures, feature) {
  xLocation = [];
  yLocation = [];
  avatar = [];
  title = [];
  price = [];
  uType = [];
  rooms = [];
  guests = [];
  checkIn = [];
  checkOut = [];
  photos = [];
  users = [];
  totalFeatures = [];

  //ФУНКЦИЯ СОЗДАНИЯ МАССИВОВ ДАННЫХ ПО КАТЕГОРИЯМ С ЧАСТИЧНО НЕПОВТОРЯЮЩИМИСЯ МАССИВАМИ

  shuffle = function (usersData, count, xLoc, yLoc, ava, tit, pri, uTy, roo, gue, chIn, chOut, phot, totFeat, feat) {
    for (count = 0; count < USERS;) {
      xLoc = Math.floor(300 + Math.random() * 600);
      yLoc = Math.floor(300 + Math.random() * 350);
      ava = Math.floor(1 + Math.random() * USERS);
      tit = TITLES[Math.floor(Math.random() * TITLES.length)];
      pri = Math.floor(1000 + Math.random() * 1000 * 900);
      uTy = Math.floor(Math.random() * 2);
      roo = Math.floor(1 + Math.random() * MAXROOMS);
      gue = Math.floor(1 + Math.random() * 10);
      chIn = CHECKIN[Math.floor(Math.random() * CHECKIN.length)];
      chOut = CHECKOUT[Math.floor(Math.random() * CHECKOUT.length)];
      phot = PHOTOS[Math.floor(Math.random() * PHOTOS.length)];
      usersData = [];
      totFeat = [];

      while (totFeat.length < Math.floor(Math.random() * FEATURES.length)) {
        feat = FEATURES[Math.floor(Math.random() * FEATURES.length)];
        if (totFeat.indexOf(feat) < 0) {
          totFeat.push(feat);
        }
      }

      if (avatar.indexOf(ava) < 0 && title.indexOf(tit) < 0 && xLocation.indexOf(xLoc) < 0) {
        avatar.push(ava);
        xLocation.push(xLoc);
        yLocation.push(yLoc);
        title.push(tit);
        price.push(pri);
        uType.push(uTy);
        rooms.push(roo);
        guests.push(gue);
        checkIn.push(chIn);
        checkOut.push(chOut);
        photos.push(phot);
        totalFeatures.push(totFeat);

        count++;
      } 
    }

    usersData = {
      xLocations: xLocation,
      yLocations: yLocation,
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
        newUser = {
          avatar: 'img/avatars/user0' + incoming.avatars[users.length] + '.png',
          x: incoming.xLocations[users.length],
          y: incoming.yLocations[users.length],
          title: incoming.titles[users.length],
          adress: incoming.xLocations[users.length] + ', ' + incoming.yLocations[users.length],
          price: incoming.prices[users.length],
          type: incoming.types[users.length],
          rooms: incoming.rooms[users.length],
          guests: incoming.guests[users.length],
          checkin: incoming.in[users.length],
          checkout: incoming.out[users.length],
          features: incoming.features[users.length],
          description: '',
          photos: incoming.photos[users.length]
        };

        users.push(newUser);
      }
      console.log(users);
  };
  
  createUsers();
  return users; //возвращает массив объектов по пользователям
};

var userTemplate;
var fragment = document.createDocumentFragment();

var generateTemplate = function (button, avatar, users) {
  users = generateData();

  button = document.createElement('button');
  avatar = document.createElement('img');
  button.style.left = users[1].x + 'px';
  button.style.left = users[1].y + 'px';
  button.style.top = 200 + 'px';
  button.classList.add('map__pin');

  avatar.style.width = 40 + 'px';
  avatar.style.height = 40 + 'px';
  avatar.draggable = 'false';
  avatar.src = users[1].avatar;

  button.appendChild(avatar);
  fragment.appendChild(button);

};


generateTemplate ();

var mapTarget = document.querySelector('.map__pins');
mapTarget.appendChild(fragment);

var renderUsers = function (wizard) {

  
}
