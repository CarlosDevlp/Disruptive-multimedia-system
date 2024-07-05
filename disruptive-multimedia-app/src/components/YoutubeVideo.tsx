import React from 'react';
import './YoutubeVideo.css';
import { generateYoutubeUrlEmbed } from '../shared/utils/youtube-embed-url';

interface Props {
  url: string;
}

const YoutubeVideo: React.FC<Props> = ({ url }) => {
    return (
    <iframe width="560" height="315" 
        src={generateYoutubeUrlEmbed(url)} 
        title="YouTube video player" 
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
  );
};

export default YoutubeVideo;

