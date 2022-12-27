const musicWrap=document.querySelector(".wrapper");
const musicAudio=musicWrap.querySelector("#main-audio");
const playBtn=musicWrap.querySelector("#play-btn");
const musicPlay=()=>{
    playBtn.innerHTML="pause";
    musicAudio.play();
}
const musicAudioPause=()=>{
    playBtn.innerHTML="play_arrow";
    musicAudio.pause();
}
playBtn.addEventListener("click",()=>{
    let getText=playBtn.innerText;
    (getText=="pause")? musicAudioPause():musicPlay();
});
let list_index=0; // musicList[0] --> musicList[5] 순환 호출
const albumImg=musicWrap.querySelector(".m-img>img");
const m_name=musicWrap.querySelector(".name");
const m_artist=musicWrap.querySelector(".artist"); //musicAudio
const loadMusic=(num)=>{
albumImg.src=`images/${musicList[num].img}.jpg`; //img 경로
musicAudio.src=`songs/${musicList[num].audio}.mp3`; //audio 경로
m_name.innerText=musicList[num].name; // name 글자정보
m_artist.innerText=musicList[num].artist;
}
window.addEventListener("load",()=>{
loadMusic(list_index);
});

const prevBtn=musicWrap.querySelector("#prev-btn");
const nextBtn=musicWrap.querySelector("#next-btn");
const prevMusic=()=>{
list_index--;
if(list_index<0){ list_index=musicList.length-1}
loadMusic(list_index);
musicPlay();
}
const nextMusic=()=>{
    list_index++;
    if(list_index>=musicList.length){ list_index=0;}
    loadMusic(list_index);
    musicPlay();
}
prevBtn.addEventListener("click",()=>{ prevMusic();  });
nextBtn.addEventListener("click",()=>{ nextMusic();  });

const progressive=musicWrap.querySelector(".m-progress");
const progressBar=progressive.querySelector(".bar");
const playTime=progressive.querySelector(".current");
const totalTime=progressive.querySelector(".duration");
//this , event.target , event.currentTarget
musicAudio.addEventListener("timeupdate",(event)=>{
    let current=event.target.currentTime;
    let duration=event.target.duration;
    let progressRatio=(current/duration)*100;
    progressBar.style.width=`${progressRatio}%`;
    let currentMin=Math.floor(current/60);
    let currentSec=Math.floor(current%60);
    if(currentSec<10){ currentSec=`0${currentSec}`;}
    playTime.innerHTML=`${currentMin}:${currentSec}`;
    musicAudio.addEventListener("loadeddata",(e)=>{
        let totalDuration=musicAudio.duration;
        let totalMin=Math.floor(totalDuration/60);
        let totalSec=Math.floor(totalDuration%60);
        if(totalSec<10){ totalSec=`0${totalSec}`;}
        totalTime.innerHTML=`${totalMin}:${totalSec}`;
    });
progressive.addEventListener("click",(e)=>{
    let maxWidth=progressive.clientWidth;
    let clickXposition=e.offsetX;
    let totalDuration=musicAudio.duration;
    musicAudio.currentTime=(clickXposition/maxWidth)*totalDuration;
    musicPlay();
});
const mRepeat=musicWrap.querySelector("#repeat-btn");
musicAudio.addEventListener("ended",()=>{
    let getText=mRepeat.innerText;
    if(getText=="repeat"){ nextMusic(); }
});

});