let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToy(element) {
  const toyCollection = document.querySelector("#toy-collection");
  const toy = document.createElement("div");
  const toyName = document.createElement("h2");
  const toyImg = document.createElement("img");
  const toyLikes = document.createElement("p");
  const button = document.createElement("button");

  toyName.textContent = element.name;
  toyImg.src = element.image;
  toyImg.classList.add("toy-avatar");
  toyLikes.textContent = element.likes;
  button.textContent = "Like ❤️";
  button.classList.add("like-btn");
  button.setAttribute("id", element.id);

  toy.classList.add("card");
  toyCollection.append(toy);
  toy.append(toyName, toyImg, toyLikes, button);

  buttonEventListener(button, element.id, element.likes)
}

function renderToys(data) {
  for (const element of data ) {
  renderToy(element);
  }
}

function buttonEventListener(button, id, likes) {
    button.addEventListener("click", (e) => {
    e.preventDefault();
    const moreLikes = Number(e.target.value) + 1;

    fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": moreLikes
        })
      })
    .then(response => response.json())
    console.log(moreLikes)
    // .then(function (data) {
    //   (likes) = `${moreLikes} likes`;})
    //   console.log(moreLikes)
  })
}


const toyForm = document.querySelector(".add-toy-form");

toyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(newToy)
  })
  .then(function (response) {
    return response.json()})
  .then(function (data) {
      renderToy(data);})
})

fetch("http://localhost:3000/toys")
  .then(function (response) {
    return response.json()})
  .then(function (data) {
    renderToys(data);
})

