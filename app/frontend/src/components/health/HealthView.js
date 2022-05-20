import Footer from '../Footer';
import Core from '../core/Core';
import Grid from '@mui/material/Grid';

export const HealthView = (props) => {
  const style = {
    fontSize: '42px',
    fontName: '',
    color: 'green',
    margin: '2rem'
  };

  return (
    <>
      <Core button={props.button} text={"TAJNY HEALTH CHECK YO 👊🏾"} />
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
        <div style={style}>
          <p>I am healthy! Yo 👊🏿</p>
          <Footer />
        </div>
      </Grid>
    </>
  )
}

export default HealthView