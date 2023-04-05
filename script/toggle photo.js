let isPhotoOn=false;
const photoElement=document.getElementById('myphoto');

function changePhotoOn(){
    isPhotoOn=!isPhotoOn;
    if (isPhotoOn) photoElement.src="img/MyFace.jpg";
    else photoElement.src='img/NoFace.jpg'
}