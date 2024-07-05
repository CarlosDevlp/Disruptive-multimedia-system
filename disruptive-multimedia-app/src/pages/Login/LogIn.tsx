import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import './LogIn.css';
import { APP } from '../../shared/config/environment';
import { logIn } from '../../shared/services/auth.service';
import { useForm } from 'react-hook-form';


const LoginPage: React.FC = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [presentAlert] = useIonAlert();


    const tryToLogIn= async (data:any)=>{
        console.log('LogIn-data to send: ', data);
        try{
            const response=await logIn(data.username, data.password);
            console.log('succes: ', response);
            window.location.href = '/home';
        }catch(error:any){
            console.log('error: ', error);
            presentAlert({
                header: 'Error',
                message: error?.response?.data?.message || 'Server Error',
                buttons: ['Ok']
            });
        }
    };
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Log In</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Log In</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={handleSubmit(tryToLogIn)}>
            <IonList>
                <IonItem>
                    <IonInput 
                        label="Username"
                        labelPlacement="floating" 
                        fill="solid"
                        placeholder="enter username" 
                        {...register('username', { required: true })}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput 
                        label="Password"
                        labelPlacement="floating" 
                        fill="solid"
                        type='password' 
                        placeholder="" 
                        {...register('password', { required: true })} 
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <p>*Nota: ingrese manualmente los datos en los campos</p>
                </IonItem>
                <IonItem  routerLink="/signup" routerDirection="none" lines="none" detail={false}>
                  <IonLabel className='btn-url-label'>Crear nueva cuenta</IonLabel>
                </IonItem>
                <IonItem>
                    <IonButton expand="block" type='submit'>LogIn</IonButton>
                </IonItem>
            </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;

