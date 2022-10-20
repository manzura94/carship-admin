import React from  'react'
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';


const LogOutBtn = () => {
    const navigate=useNavigate()
    const logOutHandler=()=>{
       navigate('/logout')
    }

  return (

        <Menu
          items={[
            {
              label: <a onClick={()=>logOutHandler()}>Log out</a>,
              key:"0"
            }
          ]}
        />
      );

}

export default LogOutBtn