import { Video } from "./video";
import PlayButton from "./playButton";
function VideoList({ videos , dispatch , editVideo }){
    return (
        <>
        {
            videos.map(video =>
                <Video
                    key={video.id}
                    title={video.title}
                    views={video.views}
                    time={video.time}
                    channel={video.channel}
                    verified={video.verified}
                    id={video.id}
                    //deleteVideo={deleteVideo}
                    dispatch={dispatch}
                    editVideo={editVideo}
                >
                    <PlayButton onPlay={() => console.log('playing', video.title)} onPause={() => console.log('paused', video.title)}>{video.title}</PlayButton> {/* childrenProps */}
                </Video>
            )
        }
        </>
    )
}

export default VideoList