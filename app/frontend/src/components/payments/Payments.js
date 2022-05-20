import React from 'react'
import Core from '../core/Core';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export const Payments = (props) => {
    return (
      <>
        <Core button={props.button} text={"Koszyk"} />
      
      <TextareaAutosize
      maxRows={4}
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      defaultValue="<h1>Fajnie wyglada:</h1>
      https://github.com/angeloron/react-material-ui-stripe-payment-form
      
      W repo ladne demo jest

      Tutaj to samo repo, ale w tutoriale:
      https://medium.com/swlh/stripe-payment-form-with-reactjs-and-material-ui-part-2-136e8e0ceefd

      Tutaj tego sandbox:
      https://codesandbox.io/s/b4b44
      
      
      ============================================================
      
      Live demo:
      https://payload-code.github.io/material-ui-add-payment-details.html

      Repo:
      https://github.com/payload-code/payload-code.github.io/blob/master/material-ui-add-payment-details.html

      ============================================================

      Troche gorzej wygladajace:
      https://github.com/ritik2727/Payment_integration      
      
      Wyglada tak:
      https://www.youtube.com/watch?v=HFrD2p6n3a4

      ============================================================

      Najgorzej wygladajace:
      https://bestofreactjs.com/repo/lorensr-react-payment

      ============================================================"
      style={{ width: 200 }}
    />
    </>
      )
}

export default Payments;
