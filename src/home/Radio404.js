import React, { useState, useEffect } from 'react'
import {BsChevronCompactDown, BsChevronCompactUp, BsFillVolumeUpFill, BsSkipForwardCircle, BsVolumeMuteFill} from 'react-icons/bs'
import RadioTrans1 from './assets/audio/radio_transition_1.ogg'
import RadioTrans2 from './assets/audio/radio_transition_2.ogg'
import RadioTrans3 from './assets/audio/radio_transition_3.ogg'
import TapeClick from './assets/audio/tape_click.ogg'
import './Radio.css'


export default function Radio404(props) {
    
    const audioLibrary = [
        {
            name:'Tony Hawk\'s Pro Skater OST: "Main Menu Loop" - Brian Bright',
            url: "https://od.lk/s/OTFfMjgxMzAyMjFf/thps_loop_neater.mp3"
        },
        {
            name:'"Oblivion (Double Bill Mix)" - Grimes ft. Astrophysics',
            url: "https://od.lk/s/OTFfMjgxMzA1OTZf/grimes-miku%20oblivion%20mix.mp3"
        },
        {
            name: 'Tony Hawk\'s Pro Skater 2 OST: "Main Menu Loop" - Brian Bright',
            url: "https://od.lk/s/OTFfMjgxMzA1OTdf/Brian%20Bright%20-%20THPS%202%20Menu%20Music.mp3"
        },
        {
            name: '"Midnight Specimen" - Disconscious',
            url: "https://od.lk/s/OTFfMjgxMzA2MDBf/Disconscious%20-%20Hologram%20Plaza%20-%2009%20Midnight%20Specimen.mp3"
        },
        {
            name: '"Self-Discovery" - Luxury Elite',
            url: "https://od.lk/s/OTFfMjgxMzA2MTdf/Self-Discovery.mp3"
        },
        {
            name: '"Ain\'t Got Time to Waste" - Aim ft. YZ',
            url: "https://od.lk/s/OTFfMjgxMzA2NDVf/Ain%27t%20Got%20Time%20to%20Waste%20-%20Aim%20ft.%20YZ.mp3"
        },
        {
            name: '"Aquasky" - Blue Thunder',
            url: "https://od.lk/s/OTFfMjgxMzA2NDdf/Aquasky%20-%20Blue%20Thunder.mp3"
        },
        {
            name: '"Le Hot \'99" - Grand Unified',
            url: "https://od.lk/s/OTFfMjgxMzA2NDlf/Grand%20Unified%20-%20Le%20Hot%20%2799.mp3"
        },
        {
            name: '"SimpsonWave1995" - Frank Contreras',
            url: "https://od.lk/s/OTFfMjgxMzc2Njdf/FrankJavCee%20-%20SimpsonWave1995.mp3"
        },
        {
            name: '"Domino Line" - Casiopea',
            url: "https://od.lk/s/OTFfMjgxNDkxMjBf/Casiopea%20-%20Domino%20line.mp3"
        },
        {
            name: '"Ode to an African Violet" - Mort Garson',
            url: "https://od.lk/s/OTFfMjgxNDkxMjVf/Ode%20to%20an%20African%20Violet.mp3"
        },
        {
            name: 'Tekken 2 OST: "Jun Kazama (Morning Field)" - Yoshie Arakawa',
            url: "https://od.lk/s/OTFfMjgxNDkxMjdf/Tekken%202%20-%20Jun%20Kazama%20Theme%20%28Morning%20Field%29.mp3"
        },
        {
            name: '"Escape from New York: Main Theme" - John Carpenter',
            url: "https://od.lk/s/OTFfMjgxNDkxNjlf/Escape%20From%20New%20York%20Theme.mp3"
        },
        {
            name: 'Streets of Rage 2 OST: "Slow Moon" - Yuzo Koshiro',
            url:"https://od.lk/s/OTFfMjgxNDkxNzBf/Streets%20Of%20Rage%202%20-%20Slow%20Moon.mp3"
        },
        {
            name: 'Metal Gear Solid 2 OST: "Plant Sneaking Theme" - Norihiko Hibino & Harry Gregson-Williams',
            url: "https://od.lk/s/OTFfMjgxNDkxNzFf/Metal%20Gear%20Solid%202%20Soundtrack%20-%20Plant%20Sneaking%20Theme.mp3"
        },
        {
            name: 'Tekken 3 OST: "Dr. Bosconovich" - Nobuyoshi Sano & Keiichi Okabe',
            url: "https://od.lk/s/OTFfMjgxNDkxNzJf/Tekken%203%20Arranged%20OST%20Dr.%20Boskonovitch.mp3"
        },
        {
            name: '"The Concept of Love" - Hideki Naganuma',
            url: 'https://od.lk/s/OTFfMjgxNDk1OThf/The%20Concept%20of%20Love.mp3'
        },{
            name: '"New Wave Hookers" - Vestron Vulture',
            url: 'https://od.lk/s/OTFfMjgxNDk1OTlf/Hotline%20Miami%202%20Wrong%20Number%20Soundtrack%20-%20New%20Wave%20Hookers.mp3'
        },{
            name: '"Rust" - El Huervo',
            url: 'https://od.lk/s/OTFfMjgxNDk2MDBf/Hotline%20Miami%202%20Wrong%20Number%20Soundtrack%20-%20Rust.mp3'
        },{
            name: '"Sexualizer" - Perturbator',
            url: 'https://od.lk/s/OTFfMjgxNDk2MDFf/Hotline%20Miami%202%20Wrong%20Number%20Soundtrack%20-%20Sexualizer.mp3'
        },
        {
            name: '"Damn Fine Coffee" - mtbrd',
            url: 'https://od.lk/s/OTFfMjgxNDk2NDRf/mtbrd%20-%20Damn%20Fine%20Coffee.mp3'
        }
    ]

    // default state is a random number between 0 and the index of Audiolibrary's last element
    const [selectedTrack, setSelectedTrack] = useState(0)
    const [audioMuted, setAudioMuted] = useState(true)
    const [toggleVisible, setToggleVisible] = useState("hideToggle")
    const [playerVisible, setPlayerVisible] = useState("radioVisible")
    const [audioCanPlay, setAudioCanPlay] = useState(false)
    const [volume, setVolume] = useState(5)
    const [tracksPlayed, setTracksPlayed] = useState([])
    const [playlist, setPlaylist] = useState([])

    const [initialSkip, setInitialSkip] = useState(false)

    useEffect(() => {
        shufflePlaylist()
    }, [])
      
    
    const randInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    

    const radioSounds = [RadioTrans2,RadioTrans3]

    const shufflePlaylist = () => {
        let tracks = []
        for (let i=0; i < audioLibrary.length-1; i++) {
            while (tracks.length !== audioLibrary.length) {
                let newTrack = randInt(0,audioLibrary.length-1)
                if (!tracks.includes(newTrack)) {
                    tracks.push(newTrack)
                }
            }
        };
        setPlaylist(tracks)
        setSelectedTrack(tracks[0])
        // setNewSelected(tracks[0])
        // console.log("Playlist:",tracks)
    }
    

    
    useEffect(()=>{

        console.log("Now playing:", audioLibrary[selectedTrack]["name"])

        

        if (!!initialSkip) {let audio = document.getElementById("daFunk")
    
        const changeStation = new Audio(TapeClick)

        changeStation.volume = 0.5;

        audio.pause();

        changeStation.play();

        const timeout = setTimeout(() => {audio.play();}, 1500);

        return () => clearTimeout(timeout);}

    },[selectedTrack])



    const handleMute = () => {
        let audio = document.getElementById("daFunk")
        audio.muted = !!audio.muted ? false : true
        setAudioMuted(audio.muted)
        if (!audio.muted) {
            audio.volume = volume / 10
        }
    }
    
    const handleSkip = () => {
        
        const indexOfSelected = playlist.indexOf(selectedTrack)
        
        const nextIndex = indexOfSelected+1
        
        if (indexOfSelected !== playlist.length - 1) {
            
            // let audio = document.getElementById("daFunk")
    
            // const changeStation = new Audio(TapeClick)

            // changeStation.volume = 0.5;
    
            // audio.pause();

            // changeStation.play();

            

            // changeStation.onended = function(){setSelectedTrack(playlist[nextIndex])}

            setInitialSkip(true)

            setSelectedTrack(playlist[nextIndex])
            // setNewSelected(0)

        } else {
            shufflePlaylist()
            console.log("Playlist shuffled!")
        }
        
    }

    const handleVolume = (e) => {
        let audio = document.getElementById("daFunk")
            if (e.target.className === "volUp") {
                if (volume < 10){
                    audio.volume = (volume +1) /10
                    setVolume(volume+1)
                    
                }
            } else if (e.target.className === "volDown") {

                if (volume > 0){
                    audio.volume = (volume -1) /10
                    setVolume(volume-1)
                }
                
            };

        
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
