import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ProductDetail, AddProduct, ErrorPage } from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/product/:id' element={<ProductDetail />} />
                <Route path='/add' element={<AddProduct />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
