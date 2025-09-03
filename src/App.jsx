import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header/Header.jsx';
import Home from './components/pages/Home/Home.jsx';
import TableForm from './components/pages/TableForm/TableForm.jsx';
import NotFound from './components/views/NotFound/NotFound.jsx';
import Footer from './components/views/Footer/Footer.jsx';

function App() {
  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/table/:tableId" element={<TableForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </>
  );
}

export default App;
