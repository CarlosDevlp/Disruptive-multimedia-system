import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import './CreateCategory.css';
import { APP } from '../../shared/config/environment';
import { getRoles, signUp } from '../../shared/services/auth.service';
import { CONTENT_TYPES, Category} from '../../shared/models';
import { useForm } from 'react-hook-form';
import { getContentTypes } from '../../shared/services/posts.service';
import { createCategory, uploadCategoryFile } from '../../shared/services/categories.service';
import FileField from '../../components/FileField';

const CreateEditCategoryPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [contentTypes, setContentTypes] = useState<string[]>();
    const [presentAlert] = useIonAlert();
    const [selectedFileFormData, setSelectedFileFormData] = useState<FormData>(new FormData());

    const listContentTypes = ()=>{
        //const result= await getContentTypes();
        setContentTypes(Object.values(CONTENT_TYPES));
    }

    const tryToSaveCategory = async (data:any)=>{
        console.log('Category data: ',data);
        const category:Category={
            _id: '',
            name: data.name,
            cover_image: 'placeholder',
            allows_images: false,
            allows_youtube_videos: false,
            allows_documents: false
        };

        data.contentTypes.forEach((contentType:string)=>{
            switch(contentType){
                case CONTENT_TYPES.IMAGE:
                    category.allows_images=true;    
                break;
                case CONTENT_TYPES.YOUTUBE_VIDEO:
                    category.allows_youtube_videos=true;    
                break;
                case CONTENT_TYPES.TEXT:
                    category.allows_documents=true;    
                break;
            }
        })

        try{
            console.log('Real Category : ',category);
            const response=await createCategory(category);
            const uploadResponse=await uploadCategoryFile(response._id, selectedFileFormData);
            console.log('succes: ', response, uploadResponse);
            presentAlert({
                header: 'Exito',
                message: 'Categoria creada con exito!',
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
    }
  

    useEffect(()=>{
        listContentTypes();
    },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Crear Categoria</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Crear Categoria</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <form onSubmit={handleSubmit(tryToSaveCategory)}>
            <IonList>
                <IonItem>
                    <IonInput 
                        label="Name"
                        labelPlacement="floating" 
                        fill="solid"
                        placeholder=""
                        required={true} 
                        {...register('name', { required: true })} 
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonSelect 
                        label="Tipos de contenido" 
                        multiple={true}
                        placeholder="Seleccione los tipos"
                        {...register('contentTypes', { required: true })}
                    >
                        {
                            contentTypes && contentTypes.map( item => 
                                (<IonSelectOption key={item} value={item}>{item}</IonSelectOption>)
                            )
                        }
                    </IonSelect>

                </IonItem>
                
                {/*this will change according to selected content type*/}
                <IonItem>
                    <FileField 
                        label="Imagen de portada:"
                        contentType="image/*"
                        required={true}
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

export default CreateEditCategoryPage;
