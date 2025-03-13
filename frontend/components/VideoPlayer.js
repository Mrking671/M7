import ReactPlayer from 'react-player';

export default function VideoPlayer({ url }) {
  return (
    <ReactPlayer
      url={url}
      controls
      width="100%"
      height="100%"
      config={{
        file: {
          attributes: {
            crossOrigin: 'anonymous'
          }
        }
      }}
    />
  );
}
