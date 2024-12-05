console.log("Welcome to myTunes");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Sanam/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Likhe Jo Khat Tujhe - Sanam ", filePath: "songs/Sanam/1.mp3", coverPath: "covers/Sanam/maxresdefault (3).jpg"},
    {songName: "Gulabi Aankhen - Sanam", filePath: "songs/Sanam/2.mp3", coverPath: "covers/Sanam/sddefault.jpg"},
    {songName: "Ek Ladki Ko Dekha - Sanam", filePath: "songs/Sanam/3.mp3", coverPath: "covers/Sanam/R.jpeg"},
    {songName: "Neele Neele Ambar Par - Sanam", filePath: "songs/Sanam/4.mp3", coverPath: "covers/Sanam/maxresdefault (4).jpg"},
    {songName: "Ek Pyaar Ka Nagma - Sanam", filePath: "songs/Sanam/5.mp3", coverPath: "covers/Sanam/maxresdefault (1).jpg"},
    {songName: "Hai Apna Dil To Awara - Sanam", filePath: "songs/Sanam/6.mp3", coverPath: "covers/Sanam/maxresdefault (2).jpg"},
    {songName: "Mere Mehboob Qayamat Hogi - Sanam", filePath: "songs/Sanam/7.mp3", coverPath: "covers/Sanam/OIP (1).jpeg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

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
        audioElement.src = `songs/Sanam/${songIndex+1}.mp3`;
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
    audioElement.src = `songs/Sanam/${songIndex+1}.mp3`;
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
    audioElement.src = `songs/Sanam/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


