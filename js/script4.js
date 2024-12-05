console.log("Welcome to myTunes");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Yo Yo Singh/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Love Dose - Honey Singh ", filePath: "songs/Yo Yo Singh/1.mp3", coverPath: "covers/Yo Yo Singh/maxresdefault (7).jpg"},
    {songName: "Party All Night - Honey Singh", filePath: "songs/Yo Yo Singh/2.mp3", coverPath: "covers/Yo Yo Singh/maxresdefault (8).jpg"},
    {songName: "Dheere Dheere - Honey Singh", filePath: "songs/Yo Yo Singh/3.mp3", coverPath: "covers/Yo Yo Singh/maxresdefault (9).jpg"},
    {songName: "Brown Rang - Honey Singh", filePath: "songs/Yo Yo Singh/4.mp3", coverPath: "covers/Yo Yo Singh/maxresdefault (10).jpg"},
    {songName: "Dope Shope - Honey Singh", filePath: "songs/Yo Yo Singh/5.mp3", coverPath: "covers/Yo Yo Singh/dope-shope-yo-yo-honey-singh-deep-money.jpg"},
    {songName: "Blue Eyes - Honey Singh", filePath: "songs/Yo Yo Singh/6.mp3", coverPath: "covers/Yo Yo Singh/wallpapersden.com_yo-yo-honey-singh-blue-eyes_1588x782.jpg"},
    {songName: "Desi Kalakaar - Honey Singh", filePath: "songs/Yo Yo Singh/7.mp3", coverPath: "covers/Yo Yo Singh/4c3a54331de5d1c051915adb662a60e7.600x600x1.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

//Animation
const h1=document.querySelector(".head");
const b1=document.querySelector("#box1");
const b2=document.querySelector("#box2");
const b3=document.querySelector("#box3");
const b4=document.querySelector("#box4");
const b5=document.querySelector("#box5");
const b6=document.querySelector("#box6");
const b7=document.querySelector("#box7");

const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting) entry.target.classList.add("visible");
        if(!entry.isIntersecting) entry.target.classList.remove("visible");
    });
});

observer.observe(h1);
observer.observe(b1);
observer.observe(b2);
observer.observe(b3);
observer.observe(b4);
observer.observe(b5);
observer.observe(b6);
observer.observe(b7);
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/Yo Yo Singh/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// Function to play the next song
const playNextSong = () => {
    if (songIndex >= 6) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/Yo Yo Singh/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

// Listen for the 'ended' event to play the next song
audioElement.addEventListener('ended', playNextSong);

document.getElementById('next').addEventListener('click', playNextSong);

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src =`songs/Yo Yo Singh/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
