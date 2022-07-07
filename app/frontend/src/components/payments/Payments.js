import React from 'react'
import Core from '../core/Core';

import { StateProvider } from './StateContext';
import { ThemeProvider } from '@material-ui/styles';



import Main from "./Views/Main"



export const Payments = (props) => {
    return (
      <>
        <Core button={props.button} text={"Koszyk"} />
      

    <StateProvider>
      <div style={{ flexGrow: 1 }}>
        <Main />

      </div>
    </StateProvider>

    </>
      )
}

export default Payments;
