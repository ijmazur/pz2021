import React from 'react'
import { useEffect, useState } from 'react'
import authService from '../../services/auth.service';
import UserData from '../UserData';
import Footer from '../Footer';

export const RestaurantView = () => {
    const [userData, setUserData] = useState();

    useEffect(() => {
        authService.getCurrentUser().then(
            (data) => {
                setUserData(data);
            }
        )
    }, [])

    return (
        <div>
            <div className="header">
                <h1>Restaurants's Home Page</h1>
                <UserData userData={userData}/>
                <Footer />
            </div>
        </div>
    )
}

export default RestaurantView;