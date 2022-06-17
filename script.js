let allWallpapers = [];
const count = 20;
const API_URL = `https://api.unsplash.com/photos/?client_id=fI-q6kpZ15rFcjfmUM2g1nsoI4zqEPRLatQa_q8qfyk&count=${count}`
const imageContainer = document.getElementById('image-container')
const spinner = document.getElementById('loader')
let loadedImages = 0;
let totalImages = 0;
let ready = false;

const showSpinner = ()=>{
    spinner.hidden = false;
}

const hideSpinner = ()=>{
    spinner.hidden = true;
}

//fetching the photos
const getWallpapers = async() =>{
    showSpinner()
    const wallpapers = await fetch(API_URL)
    .then((resp)=>resp.json());
    hideSpinner()
    allWallpapers = wallpapers;
    totalImages = allWallpapers.length;
}

//helper function
const setAttributes = (element,attributes)=>{
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

//adding the photos into the DOM
const insertImages = ()=>{
    loadedImages = 0;
    allWallpapers.forEach(image => {    
        const item = document.createElement('a');
        const newImage = document.createElement('img')
        
        newImage.addEventListener('load',()=>{
            loadedImages++
            if(loadedImages === totalImages){
                ready = true;
            }
        })

        setAttributes(item,{
            href:image.links.html,
            target:'_blank'
        })
        setAttributes(newImage,{
            src:image.urls.regular,
            alt:image.alt_description || "no description",
            title:image.alt_description || "no title"
        })
    
        item.appendChild(newImage);
        imageContainer.appendChild(item);
    
    });

}


//this event triggers the fetch request when the scroll bar gets near the body's offset height
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 900 && ready === true){
        getWallpapers()
            .then((wallpapers)=>{
                insertImages(wallpapers);
            });
        ready = false;
    }

})


//onload
getWallpapers().then(()=>insertImages())



