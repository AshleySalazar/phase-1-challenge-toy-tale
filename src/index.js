let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection');
  const form = document.querySelector('form');
  const likeButtons = document.getElementsByClassName('like-btn');

  const likeFunc = (event, numLikes) => {
    event.preventDefault();

    const { id } = event.target;
    const newNumLikes = { likes: parseInt(numLikes) + 1 };
    const likeUrl = `http://localhost:3000/toys/${id}`;
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newNumLikes)
    };

    fetch(likeUrl, config)
      .then(res => res.json())
      .then(response => console.log(response))
      .catch(e => console.log(e));
  };

  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
      const createCard = (id, name, image, likes) => {
        return `<div class="card"><h2>${name}</h2><img src=${image} height="250" width="250"><p>${likes} likes</p><button class="like-btn" id=${id}>Like ${id}</button></div>`
      };

      toys.forEach(toy => {
        toyCollection.innerHTML += createCard(toy.id, toy.name, toy.image, toy.likes);
      });

      Array.from(likeButtons).forEach(el => {
        const numLikes = el.previousSibling.innerText.split('')[0];
        el.addEventListener('click', (event) => likeFunc(event, numLikes));
      })
    });


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const toyName = document.querySelector('input[name="name"]').value;
    const toyImage = document.querySelector('input[name="image"').value;
    const newToy = {
      name: toyName,
      image: toyImage,
      likes: 0
    };
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToy)
    }

    fetch('http://localhost:3000/toys', config)
      .then(res => console.log(res.json()))
      .catch(e => console.log(e))
  });
});
