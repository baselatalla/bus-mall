'use strict';

// Declaring all necessary global variables
let productSection=document.getElementById('productSection');
let firstImage=document.getElementById('firstImage');
let secondImage=document.getElementById('secondImage');
let thirdImage=document.getElementById('thirdImage');
let resultbutt = document.getElementById('resultbutt');
let resultfield = document.getElementById('results');
let numberOfRound = 25 ;
let image1 = '';
let image2 = '';
let image3= '';
const productNames = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','water-glass.jpg'];
Products.allProd=[];
let unorderl =document.createElement('ul');

// A constracotr to creat different products (opjects)
function Products(name){
  this.name = name;
  this.path = `./img/${name}`;
  this.views = 0;
  this.votes = 0;
  Products.allProd.push(this);

}

// creating oobject for every produt
for(let i = 0 ; i < productNames.length ; i++){
  new Products(productNames[i]);
}

// getting the data from the local storage
function getProductData() {
  const data = JSON.parse(localStorage.getItem('productsdata'));
  if (data) {
    Products.allProd = JSON.parse(localStorage.getItem('productsdata'));
    render();
  } else {
    render();
  }
}



console.table(Products.allProd);

// creat a random number.
function randNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// a function to present three diferent images.
function render(){

  let fst1=randNumber(0,Products.allProd.length-1);
  while (fst1 === image1 || fst1 === image3 || fst1 === image2){
    fst1=randNumber(0,Products.allProd.length-1);}
  const fst1RndPord =Products.allProd[fst1];
  firstImage.src=fst1RndPord.path;
  firstImage.title=fst1RndPord.name;
  firstImage.alt=fst1RndPord.name;
  Products.allProd[fst1].views++;

  let sec2=randNumber(0,Products.allProd.length-1);
  while (sec2 === image2 || sec2 === image1 || sec2 === image3 || sec2 === fst1){
    sec2=randNumber(0,Products.allProd.length-1);}
  const sec2RndPord=Products.allProd[sec2];
  secondImage.src=sec2RndPord.path;
  secondImage.title=sec2RndPord.name;
  secondImage.alt=sec2RndPord.name;
  Products.allProd[sec2].views++;

  let third =randNumber(0,Products.allProd.length-1);
  while ( third === image3 || third === image2 || third === image1 || third === fst1 || third === sec2 ){
    third =randNumber(0,Products.allProd.length-1);}
  const thirdRandProd =Products.allProd[third];
  thirdImage.src=thirdRandProd.path;
  thirdImage.title=thirdRandProd.name;
  thirdImage.alt=thirdRandProd.name;
  Products.allProd[third].views++;
  image1 = fst1;
  image2 = sec2;
  image3 = third;
}

// assigning the votes and the views for each image

productSection.addEventListener('click',clicker);


function clicker(event){
  if (event.target.id === 'firstImage' || event.target.id === 'secondImage' || event.target.id === 'thirdImage'){
    for(let i=0;i<Products.allProd.length;i++){
      if (Products.allProd[i].name === event.target.title){
        Products.allProd[i].votes++;
        console.table(Products.allProd[i]);
      }
    }
    render();
    numberOfRound--;
    console.log(numberOfRound);}
  if (numberOfRound === 0 ){
    productSection.removeEventListener('click',clicker);}

  localStorage.setItem('productsdata',JSON.stringify(Products.allProd));
  console.log(Products.allProd);
}

// create a "shoe resulte" bottun
let resultButton = document.createElement('button');
resultButton.innerText = 'View Results';
resultButton.id = 'result';
resultbutt.appendChild(resultButton);
let result = document.getElementById('result');
result.addEventListener('click',printer);

// printing an unordered list containing the votes & views resulte.
function printer(){
  unorderl.textContent = '';
  let viewResult = [];
  for (let i = 0 ; i < Products.allProd.length ; i++ ){
    viewResult= document.createElement('li');
    viewResult.textContent =` ${Products.allProd[i].name} had ${Products.allProd[i].votes}  votes and ${Products.allProd[i].views}  views';`;
    unorderl.appendChild(viewResult);
  }

  resultfield.appendChild(unorderl);

  chartmaker();

}

// presenting the resulte in a chart using chart.js
function chartmaker(){
  let context = document.getElementById('myChart').getContext('2d');
  let ProductsNames=[];
  let ProductsVotes=[];
  let ProductsViews=[];
  for(let i=0;i<Products.allProd.length;i++){
    ProductsNames.push(Products.allProd[i].name);
    ProductsVotes.push(Products.allProd[i].votes);
    ProductsViews.push(Products.allProd[i].views);
  }

  // eslint-disable-next-line no-undef
  let chart = new Chart(context, {
    type: 'bar',
    data: {
      labels: ProductsNames,
      datasets: [{
        label: 'Products voting results',
        backgroundColor: 'rgb(139,0,0)',
        borderColor: 'rgb(220,20,60)',
        data: ProductsVotes,

      },
      {
        label: '# of views',
        backgroundColor: 'rgb(0,0,139)',
        borderColor: 'rgb(153,50,204)',
        data: ProductsViews,
      }
      ]

    },

    // Configuration options go here
    options: {
      scales: {
        xAxes: [{
          barPercentage: 0.4
        }]
      }
    }
  });
}


// function getProductData(){
//   let data=localStorage.getItem('productsdata');
//   data=JSON.parse(data);
//   console.log(data);
//   return data;
// }

getProductData();

