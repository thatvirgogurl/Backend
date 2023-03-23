
import './App.css'
import videoDB from "./data/data";
import AddVideo from "./components/addVideo";
 import { useState,useReducer } from "react";
import VideoList from "./components/videoList";


function App() {
  const [editableVideo, setEditableVideo] = useState(null)

console.log('render app')
function videoReducer(videos,action){
  switch(action.type){
    case 'ADD':
      return [...videos, { ...action.payload, id: videos.length + 1 }]
    case 'DELETE':
      return videos.filter(video => video.id !== action.payload)
    case 'UPDATE':
      const index = videos.findIndex(v => v.id === action.payload.id)
      const newVideo = [...videos]
      newVideo.splice(index, 1, action.payload)
      setEditableVideo(null)
      return newVideo
    default :
    return videos
  }

}
  const [videos,dispatch]=useReducer(videoReducer,videoDB)

// const [videos,setVideo]=useState(videoDB) //lifting stateUp
 // const [editableVideo, setEditableVideo ]=useState(null)


// function addVideo(video,editableVideo){
//   dispatch({type:'ADD',payload:video})
//   //action=>is a simple object is tell {type:'ADD',payload:video}
//   // setVideo([...videos,{ ...video, id: videos.length + 1}])
// }
// function deleteVideo(id){
//   dispatch({ type: 'DELETE', payload: id })
// console.log(id)
// //videos.filter(video=>videos.id!==id)
// //  setVideo(videos.filter(video => video.id !== id))
// }
function editVideo(id){
  //console.log( videos.find(video => video.id=== id))
//console.log(id)
  setEditableVideo(videos.find(video => video.id === id))
}
// function updateVideo(video){
//   //   const index=videos.findIndex(v => v.id ===video.id)
//   //  const newVideo=[ ...videos]
//   //   newVideo.splice(index,1,video)
//   dispatch({ type: 'UPDATE', payload: video })
//     // setVideo(newVideo)
// //console.log(video,newVideo)
//   }


  return (
    <div className='App' onClick={()=>{console.log('app')}}>
      <div>
        {/* //<AddVideo addVideos={addVideo} editableVideo={editableVideo} updateVideo={updateVideo}></AddVideo> */}
        <AddVideo dispatch={dispatch} editableVideo={editableVideo} ></AddVideo>
        {/* <VideoList deleteVideo={deleteVideo} videos={videos} editVideo={editVideo}></VideoList> */}
        <VideoList dispatch={dispatch}videos={videos} editVideo={editVideo}></VideoList>
      </div>
    </div> 
  )
}
export default App;
