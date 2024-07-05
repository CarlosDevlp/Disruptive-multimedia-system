import FileField from '../../components/FileField';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { CONTENT_TYPES, Category, Post, User } from '../../shared/models';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCategories } from '../../shared/services/categories.service';
import { useSelector } from 'react-redux';
import { selectUser, selectUserId } from '../../shared/slices/user.slice';
import { createPost, uploadPostFile } from '../../shared/services/posts.service';

const CreateEditPost: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [presentAlert] = useIonAlert();
    const [ categories, setCategories ] = useState<Category[]>([]);
    const [ selectedCategory, setSelectedCategory ] = useState<Category>();
    const [ selectedContentType, setSelectedContentType ] = useState<string>('');
    const [contentTypes, setContentTypes] = useState<string[]>();
    const [selectedFileFormData, setSelectedFileFormData] = useState<FormData>(new FormData());
    const user = useSelector(selectUser);

    const listCategories = async ()=>{
        const result = await getCategories();
        setCategories(result);
    };

    const listContentTypes = (category?:Category)=>{
        //const result= await getContentTypes();
        if(category){
            const types = [];
            if(category.allows_youtube_videos){
                types.push(CONTENT_TYPES.YOUTUBE_VIDEO);
            }

            if(category.allows_documents){
                types.push(CONTENT_TYPES.TEXT);
            }

            if(category.allows_images){
                types.push(CONTENT_TYPES.IMAGE);
            }
            
            return setContentTypes(types);
        }
        setContentTypes(Object.values(CONTENT_TYPES));
    };

    const findCategory = (categoryId: string)=>{
        console.log('Category Id:', categoryId);
        const category=categories.find( category => category._id==categoryId);
        setSelectedCategory(category);
        setSelectedContentType('');
        listContentTypes(category);
    }

    const tryToSavePost = async (data:any)=>{
        console.log('Post data: ',data);
        const post: Post={
            _id: '',
            title: data.title,
            category: data.category,
            user: user?._id,
            content: data?.content || '',
            content_type: data?.contentType || CONTENT_TYPES.TEXT,
            credits: user?.username,
        };

        try{
            console.log('Real Post : ',post);
            const response=await createPost(post);
            let uploadResponse;
            if(data?.contentType==CONTENT_TYPES.IMAGE){
                uploadResponse=await uploadPostFile(response._id, selectedFileFormData);
            }
            console.log('succes: ', response, uploadResponse);
            presentAlert({
                header: 'Exito',
                message: 'Post creado con exito!',
                buttons: ['Ok'],
                onWillDismiss: () => window.location.href = '/home'
            });
        }catch(error:any){
            console.log('error: ', error);
            presentAlert({
                header: 'Error',
                message: error?.response?.data?.message || error?.message || 'Server Error',
                buttons: ['Ok']
            });
        }
    };

    useEffect(()=>{
        listCategories();
        listContentTypes();
    }, []);

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Crear Post</IonTitle>
            </IonToolbar>
          </IonHeader>
    
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Crear Post</IonTitle>
              </IonToolbar>
            </IonHeader>
            
            <form onSubmit={handleSubmit(tryToSavePost)}>
                <IonList>
                    <IonItem>
                        <IonInput 
                            label="Titulo"
                            labelPlacement="floating" 
                            fill="solid"
                            placeholder=""
                            required={true} 
                            {...register('title', { required: true })} 
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonSelect 
                            label="Categoria" 
                            placeholder="Seleccione la categoria"
                            onIonChange={(ev)=>findCategory(ev.target.value+'')}
                            {...register('category', { required: true })}
                        >
                            {
                                categories && categories.map( category => 
                                    (<IonSelectOption key={category._id} value={category._id}>{category.name}</IonSelectOption>)
                                )
                            }
                        </IonSelect>
                    </IonItem>
                    <IonItem 
                        className={selectedCategory? '':'ion-hide'}>
                        <IonSelect 
                            label="Tipos de contenido" 
                            placeholder="Seleccione los tipos"
                            onIonChange={(ev)=>setSelectedContentType(ev.target.value+'')}
                            {...register('contentType', { required: true })}
                        >
                            {
                                contentTypes && contentTypes.map( item => 
                                    (<IonSelectOption key={item} value={item}>{item}</IonSelectOption>)
                                )
                            }
                        </IonSelect>
                    </IonItem>
                    <IonItem className={selectedCategory && selectedContentType && selectedContentType!=CONTENT_TYPES.IMAGE? '':'ion-hide'}>
                        <IonInput 
                            label={selectedContentType==CONTENT_TYPES.YOUTUBE_VIDEO? "Youtube video url": "Texto"}
                            labelPlacement="floating" 
                            fill="solid"
                            placeholder=""
                            required={selectedContentType!=CONTENT_TYPES.IMAGE} 
                            {...register('content')} 
                        ></IonInput>
                    </IonItem>
                    {/*this will change according to selected content type*/}
                    <IonItem className={selectedCategory && selectedContentType==CONTENT_TYPES.IMAGE? '':'ion-hide'}>
                        <FileField 
                            label="Archivo adjunto:"
                            contentType="image/*"
                            required={selectedContentType==CONTENT_TYPES.IMAGE}
                            onFileChosen={setSelectedFileFormData}
                        />
                    </IonItem>
                    <IonItem>
                        <IonButton expand="block" type='submit'>Guardar</IonButton>
                    </IonItem>
                </IonList>
            </form>
          </IonContent>
        </IonPage>
      );
};

export default CreateEditPost;