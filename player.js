(
  () => {
      var progressBar = document.querySelector(".progress");

      for (i = 0; i < 100; i++){
          let span = document.createElement("span");
          span.style.setProperty("--i", i);
          progressBar.append(span);
      }
  }
)();

let audio = document.querySelector("audio");
let play_pause = document.querySelector(".play_pause");
let duration = document.querySelector(".duration");
let current = document.querySelector(".current");
let list_span = document.querySelectorAll(".progress span");
let volume_span = document.querySelectorAll(".volume span");

let timeFormat = (time) => {
  second = Math.floor(time % 60);
  minute = Math.floor((time / 60) % 60);
  if (second < 10) {
      second = "0" + second;
  }

  time = minute + ":" + second;
  return time;
};

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = timeFormat(audio.duration);
});

play_pause.addEventListener("click", () => { 
  let iBtn = document.querySelector(".play_pause i");

  if (audio.paused) {
      audio.play();
      iBtn.classList.replace("bx-play-circle", "bx-pause-circle");
  } else {
       audio.pause();
      iBtn.classList.replace( "bx-pause-circle","bx-play-circle");
  }
});

audio.addEventListener("timeupdate", () => { 
  time_current = audio.currentTime;
  time_duration = audio.duration;

  let position = Math.floor((time_current * 100) / time_duration);
  
  current.textContent = timeFormat(time_current);
  
  list_span[position].classList.add("active");
});

audio.volume = 0.5;

volume_span.forEach((element) => {
  element.addEventListener("click", (e) => { 
      let volume = 0;

      if (element.classList.contains("volume-down")) {
          volume = audio.volume - 0.1;
      } else if (element.classList.contains("volume-up")) {
          volume = audio.volume + 0.1;
      }

      if (volume < 0) {
          audio.volume = 0;
      } else if (volume > 1) {
          audio.volume = 1;
      } else {
          audio.volume = volume;
      }

      let width = audio.volume * 150;
      let bar = document.querySelector(".volume-bar");
      bar.style.setProperty("width", width + "px");
  }); 
});


list_span.forEach((element, index) => {
  element.addEventListener("click", (e) => {
      list_span.forEach((e) => {
          e.classList.remove("active");
      })

      for (k = 0; k <= index; k++){
          list_span[k].classList.add("active");
      }

      let time_go = (index * audio.duration) / 100;
      audio.currentTime = time_go;
  })

});

audio.addEventListener("ended", e => {
  let iBtn = document.querySelector(".play_pause i");
  iBtn.classList.replace("bx-pause-circle", "bx-play-circle");
  current.textContent = "0:00";
  
  list_span.forEach((e) => {
      e.classList.remove("active");
  })
})