let categories=['kiss','hug','laugh','smile','sleep']
let apiArray=[
    "https://coffee.alexflipnote.dev/random",
    "https://coffee.alexflipnote.dev/random.json",
    `https://nekos.best/api/v2/${categories[Math.floor(Math.random()*categories.length)]}?amount=2`,
`https://api.waifu.im/search/?included_tags=selfies`
]
let proxyurl=`https://cors-anywhere.herokuapp.com/`
let images=[];
let imagegrid = document.querySelector('.image-grid');
function loadImages(){
    fetch('https://cors-anywhere.herokuapp.com/'+apiArray[2])
    .then(response => response.json())
    .then(data => {
        console.log(typeof data)
        data.results.forEach(item=>{
            let container = document.createElement('div');
            container.classList.add('image-container')
            container.innerHTML=`
            <img src="../assets/images/pexels-pixabay-268533.jpg" alt="Dummy Image" class="dummy-image">
            <img src="${item.url}" alt="${item.anime_name}" class="main-image">
          `;
          container.addEventListener('click', () => {
            container.classList.toggle('flipped');
            // container.querySelector('.main-image').src = mainImage.dataset.src;
          });
        imagegrid.appendChild(container);
        })
    })
    .catch(error => console.log(error));
  
}
loadImages();
