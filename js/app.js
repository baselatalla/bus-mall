'use strict';

let productSection=document.getElementById('productSection');
let firstImage=document.getElementById('firstImage');
let secondImage=document.getElementById('secondImage');
let thirdImage=document.getElementById('thirdImage');
let resultbutt = document.getElementById('resultbutt');
let resultfield = document.getElementById('results');
let numberOfRound = 25 ;
const productNames = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','water-glass.jpg'];

function Products(name){
  this.name = name;
  this.path = `./img/${name}`;
  this.views = 0;
  this.votes = 0;
  Products.allProd.push(this);
}
Products.allProd=[];

for(let i = 0 ; i < productNames.length ; i++){
  new Products(productNames[i]);
}
console.table(Products.allProd);

function randNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function render(){
  let fst1=randNumber(0,Products.allProd.length-1);
  const fst1RndPord =Products.allProd[fst1];
  firstImage.src=fst1RndPord.path;
  firstImage.title=fst1RndPord.name;
  firstImage.alt=fst1RndPord.name;
  Products.allProd[fst1].views++;

  let sec2=randNumber(0,Products.allProd.length-1);
  while (sec2 === fst1 ){
    sec2=randNumber(0,Products.allProd.length-1);}
  const sec2RndPord=Products.allProd[sec2];
  secondImage.src=sec2RndPord.path;
  secondImage.title=sec2RndPord.name;
  secondImage.alt=sec2RndPord.name;
  Products.allProd[sec2].views++;

  let third =randNumber(0,Products.allProd.length-1);
  while (third === fst1 || third === sec2){
    third =randNumber(0,Products.allProd.length-1);}
  const thirdRandProd =Products.allProd[third];
  thirdImage.src=thirdRandProd.path;
  thirdImage.title=thirdRandProd.name;
  thirdImage.alt=thirdRandProd.name;
  Products.allProd[third].views++;

}

productSection.addEventListener('click',clicker);


function clicker(event){
  if (numberOfRound !== 0){
    if (event.target.id === 'firstImage' || event.target.id === 'secondImage' || event.target.id === 'thirdImage'){
      for(let i=0;i<Products.allProd.length;i++){
        if (Products.allProd[i].name === event.target.title){
          Products.allProd[i].votes++;
          console.table(Products.allProd[i]);
        }
      }
      render();
      numberOfRound--;}

    if (numberOfRound === 0 ){
      let resultButton = document.createElement('button');
      resultButton.innerText = 'View Results';
      resultButton.id = 'result';
      resultbutt.appendChild(resultButton);
      let result = document.getElementById('result');
      result.addEventListener('click',printer);

    }
  }

}
function printer(){
  let viewResult = [];
  let unorderl =document.createElement('ul');
  for (let i = 0 ; i < Products.allProd.length ; i++ ){
    viewResult= document.createElement('li');
    viewResult.innerText = Products.allProd[i].name+' had '+Products.allProd[i].votes+'votes and '+Products.allProd[i].views+'views';
    unorderl.appendChild(viewResult);
  }
  console.log(Products.allProd[1].name);
  resultfield.appendChild(unorderl);
}

render();

