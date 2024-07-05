import React from 'react';
import './PostCard.css';
import { CONTENT_TYPES, Post } from '../shared/models';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { ENDPOINTS } from '../shared/config/environment';
import { generateYoutubeUrlEmbed } from '../shared/utils/youtube-embed-url';
import YoutubeVideo from './YoutubeVideo';

interface ContainerProps {
  post: Post;
}

const PostCard: React.FC<ContainerProps> = ({ post }) => {
  //https://ionicframework.com/docs/img/demos/card-media.png
    return (
    <IonCard className='card-container'>
        {
            post.content_type==CONTENT_TYPES.YOUTUBE_VIDEO && 
            (<YoutubeVideo url={post.content}></YoutubeVideo>)
            //(<video src={generateYoutubeUrlEmbed(post.content)} controls={true}></video>)
        }
        {
            post.content_type==CONTENT_TYPES.IMAGE && 
            (<img src={ENDPOINTS.BASE_URL+'/'+post.content} />)
        }
      <IonCardHeader>
        <IonCardTitle>{post.title}</IonCardTitle>
        <IonCardSubtitle>(Créditos para {post.credits})</IonCardSubtitle>
      </IonCardHeader>
      {
            post.content_type==CONTENT_TYPES.TEXT && 
            (<IonCardContent>{post.content}</IonCardContent>)
      }
      
    </IonCard>
  );
};

export default PostCard;
