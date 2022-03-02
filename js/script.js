// search btn event handler
document.getElementById('search-btn').addEventListener('click', function () {
  // get searchField
  const searchField = document.getElementById('search-input');
  const searchText = searchField.value;
  // dynamic api link created
  const phonesUrl = `
  https://openapi.programming-hero.com/api/phones?search=${searchText}
  `;
  // load all phones data
  const loadPhones = () => {
    fetch(phonesUrl)
      .then(res => res.json())
      .then(data => displayPhones(data.data));
  }
  loadPhones();
  // phone display function
  const displayPhones = phones => {
    // first 20 phone display method
    const first20Phones = phones.slice(0, 20);
    // get phones div 
    const phonesDiv = document.getElementById('phones-div');
    // get phone info div 
    const phoneInfo = document.getElementById('phone-info');
    // clear phones div and phone info div 
    phonesDiv.textContent = '';
    phoneInfo.textContent = '';
    // load more button created
    const loadMoreBtn = document.createElement('div');
    loadMoreBtn.classList.add('d-grid', 'w-100')
    loadMoreBtn.innerHTML = `<button id="load-more-btn" class="btn btn-success mt-3" type="button">Load More</button>`
    // display first 20 Phones function
    for (const phone of first20Phones) {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
      <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">Brand: ${phone.brand}</p>
        <a href="#" class="btn btn-success" onclick="loadPhoneInfo('${phone.slug}')">More Info</a>
      </div>
      `;
      phonesDiv.appendChild(div);
      phonesDiv.appendChild(loadMoreBtn);
      // clear search field 
      searchField.value = '';
    }
  }
})
// loadPhoneInfo function
const loadPhoneInfo = slug => {
  // dynamic phone info api 
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneInfo(data.data))
}
// phone info display function 
const displayPhoneInfo = phone => {
  // get phone info div 
  const phoneInfo = document.getElementById('phone-info');
  // phone info set up 
  phoneInfo.innerHTML = `
    <div class="card w-75 p-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${phone.image}" class="img-fluid rounded-start" alt="">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <h6 class="card-title">Brand: ${phone.brand}</h6>
            <h6 class="text-danger">Release Date: ${phone.releaseDate}</h6>
            <p class="card-text">Chipset: ${phone.mainFeatures.chipSet}</p>
            <p class="card-text">Display Size: ${phone.mainFeatures.displaySize}</p>
            <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
            <p class="card-text">Sensors: ${phone.mainFeatures.sensors}</p>
            <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
