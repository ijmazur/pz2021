import React from 'react'
import Core from '../core/Core';
import { useEffect, useState } from 'react'
import authService from '../../services/auth.service';
import UserData from '../UserData';

export const Test = (props) => {
    return (
        <Core button={props.button} text={"Testowa Strona"} />
      )
}

export default Test;
