import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { addSharp, bookmarkSharp, exitSharp, homeSharp } from 'ionicons/icons';
import './Menu.css';
import { getCategories } from '../../shared/services/categories.service';
import { toSnakeCase } from '../../shared/utils/snake-case';
import { removeToken } from '../../shared/services/auth.service';
import { User } from '@shared/models';
import { useSelector } from "react-redux";
import { selectUser } from '../../shared/slices/user.slice';

interface MenuItem {
  name: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const createCategoryItem: MenuItem = {//only should appear for admins
  title: 'Crear Categoria',
  url: '/create-category',
  name: 'create-category',
  iosIcon: addSharp,
  mdIcon: addSharp
};

const createPostItem: MenuItem = {//only should appear for admin and creators
  title: 'Crear Post',
  url: '/create-post',
  name: 'create-post',
  iosIcon: addSharp,
  mdIcon: addSharp
}

const logoutItem: MenuItem = {
  title: 'Log Out',
  url: '#logout',
  name: 'log-out',
  iosIcon: exitSharp,
  mdIcon: exitSharp
}

const commonMenu: MenuItem[] = [
  {
    title: 'Home',
    url: '/home',
    name: 'home',
    iosIcon: homeSharp,
    mdIcon: homeSharp
  },
  /*{
    title: 'Categories',
    url: '/categories',
    iosIcon: bookmarkSharp,
    mdIcon: bookmarkSharp
  },*/
  //createCategoryItem,
  //createPostItem,
  
];

const Menu: React.FC = () => {
  //const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categoryMenuItems, setCategoryMenuItems] = useState<MenuItem[]>([]);
  const [createContentMenuItems, setCreateContentMenuItems] = useState<MenuItem[]>([]);
  const location = useLocation();
  const user= useSelector(selectUser);
  
  const fetchCategories = async ()=>{
    //const menuCloned = [...menuBase];
    const categories=await getCategories();
    
    setCategoryMenuItems(categories.map(
      category => ({
        title: 'Categoria '+category.name,
        url: '/categories/'+category._id,
        name: 'category',
        iosIcon: bookmarkSharp,
        mdIcon: bookmarkSharp
      })
    ))
    
  };

  const generateCreateContentMenuItems = (role:string)=>{
    const menu:MenuItem[]= [];
    if(role=='CREATOR' || role=='ADMIN'){
      menu.push(createPostItem);
    }

    if(role=='ADMIN'){
      menu.push(createCategoryItem);
    }
    
    setCreateContentMenuItems(menu);
  };

  const logOut =()=>{
    removeToken();
    window.location.href = '/login';
  }

  useEffect(()=>{
    fetchCategories();
  }, []);

  useEffect(()=>{
    generateCreateContentMenuItems(user.role_name);
  }, [user]);

  return (
    <IonMenu contentId="main" type="reveal">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader cy-name="sidenav-title">{user?.username + ' ('+user?.role_name+')' || 'Username'}</IonListHeader>
          <IonNote cy-name="sidenav-subtitle">{user?.email || 'mail'}</IonNote>
          {[...commonMenu,
            ...categoryMenuItems,
            ...createContentMenuItems,
            logoutItem].map((item, index) => {
            
            if(item.url=='#logout'){
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem cy-name="btn-logout" onClick={logOut} lines="none" detail={false}>
                    <IonIcon aria-hidden="true" slot="start" ios={item.iosIcon} md={item.mdIcon} />
                    <IonLabel>{item.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            }
            
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem cy-name={"menu-btn-"+item.name} className={location.pathname === item.url ? 'selected' : ''} routerLink={item.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={item.iosIcon} md={item.mdIcon} />
                  <IonLabel>{item.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          

          })}
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
