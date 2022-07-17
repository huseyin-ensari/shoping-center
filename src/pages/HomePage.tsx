import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from '../assets';
import { Card } from '../components';
import MainLayout from '../layouts/MainLayout';
import { getCategories } from '../services/categoryService';
import { getProducts } from '../services/productService';
import { Category } from '../types/categoryType';
import { Product } from '../types/productType';

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);

    const fetchAllProducts = () => {
        setLoading(true);
        getProducts()
            .then(({ data }) => {
                setProducts([...data]);
                setFilteredProducts([...data]);
            })
            .catch((err) => {
                setError(true);
            })
            .finally(() => setLoading(false));
    };

    const fetchAllCategories = () => {
        setLoading(true);
        getCategories()
            .then(({ data }) => {
                setCategories([...data]);
            })
            .catch((err) => {
                setError(true);
            })
            .finally(() => setLoading(false));
    };

    const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        const value = event.target.value;
        const tempProducts = products.filter((product) => (value !== 'all' ? product.category === value : product));
        setFilteredProducts([...tempProducts]);
    };

    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        const { value } = event.target;
        const tempProducts = products.filter((x) => x.name.toLowerCase().includes(value.toLowerCase()));
        console.log(tempProducts);
        setSearchedProducts([...tempProducts]);
        value.length === 0 && setSearchedProducts([]);
    };

    useEffect(() => {
        fetchAllProducts();
        fetchAllCategories();
    }, []);

    return (
        <MainLayout error={error} isLoading={loading}>
            <div className='flex justify-between mx-28 px-10 mt-14 items-center '>
                {/* search bar */}
                <section className='relative w-full max-w-md  rounded-md'>
                    <div className='relative border-gray-800 border-4 rounded-md'>
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                            <SearchIcon />
                        </span>

                        <input
                            type='text'
                            className='w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md  focus:border-blue-500 focus:outline-none focus:ring'
                            placeholder='Search'
                            onChange={search}
                        />
                    </div>

                    {searchedProducts.length > 0 && (
                        <div className='border-gray-800 border-4 rounded-md z-50 absolute inset-x-0 px-6 py-3 mx-5 mt-4 overflow-y-auto bg-white max-h-72 '>
                            {searchedProducts.map(({ id, name }) => (
                                <Link to={`/product/${id}`} key={id} className='block py-1'>
                                    <h3 className='font-medium text-gray-700  hover:underline'>{name}</h3>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
                {/* select  */}
                <div className='mb-3 xl:w-96 border-gray-800 border-4 rounded-md'>
                    <select
                        onChange={handleCategory}
                        className='form-select appearance-none
                        block
                        w-full
                        px-3
                        py-3
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white 
                        focus:border-blue-600 focus:outline-none'>
                        <option selected value='all'>
                            Chosee Category
                        </option>
                        {categories?.map((category) => (
                            <option key={category?.id} value={category?.name}>
                                {category?.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* grid system */}
            <section>
                {filteredProducts.length === 0 && (
                    <h2 className='text-sm title-font text-gray-500 tracking-widest uppercase text-center'>
                        this category is empty
                    </h2>
                )}
                <div className='relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl'>
                    <div className='grid w-full grid-cols-1 gap-12 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {/* cards */}
                        {filteredProducts?.map((product) => (
                            <Link to={`/product/${product.id}`} key={product?.id}>
                                <Card
                                    avatar={product?.avatar}
                                    name={product?.name}
                                    price={product.price}
                                    key={product?.id}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            {/* floating action button */}
            <Link to={'/add'}>
                <button
                    title='Add Product'
                    className='fixed z-90 bottom-10 right-8  w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-gray-800 border-4 border-gray-700 hover:text-white text-4xl hover:bg-gray-700 hover:drop-shadow-2xl hover:animate-bounce duration-300'>
                    <i className='fa-solid fa-plus'></i>
                </button>
            </Link>
        </MainLayout>
    );
};

export default HomePage;
