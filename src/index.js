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
});

function getToyData() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => {
      displayToys(toys);
    })
    .catch(err => console.error(err));
}

function displayToys(toys) {
  const toysArr = [...toys];

  toysArr.forEach(toy => {
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
  });
}