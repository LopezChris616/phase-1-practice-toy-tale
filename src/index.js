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

  getToyData();
  newToy();
});

function getToyData() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => toys.forEach(toys => displayToys(toys)))
    .catch(err => console.log(err));
}

function displayToys(toy) {
  const toyCard = document.createElement("div");
  const toyName = document.createElement("h2");
  const toyPicture = document.createElement("img");
  const toyLikes = document.createElement("p");
  const toyLikesBtn = document.createElement("button");
  const toyCollection = document.getElementById("toy-collection");

  toyCard.classList.add("card");
  toyPicture.classList.add("toy-avatar");
  toyName.textContent = toy.name;
  toyPicture.setAttribute("src", toy.image);
  toyLikes.textContent = `${toy.likes} likes`;
  toyLikesBtn.textContent = "Like ❤️";

  toyCard.append(toyName, toyPicture, toyLikes, toyLikesBtn);
  toyCollection.appendChild(toyCard);
}

function newToy() {
  const submitToy = document.querySelector(".add-toy-form");
  submitToy.addEventListener("submit", event => {
    event.preventDefault();

    const toyData = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    }

    displayToys(toyData);

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyData)
    })
      .then(resp => resp.json())
      .then(toy => console.log(toy))
      .catch(err => console.log(err))
  });
}