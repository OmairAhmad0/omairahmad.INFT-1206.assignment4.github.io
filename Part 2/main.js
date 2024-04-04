const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];

/* Declaring the alternative text for each image file */
const altText = {
    "pic1.jpg": "Blue eye",
    "pic2.jpg": "Rock pattern",
    "pic3.jpg": "Purple and white flowers",
    "pic4.jpg": "Ancient Eegyption wall art",
    "pic5.jpg": "Moth",
}

/* Looping through images */
for (const i of images) {
    const newImage = document.createElement('img');

    newImage.setAttribute('src', "images/" + i);
    newImage.setAttribute('alt', altText[i]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener("click", () => displayedImage.src = newImage.src);
    newImage.addEventListener("click", () => displayedImage.alt = newImage.alt);
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
    if (btn.getAttribute("class") === "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
})
