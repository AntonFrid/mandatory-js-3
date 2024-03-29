let imgContainer = document.getElementById('img-container');
let breedList = document.getElementById('breed-list');
let breedTitle = document.getElementById('breed-title');
let refBtn = document.getElementById('ref-btn');

let data;
let imageArray;
let previousBreed;

refBtn.addEventListener('click', function(){
  breedList.innerHTML = '';
  imgContainer.innerHTML = '';

  if (window.location.hash.includes('breed')){
    getBreedImg();
    console.log('breed');
  }
  else if (window.location.hash.includes('sub')) {
    subBreedReq();
    console.log('sub');
  }
  else{
    defaultRender();
  }
})

if (window.location.hash.includes('breed')){
  getBreedImg();
  console.log('breed');
}
else if (window.location.hash.includes('sub')) {
  subBreedReq();
  console.log('sub');
}
else{
  defaultRender();
}

function defaultRender(){
  let req = new XMLHttpRequest();
  let req2 = new XMLHttpRequest();

  req.addEventListener('load', reqListener);
  req.open('GET', 'https://dog.ceo/api/breeds/list/all');
  req.send();

  req2.addEventListener('load', reqListener2);
  req2.open('GET', 'https://dog.ceo/api/breeds/image/random/3');
  req2.send();
}

function reqListener2(){
  data = JSON.parse(this.responseText);
  console.log(this.status);
  imgArray = data.message;
  renderImg();
}

function reqListener3(){
  data = JSON.parse(this.responseText);
  console.log(this.status);
  subBreedArray = data.message;
  renderListSub();
}

function reqListener(){
  data = JSON.parse(this.responseText);
  console.log(this.status);
  breedObj = data.message;
  console.log(data);
  renderList();
}

function subBreedReq(){
  let req2 = new XMLHttpRequest();

  if (this.textContent !== undefined){
    window.location.hash = 'sub' + '-' + previousBreed + '-' + this.textContent;
  }


  let hashSplit = window.location.hash.split('-');
  console.log(hashSplit);

  breedTitle.textContent = hashSplit[2].charAt(0).toUpperCase() + hashSplit[2].slice(1) + '-' + hashSplit[1];

  req2.addEventListener('load', reqListener2);
  req2.open('GET', 'https://dog.ceo/api/breed/' + hashSplit[1] + '/' + hashSplit[2] + '/images/random/3');
  req2.send();
  console.log(this.textContent);
  removeCurImg();
  removeCurList();
}

function renderListSub(){
  let headTitle = document.createElement('h2');
  headTitle.textContent = 'Sub-Breeds';
  breedList.appendChild(headTitle);
  for (let dog of subBreedArray){
    let listItem = document.createElement('li');
    let linkItem = document.createElement('a');
    linkItem.addEventListener('click', subBreedReq);
    linkItem.textContent = dog;
    listItem.appendChild(linkItem);
    breedList.appendChild(listItem);
  }
}

function renderList(){
  let headTitle = document.createElement('h2');
  headTitle.textContent = 'Breeds';
  breedList.appendChild(headTitle);
  for (let dog in breedObj){
    let listItem = document.createElement('li');
    let linkItem = document.createElement('a');
    linkItem.addEventListener('click', getBreedImg)
    linkItem.textContent = dog;
    listItem.appendChild(linkItem);
    breedList.appendChild(listItem);
  }
}

function renderImg(){
  for (let img of imgArray){
    let imgElement = document.createElement('img');

    imgElement.src = img;
    imgContainer.appendChild(imgElement);
  }
}

function removeCurImg(){
  imgContainer.innerHTML = '';
}

function removeCurList(){
  breedList.innerHTML = '';
}

function getBreedImg(){
  let req = new XMLHttpRequest();
  let req2 = new XMLHttpRequest();

  if (this.textContent !== undefined){
    window.location.hash = 'breed' + '-' + this.textContent;
  }

  let hashSplit = window.location.hash.split('-');
  console.log(hashSplit);
  previousBreed = hashSplit[1];

  breedTitle.textContent = hashSplit[1].charAt(0).toUpperCase() + hashSplit[1].slice(1);

  req.addEventListener('load', reqListener3);
  req.open('GET', 'https://dog.ceo/api/breed/' + hashSplit[1] + '/list');
  req.send();
  console.log(this.textContent);
  req2.addEventListener('load', reqListener2);
  req2.open('GET', 'https://dog.ceo/api/breed/' + hashSplit[1] + '/images/random/3');
  req2.send();

  removeCurImg();
  removeCurList();
}
