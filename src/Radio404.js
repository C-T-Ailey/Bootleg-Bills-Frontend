import React, { useState } from 'react'
import {BsChevronCompactDown, BsChevronCompactUp, BsFillVolumeUpFill, BsSkipForwardCircle, BsVolumeMuteFill} from 'react-icons/bs'
import './Radio.css'


export default function Radio404(props) {

    const randInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    
    const audioLibrary = [
        {
            name:"'Tony Hawk's Pro Skater Main Menu Loop' - Brian Bright",
            url: "https://od.lk/s/OTFfMjgxMzAyMjFf/thps_loop_neater.mp3"
        },
        {
            name:"'Oblivion (Double Bill Mix)' - Grimes ft. Astrophysics",
            url: "https://od.lk/s/OTFfMjgxMzA1OTZf/grimes-miku%20oblivion%20mix.mp3"
        },
        {
            name: "'Tony Hawk's Pro Skater 2 Main Menu Loop' - Brian Bright",
            url: "https://od.lk/s/OTFfMjgxMzA1OTdf/Brian%20Bright%20-%20THPS%202%20Menu%20Music.mp3"
        },
        {
            name: "'Midnight Specimen' - Disconscious",
            url: "https://od.lk/s/OTFfMjgxMzA2MDBf/Disconscious%20-%20Hologram%20Plaza%20-%2009%20Midnight%20Specimen.mp3"
        },
        {
            name: "'Self-Discovery' - Luxury Elite",
            url: "https://od.lk/s/OTFfMjgxMzA2MTdf/Self-Discovery.mp3"
        },
        {
            name: "'Ain't Got Time to Waste' - Aim ft. YZ",
            url: "https://od.lk/s/OTFfMjgxMzA2NDVf/Ain%27t%20Got%20Time%20to%20Waste%20-%20Aim%20ft.%20YZ.mp3"
        },
        {
            name: "'Aquasky' - Blue Thunder",
            url: "https://od.lk/s/OTFfMjgxMzA2NDdf/Aquasky%20-%20Blue%20Thunder.mp3"
        },
        {
            name: "'Le Hot '99' - Grand Unified",
            url: "https://od.lk/s/OTFfMjgxMzA2NDlf/Grand%20Unified%20-%20Le%20Hot%20%2799.mp3"
        },
        {
            name: "'In Drag Net' - Gex 3D: Enter the Gecko OST",
            url: "https://od.lk/s/OTFfMjgxMzA2NDhf/Gex%20Enter%20the%20Gecko%20OST%20-%20In%20Drag%20Net.mp3"
        },
        {
            name: "'SimpsonWave1995' - Frank Contreras",
            url: "https://od.lk/s/OTFfMjgxMzc2Njdf/FrankJavCee%20-%20SimpsonWave1995.mp3"
        },
        {
            name: "'Domino Line' - Casiopea",
            url: "https://od.lk/s/OTFfMjgxNDkxMjBf/Casiopea%20-%20Domino%20line.mp3"
        },
        {
            name: "'Ode to an African Violet' - Mort Garson",
            url: "https://od.lk/s/OTFfMjgxNDkxMjVf/Ode%20to%20an%20African%20Violet.mp3"
        },
        {
            name: "'Tekken 2 OST: Jun Kazama (Morning Field)' - Yoshie Arakawa",
            url: "https://od.lk/s/OTFfMjgxNDkxMjdf/Tekken%202%20-%20Jun%20Kazama%20Theme%20%28Morning%20Field%29.mp3"
        },
        {
            name: "'Escape from New York: Main Theme' - John Carpenter",
            url: "https://od.lk/s/OTFfMjgxNDkxNjlf/Escape%20From%20New%20York%20Theme.mp3"
        },
        {
            name: "'Streets of Rage 2 OST: Slow Moon' - Yuzo Koshiro",
            url:"https://od.lk/s/OTFfMjgxNDkxNzBf/Streets%20Of%20Rage%202%20-%20Slow%20Moon.mp3"
        },
        {
            name: "'MGS2 OST: Plant Sneaking Theme' - Norihiko Hibino & Harry Gregson-Williams",
            url: "https://od.lk/s/OTFfMjgxNDkxNzFf/Metal%20Gear%20Solid%202%20Soundtrack%20-%20Plant%20Sneaking%20Theme.mp3"
        },
        {
            name: "'Tekken 3 OST: Dr. Bosconovich' - Nobuyoshi Sano & Keiichi Okabe",
            url: "https://od.lk/s/OTFfMjgxNDkxNzJf/Tekken%203%20Arranged%20OST%20Dr.%20Boskonovitch.mp3"
        }
    ]

    
    const [selectedTrack, setSelectedTrack] = useState(randInt(0, audioLibrary.length-1))
    const [audioMuted, setAudioMuted] = useState(true)
    const [toggleVisible, setToggleVisible] = useState("hideToggle")
    const [playerVisible, setPlayerVisible] = useState("radioVisible")
    const [audioCanPlay, setAudioCanPlay] = useState(false)
    const [volume, setVolume] = useState(5)
    const [tracksPlayed, setTracksPlayed] = useState([])

    const handleMute = () => {
        let audio = document.getElementById("daFunk")
        audio.muted = !!audio.muted ? false : true
        setAudioMuted(audio.muted)
        if (!audio.muted) {
            audio.volume = volume / 10
        }
    }
    
    const handleSkip = () => {

        // let newTrack = randInt(0,audioLibrary.length-1)


        // const querySame = () => {return newTrack === selectedTrack}


        // while (querySame()) {
        //     let newerTrack = randInt(0,audioLibrary.length-1)
        //     console.log(newerTrack)
        //     newTrack = newerTrack

        // }

        let newTrack = selectedTrack !== audioLibrary.length - 1 ? selectedTrack+1 : 0

        setSelectedTrack(newTrack)
    }

    const handleVolume = (e) => {
        let audio = document.getElementById("daFunk")
            if (e.target.className === "volUp") {
                if (volume < 10){
                    audio.volume = (volume +1) /10
                    console.log("new volume:",audio.volume)
                    setVolume(volume+1)
                    
                }
            } else if (e.target.className === "volDown") {

                if (volume > 0){
                    audio.volume = (volume -1) /10
                    console.log("new volume:",audio.volume)
                    setVolume(volume-1)
                }
                
            };
            console.log("Current volume:", audio.volume)

        
    }

    return (
        <div>
        <audio id="daFunk" controls={false} src={audioLibrary[selectedTrack].url} autoPlay loop muted onCanPlay={() => setAudioCanPlay(true)}></audio>
          
          
            <div className={playerVisible}>

                <div className="radioContainer" onMouseOver={() => setToggleVisible("showToggle")} onMouseOut={() => setToggleVisible("hideToggle")}>

                    <div className="muteContainer">

                    { !audioMuted ? <BsFillVolumeUpFill id="mute" size={38} onClick={() => handleMute()}></BsFillVolumeUpFill> : <BsVolumeMuteFill id="mute" size={38} onClick={() => handleMute()}></BsVolumeMuteFill>}

                    </div>

                    <div className='marqueeContainer'>

                    <div id='marquee'>

                        { !!audioCanPlay ?

                            <div id="marquee__content">
                                <p className='marqueeContent'>&nbsp; &nbsp; &nbsp; Now Playing: &nbsp; &nbsp; &nbsp; {audioLibrary[selectedTrack].name}</p>
                            </div>
                            
                        :

                            <div>
                                <p className='marqueeContent'>Loading...</p>
                            </div>

                        }

                    </div>

                </div>

                    <div className="newTrackContainer">
                        <BsSkipForwardCircle id="skip" size={38} onClick={() => handleSkip()}/>
                    </div>
                    
                </div>
                
                <div className='toggleContainer' onMouseEnter={() => setToggleVisible("showToggle")} onMouseLeave={() => setToggleVisible("hideToggle")}>

                    

                        <div className={toggleVisible}>
                            
                            <div className='volumeControls'>
                                <div className={volume === 0 ? "volDisabled" : "volDown"} onClick={(e) => {handleVolume(e)}}>-</div>
                                <div className="volumeDisplay">{volume}</div>
                                <div className={volume === 10 ? "volDisabled":"volUp"} onClick={(e) => {handleVolume(e)}}>+</div>
                            </div>
                        
                            <div className='toggleButton' onClick={() => setPlayerVisible(playerVisible === "radioVisible" ? "radioHidden" : "radioVisible")}>
                                {playerVisible === "radioVisible"?<BsChevronCompactUp/>:<BsChevronCompactDown/>}
                            </div>

                            <div className='thirdPanel'>

                            </div>

                        </div>
                        
                        {/* <div id='volume-controls'>
                            
                        </div> */}
                

                </div>

            </div>

    </div>
  )
}
