import React, { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { APP } from '../../shared/config/environment';
import { getPosts, findPosts } from '../../shared/services/posts.service';
import { Post } from '../../shared/models';
import PostCard from '../../components/PostCard';

const HomePage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>();
    const listPosts = async ()=>{
        const result= await getPosts();
        setPosts(result);
    }

    const searchForPosts = async (search='')=>{
        if(search.trim()){
            const result= await findPosts(search);
            setPosts(result);
        }else{
            listPosts();
        }
    }

    useEffect(()=>{
        listPosts();
    },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{APP.NAME}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{APP.NAME}</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonInput fill="outline" 
                placeholder="Buscar post..." 
                debounce={500} 
                onIonInput={(event)=>searchForPosts(event?.target?.value+'')}></IonInput>


        <IonList>

            {
                posts && posts.map( post => 
                    ( <IonItem key={post._id}>
                        <PostCard  post={post} ></PostCard>
                        </IonItem>)
                )
            }
        
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
