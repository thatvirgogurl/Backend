import './addVideo.css'
import {useEffect, useState } from 'react';

const initialState = {
    time: '1 yr ago',
    channel: 'coder dost',
    verified: true,
    title: '',
    views: ''
}
function AddVideo({ dispatch,editableVideo }){
    const [video, setVideo] = useState(initialState)

    function handeleSubmit(e){
        e.preventDefault();
        if(editableVideo){
            dispatch({ type: 'UPDATE', payload: video })
        }else{
            dispatch({type:'ADD',payload:video})
            //addVideos(video)
        }
      //console.log(video) 
        setVideo(initialState)
    }

    function handeleChange(e){
        console.log(e.target.value,e.target.name)
        setVideo({...video ,
           [ e.target.name]:e.target.value
    })
//console.log(video)
    }
    useEffect(()=>{
        if (editableVideo){setVideo(editableVideo)}
    }, [editableVideo])

    return (
        <form>
            <input type='text' placeholder='title' name='title' onChange={handeleChange} value={video.title}></input>
            <input type='text' placeholder='views' name='views' onChange={handeleChange} value={video.views}></input>
            <button onClick= { handeleSubmit}>{editableVideo?'EditVideo':'AddVideo'}</button>
        </form>
    )
}
export default AddVideo