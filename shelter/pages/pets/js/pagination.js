const friendsWrapper = document.querySelector('.friends__wrapper'),
  leftStartArrow = document.querySelector('.friends__arrow_left-start'),
  rightEndArrow = document.querySelector('.friends__arrow_right-end'),
  leftCenterArrow = document.querySelector('.friends__arrow_left-center'),
  rightCenterArrow = document.querySelector('.friends__arrow_right-center');
// const friendsList = document.querySelector('.friends__list');
let pets = []; // 8
let fullPetsList = []; // 48
const request = new XMLHttpRequest();
request.open('GET', './js/pets.json');
// request.onload = () => {
//   console.log(request.response);
// };
fetch('./js/pets.json')
  .then((res) => res.json())
  .then((list) => {
    pets = list;

    fullPetsList = (() => {
      let tempArr = [];

      for (let i = 0; i < 6; i++) {
        const newPets = pets;

        for (let j = pets.length; j > 0; j--) {
          let randInd = Math.floor(Math.random() * j);
          const randElem = newPets.splice(randInd, 1)[0];
          newPets.push(randElem);
        }

        tempArr = [...tempArr, ...newPets];
      }
      return tempArr;
    })();

    fullPetsList = sort863(fullPetsList);

    createPets(fullPetsList);
    // createPets(fullPetsList);

    document.querySelector('.friends__page_active').innerText = (
      currentPage + 1
    ).toString();

    for (let i = 0; i < fullPetsList.length / 6; i++) {
      const stepList = fullPetsList.slice(i * 6, i * 6 + 6);

      for (let j = 0; j < 6; j++) {
        stepList.forEach((item, ind) => {
          if (item.name === stepList[j].name && ind !== j) {
            friendsList.children[i * 6 + j].style.border = '5px solid red';
          }
        });
      }
    }
  });
// request.onload = () => {
//   pets = JSON.parse(request.response);

// }

// function renderCards(petsList) {
//   petsList.forEach((element, i) => {
//     createPetCard(element);
//   });
// }

const createPets = (petsList) => {
  const elem = friendsList;
  elem.innerHTML += createElements(petsList);
};

createElements = (petsList) => {
  let str = '';
  for (let i = 0; i < petsList.length; i++) {
    str += createPetCard(petsList[i]);
  }
  return str;
};

function createElements({
  name,
  img,
  type,
  breed,
  description,
  age,
  inoculations,
  diseases,
  parasites,
}) {
  const card = `
    <li class="friends__item"  data-name="${name}">
      <img class="friends__img"
        src="${img}"
        alt="${type} ${name}">
      <p class="friends__description">${name}</p>
      <button class="friends__btn">Learn more</button>
    </li>
  `;
  // insertCard('beforeend', card);
  return card;
}

// function insertCard(selector, card) {
//   friendsList.insertAdjacentHTML(selector, card);
// }

request.send();

const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;

  list = sort6recursively(list);

  return list;
};

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < length / 6; i++) {
    const stepList = list.slice(i * 6, i * 6 + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && ind !== j;
      });

      if (duplicatedItem !== undefined) {
        const ind = i * 6 + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
};

let currentPage = 0;

// Left start arrow
leftStartArrow.addEventListener('click', (e) => {
  checkItemsPerPage();
  currentPage = 0;
  leftStartArrow.classList.add('friends__arrow_disabled');
  leftCenterArrow.classList.add('friends__arrow_disabled');
  leftStartArrow.disabled = true;
  leftCenterArrow.disabled = true;
  rightEndArrow.classList.remove('friends__arrow_disabled');
  rightCenterArrow.classList.remove('friends__arrow_disabled');
  rightEndArrow.disabled = false;
  rightCenterArrow.disabled = false;

  friendsList.style.top = `calc(1px - ${931 * currentPage}px)`;
  document.querySelector('.friends__page_active').innerText = (
    currentPage + 1
  ).toString();
});

// Left center arrow
leftCenterArrow.addEventListener('click', (e) => {
  checkItemsPerPage();
  if (currentPage > 0) {
    currentPage--;
    rightEndArrow.classList.remove('friends__arrow_disabled');
    rightCenterArrow.classList.remove('friends__arrow_disabled');
    rightEndArrow.disabled = false;
    rightCenterArrow.disabled = false;
  }

  if (currentPage === 0) {
    leftStartArrow.classList.add('friends__arrow_disabled');
    leftCenterArrow.classList.add('friends__arrow_disabled');
    leftStartArrow.disabled = true;
    leftCenterArrow.disabled = true;
  }

  friendsList.style.top = `calc(1px - ${931 * currentPage}px)`;
  document.querySelector('.friends__page_active').innerText = (
    currentPage + 1
  ).toString();
});

// Right center arrow
rightCenterArrow.addEventListener('click', (e) => {
  checkItemsPerPage();
  if (currentPage < fullPetsList.length / itemsPerPage - 1) {
    leftStartArrow.classList.remove('friends__arrow_disabled');
    leftCenterArrow.classList.remove('friends__arrow_disabled');
    leftStartArrow.disabled = false;
    leftCenterArrow.disabled = false;
    currentPage++;
  }
  if (currentPage === fullPetsList.length / itemsPerPage - 1) {
    rightEndArrow.classList.add('friends__arrow_disabled');
    rightCenterArrow.classList.add('friends__arrow_disabled');
    rightEndArrow.disabled = true;
    rightCenterArrow.disabled = true;
  }

  friendsList.style.top = `calc(1px - ${931 * currentPage}px)`;
  document.querySelector('.friends__page_active').innerText = (
    currentPage + 1
  ).toString();
});

// Right end arrow
rightEndArrow.addEventListener('click', (e) => {
  checkItemsPerPage();
  currentPage = fullPetsList.length / itemsPerPage - 1;
  rightEndArrow.classList.add('friends__arrow_disabled');
  rightCenterArrow.classList.add('friends__arrow_disabled');
  rightEndArrow.disabled = true;
  rightCenterArrow.disabled = true;
  leftStartArrow.classList.remove('friends__arrow_disabled');
  leftCenterArrow.classList.remove('friends__arrow_disabled');
  leftStartArrow.disabled = false;
  leftCenterArrow.disabled = false;

  friendsList.style.top = `calc(1px - ${931 * currentPage}px)`;
  document.querySelector('.friends__page_active').innerText = (
    currentPage + 1
  ).toString();
});

let itemsPerPage = 8;
const checkItemsPerPage = () => {
  if (document.querySelector('body').offsetWidth > 1280) {
    itemsPerPage = 8;
    friendsWrapper.style.height = '935px';
  } else if (
    document.querySelector('body').offsetWidth >= 768 &&
    document.querySelector('body').offsetWidth < 1280
  ) {
    itemsPerPage = 6;
    friendsWrapper.style.height = '1400px';
  } else if (document.querySelector('body').offsetWidth < 768) {
    itemsPerPage = 3;
    friendsWrapper.style.height = '1400px';
  }
};

window.onresize = () => {
  checkItemsPerPage();
};

document.addEventListener('DOMContentLoaded', checkItemsPerPage);
