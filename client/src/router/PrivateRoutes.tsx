import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticated, ...props }: any) => {
    return authenticated ? props.element : <Navigate to="/login" replace />;
}

export default PrivateRoute;