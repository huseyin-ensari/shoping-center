import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ProductDetail, AddProduct } from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/product/:id' element={<ProductDetail />} />
                <Route path='/add' element={<AddProduct />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
