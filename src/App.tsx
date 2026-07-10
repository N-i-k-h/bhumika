import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Capabilities } from './pages/Capabilities';
import { Products } from './pages/Products';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Customers } from './pages/Customers';
import { Certificates } from './pages/Certificates';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="process" element={<Capabilities />} />
          <Route path="products" element={<Products />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="customers" element={<Customers />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
