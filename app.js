// Toggling the menu bar
const menuBtn = document.querySelector('.menu-bar'),
        container = document.querySelector('.container')

const progressBar = document.querySelector('.bar'),
    progressDot = document.querySelector('.dot'),
    currentTimeEl = document.querySelector('.current-time'),
    TotalDuration = document.querySelector('.duration')


menuBtn.addEventListener('click', () => {
    container.classList.toggle('active')
})


// Song playing and functionalities
let playing = false,
    currentSong = 0,
    favorites = [],
    shuffle = false,
    repeat = false,
    audio = new Audio();

const songs = [
    {
        title:"Grave Clothes",
        artist:"Meverick City",
        img_src: "assets/1.jpg",
        src:"assets/aud1.mp3",
    },
    {
        title:"Million Little Miracles",
        artist:"Meverick City",
        img_src: "/assets/2.jpg",
        src:"assets/aud2.mp3",
    },
    {
        title:"Nzakomeza",
        artist:"Unknown",
        img_src: "assets/3.jpg",
        src:"assets/aud3.mp3",
    },
    {
        title:"Walk on water",
        artist:"Meverick City",
        img_src: "assets/4.jpg",
        src:"assets/aud4.mp3",
    },
    {
        title:"Umbereye maso",
        artist:"Gentil Misigaro",
        img_src: "assets/5.jpg",
        src:"assets/aud5.mp3",
    },
]

// Rendering the songs
const playlistContainer = document.getElementById('playlist'),
    infoWrapper = document.querySelector('.info'),
    coverImg = document.querySelector('.cover-img'),
    currentSongTitle = document.querySelector('.current-song-title'),
    currentFavorite = document.getElementById('current-favorites')

const updatePlaylist = (songs) => {
    // Removing the existing element
    playlistContainer.innerHTML = ""
    // Creating new elements
    songs.forEach((song, index) => {

        const {title, artist } = song

        // Checking the favorite song
        const isFavorite = favorites.includes(index)

        const tr = document.createElement('tr')
        tr.classList.add('songs')
        tr.innerHTML = `
             <td class="no">
                        <h5>${index+1}</h5>
                    </td>
                    <td class="title">
                        <h6>${title}</h6>
                    </td>
                    <td class="length">
                        <h6>2:03</h6>
                    </td>
                    <td >
                        <i class="fa-solid fa-heart ${isFavorite ? "active" : ""}"></i>
                    </td>
             `
             playlistContainer.appendChild(tr)

            // Playing a song from the playlist
            tr.addEventListener('click', (e) => {
                currentSong = index
                loadSongs(currentSong)
                audio.play()
                container.classList.remove('active')
                playPauseBtn.classList.replace(`fa-play`, `fa-pause`)
                playing = true
            })

            const myAudio = new Audio()
            myAudio.src = `${song.src}`
             myAudio.addEventListener('loadedmetadata',  () => {
                const duration = myAudio.duration

                let songDuration = formatTime(duration)
                tr.querySelector('.length h6').innerText = songDuration
             })

            //  Time updates
            //  myAudio.addEventListener('timeupdate', () => {
            // const currentTime = myAudio.currentTime;
            // const songTime = formatTime(currentTime);
            // tr.querySelector('.length h6').innerText = songTime;
            //  })

    })

}

    // Fomating the song duration
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        let seconds = Math.floor(time % 60)
        seconds = seconds < 0 ? `0${seconds}`: seconds
        return `${minutes}:${seconds}`
    }

    // Audio play functionality
    const loadSongs = (song) => {
        infoWrapper.innerHTML = `
            <h2>${songs[song].title}</h2>
            <h3>${songs[song].artist}</h3>
        `
        // Changing the backkground image of the current song
        coverImg.style.backgroundImage = `url(${songs[song].img_src})`
        // Add a song
        audio.src = `${songs[song].src}`
        // Current song title
        currentSongTitle.innerHTML = songs[song].title

        if(favorites.includes(song)){
            currentFavorite.classList.add('active')
        }else{
            currentFavorite.classList.remove('active')
        }
    }

    // Play the song

    const playPauseBtn = document.getElementById('play-pause'),
        prev = document.getElementById('prev'),
        next = document.getElementById('next')

        playPauseBtn.addEventListener('click', () => {

            if(playing){
                playPauseBtn.classList.replace(`fa-pause`, `fa-play`)
                playing = false
                audio.pause()
            }else{
                 playPauseBtn.classList.replace(`fa-play`, `fa-pause`)
                playing = true
                audio.play()
            }
        })

        // Next and previous songs
        const nextSong = () => {
            if(currentSong < songs.length -1){
                currentSong++
            }else{
                currentSong = 0 
            }
            loadSongs(currentSong)

            if(playing){
                audio.play()
            }
        }

        next.addEventListener('click', nextSong)

        // Previous song
        const prevSong = () => {
            if(currentSong > 0 ){
                currentSong --
            }else{
                currentSong = songs.length-1
            }
            loadSongs(currentSong)

            if(playing){
                audio.play()
            }
        }
        prev.addEventListener('click', prevSong)

        // Progress  bar
        const progress = () => {
        let { duration, currentTime } = audio;

        if (!isNaN(duration) && isFinite(duration)) {
            currentTimeEl.innerHTML = formatTime(currentTime);
            TotalDuration.innerHTML = formatTime(duration);

            let progressPercentage = (currentTime / duration) * 100;
            progressDot.style.left = `${progressPercentage}%`;
        }
    };

    audio.addEventListener('timeupdate', progress);

    const setProgress = (e) => {
        let width = progressBar.clientWidth
        let clickX = e.offsetX
        let duration = audio.duration
        audio.currentTime = (clickX / width) * duration
    }

    progressBar.addEventListener('click', setProgress)

    // Calling the function
    const init = () => {
        updatePlaylist(songs)
        loadSongs(currentSong)
    }
    init()

