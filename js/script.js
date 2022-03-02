document.getElementById('search-btn').addEventListener('click', function () {
  const searchText = document.getElementById('search-input').value;
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
    const phonesDiv = document.getElementById('phones-div');
    for (const phone of phones) {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">Brand: ${phone.brand}</p>
        <a href="#" class="btn btn-success" >More Info</a>
      </div>
      `;
      phonesDiv.appendChild(div);
    }
  }
})
