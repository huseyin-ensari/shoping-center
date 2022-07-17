import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { imageNotFoundPlaceHolder, LikeIcon, SocialMediaIcons, StarIcon } from '../assets';
import MainLayout from '../layouts/MainLayout';
import { getProductById } from '../services/productService';
import { Product } from '../types/productType';

const ProductDetail = () => {
    const params = useParams();
    const { id: productId } = params;
    const [product, setProduct] = useState<Product>();
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const fetchProductById = () => {
        productId &&
            getProductById(productId)
                .then(({ data }) => {
                    setProduct(data);
                    console.log(data);
                })
                .catch((err) => navigate('/'));
    };

    useEffect(() => {
        fetchProductById();
    }, []);

    return (
        <MainLayout>
            <section className='text-gray-600 body-font overflow-hidden '>
                <div className='container px-5 py-24 mx-auto'>
                    <div className='lg:w-4/5 mx-auto flex flex-wrap '>
                        <img
                            alt='ecommerce'
                            className='lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center border-4 rounded-xl'
                            src={product?.avatar}
                            onError={(e) => (e.currentTarget.src = imageNotFoundPlaceHolder)}
                        />

                        <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
                            <h2 className='text-sm title-font text-gray-500 tracking-widest uppercase '>
                                {product?.category}
                            </h2>
                            <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>{product?.name}</h1>
                            <div className='flex mb-4'>
                                <span className='flex items-center'>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon isEmpty />

                                    <span className='text-gray-600 ml-3'>4 Reviews</span>
                                </span>
                                <SocialMediaIcons />
                            </div>
                            <p className='leading-relaxed'>{product?.description}</p>
                            <div className='flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5'>
                                <div className='flex'>
                                    <span className='mr-3'>Color</span>
                                    <button className='border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none'></button>
                                    <button className='border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none'></button>
                                    <button className='border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none'></button>
                                </div>
                            </div>
                            <div className='flex'>
                                <span className='title-font font-medium text-2xl text-gray-900'>${product?.price}</span>
                                <button className='flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'>
                                    Button
                                </button>
                                <button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                                    <LikeIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default ProductDetail;
