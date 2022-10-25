const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//functions to handle video scrubbing
function videoScrub(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;

}

let mouseDown = false;

//functions to handle video play toggling
function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    if(video.paused) {
        toggle.innerText = '►';
    } else {
        toggle.innerText = '| |';
    }
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

//functions to handle video skipping
function timeSkip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click', timeSkip))

//functions to handle video volume
function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.value);
}
progress.addEventListener('mousemove', (e) => {
    mouseDown && videoScrub(e);
});
progress.addEventListener('click', videoScrub);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
video.addEventListener('timeupdate', handleProgress);
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));