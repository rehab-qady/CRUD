let ProductName=document.getElementById('name');
let producrPrice=document.getElementById('price');
let productCateg=document.getElementById('categ'); 
let productDesc=document.getElementById('desc'); 

let productList=[];
if(localStorage.getItem('prosuctDataItems') != null){
  productList=JSON.parse(localStorage.getItem('prosuctDataItems'));
  displayData(productList);
}

function getData(){
   if(validateName() && validatePrice() && validateCateg() && validateDesc()){
    let productData={
      name:ProductName.value,
      price:producrPrice.value,
      category:productCateg.value,
      description:productDesc.value,
  }
 
  productList.push(productData);
  localStorage.setItem('prosuctDataItems',JSON.stringify( productList))
  displayData(productList);
  clearForm();

   }
}

function displayData(list){
    let cartona=''; 
    for (let i = 0; i<list.length ; i++) {
       cartona+=`
     <tr>
       <td>${list[i].name}</td>
       <td>${list[i].price}</td>
       <td>${list[i].category}</td>
       <td>${list[i].description}</td>
       <td>  <button class="btn btn-outline-warning " onclick='preUpdateProduct(${i})'>Updata</button></td>
       <td> <button class="btn btn-outline-danger" onclick='deleteProduct(${i})'>Delete</button></td>
    </tr>`
   document.getElementById('data').innerHTML=cartona;
  }
}

function clearForm(){
  ProductName.value='';
  producrPrice.value='';
  productCateg.value='';
  productDesc.value='';
}

function deleteProduct(index){
  productList.splice(index,1);
  displayData(productList);
  localStorage.setItem('prosuctDataItems',JSON.stringify( productList))
}

let updateIndex;
function preUpdateProduct(index){
  updateIndex=index;
  ProductName.value=productList[index].name;
  producrPrice.value=productList[index].price;
  productCateg.value=productList[index].category;
  productDesc.value=productList[index].description;
  document.getElementById('update').classList.remove('d-none');
  document.getElementById('submit').classList.add('d-none');
  
}

function updateProduct(){
  var update={
    name:ProductName.value,
    price:producrPrice.value,
    category:productCateg.value,
    description:productDesc.value,
  }
  productList.splice(updateIndex,1,update);
  displayData(productList);
  localStorage.setItem('prosuctDataItems',JSON.stringify( productList));
  clearForm();
  document.getElementById('update').classList.add('d-none');
  document.getElementById('submit').classList.remove('d-none');
}

function search(letter){
  let foundedProduct=[];
  for(let i=0 ; i<productList.length ; i++){
       if(productList[i].name.toLowerCase().includes(letter.toLowerCase())){
        foundedProduct.push(productList[i]);
        displayData(foundedProduct);
       }
  }
}
function validateName(){
  let regexName=/^[A-Z][a-z]{2,}$/
  let errorName=document.getElementById('errorName');
  if(regexName.test(ProductName.value)){
    ProductName.classList.replace('is-invalid','is-valid');
    errorName.classList.replace('d-block','d-none');
    return true;
  }else{
    ProductName.classList.add('is-invalid');
    errorName.classList.replace('d-none','d-block');
    return false;
  }
}

function validatePrice(){
  let regexPrice=/^[0-9]{4,}$/
  let errorPrice=document.getElementById('errorPrice');
  if(regexPrice.test(producrPrice.value)){
    producrPrice.classList.replace('is-invalid','is-valid');
    errorPrice.classList.replace('d-block','d-none');
    return true;
  }else{
    producrPrice.classList.add('is-invalid');
    errorPrice.classList.replace('d-none','d-block');
    return false;
  }
}
function validateCateg(){
  let regexCateg=/^[A-Z][a-z]{2,}$/
  let errorCateg=document.getElementById('errorCateg');
  if(regexCateg.test(productCateg.value)){
    productCateg.classList.replace('is-invalid','is-valid');
    errorCateg.classList.replace('d-block','d-none');
    return true;
  }else{
    productCateg.classList.add('is-invalid');
    errorCateg.classList.replace('d-none','d-block');
    return false;
  }
}
function validateDesc(){
  let regexDesc=/^[A-Z][a-z]{2,}$/
  let errorDesc=document.getElementById('errorDesc');
  if(regexDesc.test(productDesc.value)){
    productDesc.classList.replace('is-invalid','is-valid');
    errorDesc.classList.replace('d-block','d-none');
    return true;
  }else{
    productDesc.classList.add('is-invalid');
    errorDesc.classList.replace('d-none','d-block');
    return false;
  }
}
document.querySelector('form').addEventListener('submit',(e)=>e.preventDefault())