import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserData.css';

export const UserData = ({ userData }) => {
    const navigate = useNavigate();
    const goToLogin = (goToPage) => {
        navigate('/', { state: { data: goToPage } });
    } 

    return (
        ( userData ? <div className='user-data'>
            <div className='user-name'>
                <div>Hello, <span className='font-bold'>{userData.first_name + ' ' + userData.last_name}!</span></div>
                <div>Logged in as user <span className='font-bold'>{userData.username}</span></div>
            </div>
            <button type='button' className='btn btn-primary' onClick={() => goToLogin('')}>Log out</button>
        </div> : '')
    )
}

export default UserData;