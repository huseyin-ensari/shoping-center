import { FunctionComponent } from 'react';
import { Navbar, Error, Loading } from '../components';

type MainLayoutProps = {
    isLoading?: boolean;
    error?: boolean;
    children?: JSX.Element[] | JSX.Element;
};

const MainLayout: FunctionComponent<MainLayoutProps> = ({ isLoading, children, error }) => {
    return (
        <>
            <Navbar />
            {error && <Error />}
            {isLoading ? <Loading /> : children}
        </>
    );
};

export default MainLayout;
