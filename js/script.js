document.getElementById('search-btn').addEventListener('click', function () {
  const searchField = document.getElementById('search-input');
  const searchText = searchField.value;
  const phonesUrl = `
  https://openapi.programming-hero.com/api/phones?search=${searchText}
  `;
  const loadPhones = () => {
    fetch(phonesUrl)
      .then(res => res.json())
      .then(data => displayPhones(data.data));
  }
  loadPhones();

  const displayPhones = phones => {
    const first20Phones = phones.slice(0, 20);
    const phonesDiv = document.getElementById('phones-div');
    const loadMoreBtn = document.createElement('div');
    loadMoreBtn.classList.add('d-grid', 'w-100')
    loadMoreBtn.innerHTML = `<button class="btn btn-success mt-3" type="button">Load More</button>`
    for (const phone of first20Phones) {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">Brand: ${phone.brand}</p>
        <a href="#" class="btn btn-success" onclick="loadPhoneInfo('${phone.slug}')">More Info</a>
      </div>
      `;
      phonesDiv.appendChild(div);
      phonesDiv.appendChild(loadMoreBtn);
    }
  }
})
const loadPhoneInfo = slug => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneInfo(data.data))
}
const displayPhoneInfo = phone => {
  const phoneInfo = document.getElementById('phone-info');
  phoneInfo.innerHTML = `
    <div class="card w-50 p-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${phone.image}" class="img-fluid rounded-start" alt="">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <p class="card-title">${phone.name}</p>
            <p class="card-title">Brand: ${phone.brand}</p>
            <p>Release Date: ${phone.releaseDate}</p>
            <p class="card-text"></p>
          </div>
        </div>
      </div>
    </div>
  `;
}
