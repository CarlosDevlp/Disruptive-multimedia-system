import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import './SignUp.css';
import { APP } from '../../shared/config/environment';
import { getRoles, signUp } from '../../shared/services/auth.service';
import { Role, User } from '../../shared/models';
import { useForm } from 'react-hook-form';

const SignUpPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [roles, setRoles] = useState<Role[]>();
    const [presentAlert] = useIonAlert();

    const listRoles = async ()=>{
        const result= await getRoles();
        result.splice(0,1)
        setRoles(result);
    }


    const tryToSignUp= async (data:any)=>{
        const user:User = {
            _id:'',
            username: data.username?.trim(),
            email: data.email?.trim(),
            password: data.password?.trim(),
            role: data.role,
            role_name: '',
            token: ''
        };
        console.log('SignUp-data to send: ', user);
        try{
            const response=await signUp(user);
            console.log('succes: ', response);
            window.location.href = '/login';
        }catch(error:any){
            console.log('error: ', error);
            presentAlert({
                header: 'Error',
                message: error?.response?.data?.message || 'Server Error',
                buttons: ['Ok']
            });
        }
    };

    useEffect(()=>{
        listRoles();
    },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sign Up</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <form onSubmit={handleSubmit(tryToSignUp)}>
            <IonList>
                <IonItem>
                    <IonInput 
                        label="Username"
                        labelPlacement="floating" 
                        fill="solid"
                        placeholder=""
                        required={true} 
                        {...register('username', { required: true })} 
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput 
                        label="Correo"
                        labelPlacement="floating" 
                        fill="solid"
                        type='email'
                        placeholder=""
                        required={true}  
                        {...register('email', { required: true })}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonSelect 
                        label="Rol" 
                        placeholder="Seleccione Rol"
                        {...register('role', { required: true })}
                    >
                        {
                            roles && roles.map( rol => 
                                (<IonSelectOption key={rol._id} value={rol._id}>{rol.label}</IonSelectOption>)
                            )
                        }
                    </IonSelect>

                </IonItem>
                
                {/*errors.role && <IonItem><IonText color="warning"><span>*Por favor, seleccione un rol</span></IonText></IonItem>*/}

                <IonItem>
                    <IonInput 
                        label="Password"
                        labelPlacement="floating" 
                        fill="solid"
                        type='password'
                        placeholder=""
                        required={true}  
                        {...register('password', { required: true })} 
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonButton expand="block" type='submit'>Sign Up</IonButton>
                </IonItem>
            </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
