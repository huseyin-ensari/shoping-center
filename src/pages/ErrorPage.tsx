import { Link } from 'react-router-dom';
import { ErrorHeadIcon } from '../assets';
import MainLayout from '../layouts/MainLayout';

const ErrorPage = () => {
    return (
        <MainLayout>
            <section className='flex items-center h-full sm:p-16 '>
                <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md'>
                    <ErrorHeadIcon />
                    <p className='text-3xl'>Looks like our services are currently offline</p>
                    <Link to={'/'} className='border-4 border-gray-800 px-8 py-3 font-semibold rounded'>
                        Back to homepage
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
};

export default ErrorPage;
