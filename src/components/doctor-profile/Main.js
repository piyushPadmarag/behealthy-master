import {Layout } from 'antd';
import React, { useState } from 'react';
import Multiform from './Multiform';
import './doctor.css';
import Image from './Image';
const {  Content, Footer } = Layout;

function Main(props) {
  const[userPhoto,setProfilePic]=useState();
  return (
    <>
  

    <h2 className='display-5 text-center text-uppercase pt-3'>Profile Creation</h2>
       
      
          <div className='container mt-5' >
        
          <Image  setProfilePic={setProfilePic}/>
          </div>
      
        <Content
            className="site-layout-content"
            style={{
              margin: '50px 20px',
              padding: '24px 16px',
              minheight: 680,
              //backgroundImage: "linear-gradient(#D3CCE3,#E9E4F0)"
            }}
        >
       
        <Multiform userPhoto={userPhoto}/>
      
           
       
        </Content>
     
      
      </>
  );
}

export default Main;








