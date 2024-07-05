import React from 'react';
import './ExploreContainer.css';
import { Post } from '../shared/models';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

interface ContainerProps {
  post: Post;
}

const PostCard: React.FC<ContainerProps> = ({ post }) => {
  return (
    <IonCard>
      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      <IonCardHeader>
        <IonCardTitle>{post.title}</IonCardTitle>
        <IonCardSubtitle>Créditos para {post.credits}</IonCardSubtitle>
      </IonCardHeader>
      {/*if content text*/}
      <IonCardContent>Content Text</IonCardContent>
    </IonCard>
  );
};

export default PostCard;
