import { FunctionComponent } from 'react';
import { imageNotFoundPlaceHolder } from '../assets';

type CardProps = {
    name?: string;
    avatar?: string;
    price: string;
};

const Card: FunctionComponent<CardProps> = ({ name, avatar, price }) => {
    return (
        <>
            <div className='p-6 border-4 border-gray-700 rounded-lg'>
                <img
                    className='object-cover object-center w-full mb-6 lg:h-48 md:h-52 rounded-xl'
                    src={avatar}
                    alt={name}
                    onError={(e) => (e.currentTarget.src = imageNotFoundPlaceHolder)}
                />
                <h1 className='mx-auto mb-4 text-xl font-semibold leading-none tracking-tighter text-neutral-600'>
                    {name}
                </h1>
                <p className='mx-auto text-base font-medium leading-relaxed text-gray-500'>${price}</p>
            </div>
        </>
    );
};

export default Card;
