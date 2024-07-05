import React, { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './Categories.css';
import { APP, ENDPOINTS } from '../../shared/config/environment';
import { getPosts, findPosts } from '../../shared/services/posts.service';
import { Category, Post } from '../../shared/models';
import PostCard from '../../components/PostCard';
import { getCategory, getPostsByCategoryId } from '../../shared/services/categories.service';

const CategoriesPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>();
    const [category, setCategory] = useState<Category>();
    const { categoryId } = useParams<{ categoryId: string; }>();
    const findCategory = async ()=>{
        const result= await getCategory(categoryId);
        setCategory(result);
    };

    const listPosts = async ()=>{
        const result= await getPostsByCategoryId(categoryId);
        setPosts(result);
    }


    useEffect(()=>{
        findCategory();
        listPosts();
    },[]);
    

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{category?.name || 'unknown'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{category?.name || 'unknown'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {
            category?.cover_image && (<img className='hero-image' src={ENDPOINTS.BASE_URL+'/'+category?.cover_image} alt={category?.name} />)
        }    

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

export default CategoriesPage;
