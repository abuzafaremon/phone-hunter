document.getElementById('search-btn').addEventListener('click', function () {
  const searchText = document.getElementById('search-input').value;
  const phonesUrl = `
  https://openapi.programming-hero.com/api/phones?search=${searchText}
  `;
  const loadPhones = () => {
    fetch(phonesUrl)
      .then(res => res.json())
      .then(data => console.log(data.data));
  }
  loadPhones();


})
