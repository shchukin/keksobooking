/* Возвращает случайное число больше либо равное нулю в диапазоне [min, max] с precision знаков после запятой.
 * Если точность не задана, то по умолчанию задаём точность равную нулю. Т.е. результат будет без десятичной части, что позволяет генерировать целые числа. */
function getRandomPositiveFloat(min, max, precision = 0) {

  /* min и max переданы. При этом важно разрешить численный 0, но не пропустить undefined, false, пустую строку и прочее */
  if ( !min && min !== 0 || !max && max !==0) {
    return null;
  }

  /* Пропускаем только числа */
  if( typeof min !== 'number' || typeof max !== 'number') {
    return null;
  }

  /* Разрешаем только значения больше ноля (и сам ноль). Например, координаты на карте */
  if( min < 0 || max < 0  ) {
    return null;
  }

  /* Весьма неочевидная проверка на случай если точность задана жёстче чем может позволить заданный диапазон.
   * Например при диапазоне [1.46, 1.47] возможны варианты с точностью в две более знака после запятой: 1.462, 1.465, 1.469, но невозможны варианты с точностью ноль или один.
   * Одновременно эта функция так же проверяет чтобы max был строго больше min. */
  if(+min.toFixed(precision) >= +max.toFixed(precision)) {
    return null;
  }

  /* Считаем рандом по логике random * (max-min) + min и обрезаем знаки после запятой функцией toFixed() */
  return +(Math.random() * (max - min) + min).toFixed(precision);
}


/* Пример данных -- массив bookings */

const placeType = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const guestsTiming = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const gallery = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function getRandomSubSet(array) {
  const subSet = [];
  array.forEach((element) => {
    if (Math.random() < 0.5) {
      subSet.push(element);
    }
  });
  return subSet;
}

const bookings = [];

for ( let i=0; i<10; i++ ) {
  bookings.push({
    'author': {
      'avatar': `img/avatars/user${i.toString().padStart(2, '0')}.png`
    },
    'offer': {
      'title': `Offer #${i+1}`,
      'address': `${getRandomPositiveFloat(35.65, 35.7, 5).toString()} ${getRandomPositiveFloat(139.7, 139.8, 5).toString()}`,
      'price': getRandomPositiveFloat(100, 200),
      'type': placeType[i % placeType.length],
      'rooms': getRandomPositiveFloat(1, 5),
      'guests': getRandomPositiveFloat(1, 10),
      'checkin': guestsTiming[i % guestsTiming.length],
      'checkout': guestsTiming[i % guestsTiming.length],
      'features': getRandomSubSet(features),
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim, nibh eu pellentesque semper, nulla lectus feugiat quam, vitae consectetur mi massa vulputate dolor. Nulla nec porta nibh.',
      'photos': getRandomSubSet(gallery),
    },
    'location': {
      'lat': getRandomPositiveFloat(35.65, 35.7, 5),
      'lng': getRandomPositiveFloat(139.7, 139.8, 5)
    },
  });
}
