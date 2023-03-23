import './playButton.css'
import { useState } from 'react'
function PlayButton({  children, onPlay, onPause }) {
    console.log('play button')
    let [playing,setPlaying] = useState(false)  //false; dont use this approach
    function handleClick(e) {
       // console.log(e)
        e.stopPropagation()
        if (playing) {
            onPause()
        } else { 
            onPlay();
        }
        setPlaying(!playing);
    }
    return (
        <button onClick={handleClick}>{children}:{playing ? '⏸️' : '▶️'}</button> //react update only these variabe which are only state variable
    ) 
}
export default PlayButton;