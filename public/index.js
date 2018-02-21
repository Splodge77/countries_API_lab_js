const app = function(){
  const url = "https://restcountries.eu/rest/v2/all";

  const select = document.querySelector('#country-select');

  makeRequest(url, requestComplete);

  const countrySelected = JSON.parse(localStorage.getItem('country')) || {};
  const pTag1 = document.querySelector('#country-select-result');
  pTag1.innerText = "You have selected: " + countrySelected.name;
  const pTag2 = document.querySelector('#population-select-result');
  pTag2.innerText = "It's population is: " + countrySelected.population;
  const pTag3 = document.querySelector('#capital-select-result');
  pTag3.innerText = "The capital is: " + countrySelected.capital;
};

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const countries = JSON.parse(jsonString);
  populateDropdown(countries);
};

const handleSelectChanged = function(countries, index){
  save(countries[index])
  const pTag1 = document.querySelector('#country-select-result');
  pTag1.innerText = "You have selected: " + countries[index].name;
  const pTag2 = document.querySelector('#population-select-result');
  pTag2.innerText = "It's population is: " + countries[index].population;
  const pTag3 = document.querySelector('#capital-select-result');
  pTag3.innerText = "The capital is: " +countries[index].capital;
};

const populateDropdown = function(countries){
  const select = document.getElementById("country-select");

  countries.forEach(function(country, index){
    // create an option tag
    const option = document.createElement('option');
    // option tag should have its innerText changed - maybe country name?
    option.innerText = country.name;
    option.value = index;
    // append it to the select tag
    select.appendChild(option);
  });

  select.addEventListener("change", function(){
    handleSelectChanged(countries, this.value)
  });
};

const save = function(newCountry){
  // const countrySelected = JSON.parse(localStorage.getItem('country')) || {};
  // countrySelectedArray.push(newCountry);
  localStorage.setItem('country', JSON.stringify(newCountry));
};

document.addEventListener('DOMContentLoaded', app);
