import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { getCategories } from '../services/categoryService';
import { Category } from '../types/categoryType';
import toast, { Toaster } from 'react-hot-toast';
import { addProduct } from '../services/productService';
import { Product } from '../types/productType';

const AddProduct = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [formValues, setFormValues] = useState<Product>({
        name: '',
        price: '',
        category: '',
        description: '',
        avatar: '',
        developerEmail: '',
    });
    const navigate = useNavigate();

    const fetchCategories = () => {
        getCategories()
            .then(({ data }) => setCategories([...data]))
            .catch(() => navigate('/'));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues);

        // validation
        const hasEmptyFields = Object.values(formValues).some((element) => element === '');
        if (hasEmptyFields) {
            return toast.error('Make sure you fill in all fields.');
        }

        addProduct(formValues)
            .then(() => {
                toast.success('Product added');
                navigate('/');
            })
            .catch(() => toast.error('Something went wrong'));
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <MainLayout>
            <div className='max-w-screen-xl px-4 py-5 mx-auto sm:px-6 lg:px-8'>
                <div className='max-w-lg mx-auto text-center'>
                    <h1 className='text-2xl font-bold sm:text-3xl'>Add Product</h1>

                    <p className='mt-4 text-gray-500'>Make sure you fill in all fields.</p>
                </div>

                <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-8 mb-0 space-y-4'>
                    <div className='shadow-md rounded-lg'>
                        <label htmlFor='name' className='font-bold'>
                            Product Name
                        </label>
                        <div className='relative'>
                            <input
                                type='text'
                                className='w-full p-4 pr-12 text-sm border-gray-300 rounded-lg'
                                placeholder='Product Name'
                                name='name'
                                id='name'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='shadow-md rounded-lg'>
                        <label htmlFor='avatar' className='font-bold'>
                            Image Url
                        </label>
                        <div className='relative'>
                            <input
                                type='text'
                                name='avatar'
                                id='avatar'
                                className='w-full p-4 pr-12 text-sm border-gray-300 rounded-lg'
                                placeholder='Image Url'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='shadow-md rounded-lg'>
                        <label htmlFor='description' className='font-bold'>
                            Description
                        </label>
                        <div className='relative'>
                            <textarea
                                className='w-full p-4 pr-12 text-sm border-gray-300 rounded-lg'
                                placeholder='Description'
                                id='description'
                                name='description'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='shadow-md rounded-lg'>
                        <label htmlFor='developerEmail' className='font-bold'>
                            Email
                        </label>
                        <div className='relative'>
                            <input
                                type='email'
                                id='developerEmail'
                                name='developerEmail'
                                className='w-full p-4 pr-12 text-sm border-gray-300 rounded-lg'
                                placeholder='email'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='shadow-md rounded-lg'>
                        <label htmlFor='price' className='font-bold'>
                            Price
                        </label>
                        <div className='relative'>
                            <input
                                type='text'
                                id='price'
                                name='price'
                                className='w-full p-4 pr-12 text-sm border-gray-300 rounded-lg'
                                placeholder='price'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='w-full space-y-0.5 shadow-md rounded-lg'>
                        <label htmlFor='category' className='font-bold'>
                            Choose Category
                        </label>
                        <div className='relative'>
                            <select
                                id='category'
                                defaultValue=''
                                name='category'
                                onChange={handleInputChange}
                                className='w-full p-4 pr-12 text-sm border-gray-300 rounded-lg'>
                                <option selected>Select Category</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <button
                            type='submit'
                            className='w-full inline-block px-5 py-3 text-sm font-medium hover:bg-white hover:border hover:border-gray-800 hover:text-gray-800 text-white bg-gray-800 rounded-lg'>
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </MainLayout>
    );
};

export default AddProduct;
