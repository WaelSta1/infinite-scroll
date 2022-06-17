const API_URL = `https://api.unsplash.com/photos/?client_id=fI-q6kpZ15rFcjfmUM2g1nsoI4zqEPRLatQa_q8qfyk`
const imageContainer = document.getElementById('image-container')


const getWallpapers = async() =>{
    const wallpapers = await fetch(API_URL)
    .then((resp)=>resp.json());
    console.log(wallpapers);
    return wallpapers
}

const insertImages = (wallpapers)=>{
    wallpapers.forEach(image => {
        //creating a element for each pic and setting it
        const item = document.createElement('a');
        item.setAttribute('href',image.links.html);
        item.setAttribute('target','_blank');
        const newImage = document.createElement('img')
        newImage.src =  image.urls.regular;
        newImage.alt = image.alt_description || "no description";
        newImage.title = image.alt_description || "no description";
        item.appendChild(newImage);
        imageContainer.appendChild(item);

    });

}
//onload
getWallpapers()
.then((wallpapers)=>{
    insertImages(wallpapers);
})


