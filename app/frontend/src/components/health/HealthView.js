import Footer from '../Footer';

export const HealthView = () => {
  const style = {
    color: 'green',
    margin: '2rem'
  };

  return (
      <div style={style}>
          <p>I am healthy!</p>
          <Footer />
      </div>
  )
}

export default HealthView