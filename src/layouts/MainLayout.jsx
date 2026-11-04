import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';


const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Container>
          <Outlet></Outlet>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;