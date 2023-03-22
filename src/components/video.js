import './video.css'
function Video({ title,id, channel='reactJs',views,time,verified }){
return (
    <>
    <div className='container'>
    <div className='pic'><img src={`https://picsum.photos/id/${id}/160/90` }alt="not loaded"></img></div>
    <div className='title'>{title}</div>
    {/* {verified ? <div className='channel'>{channel}✅</div> : <div className='channel'>{channel}</div>} */}
    <div className='channel'>{channel}{verified ?'✅':null}</div>
    {/* // <div className='channel'>{channel}✅</div> */}
    <div className='views'>{views}<span>.</span>{time}</div>
    </div>
    </> 
)
}
function Thumb(){

}
export {Video,Thumb}
//export default Video;