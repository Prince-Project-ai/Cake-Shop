import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isUserLoggedIn } from '../../Services/ClientApi/HandleUserApi';
import { setIsLoading, setIsLoggedIn, setUserData } from '../../Redux/features/client/userSlice';
// import { isUserLoggedIn } from '../../Services/ClientApi/HandleUserApi';
// import { setIsLoading, setIsLoggedIn, setUserData } from '../../Redux/features/client/userSlice';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthStatus = async () => {
            dispatch(setIsLoading(true));

            try {
                const response = await isUserLoggedIn();
                console.log("Auth success:", response?.data);

                if (response?.data?.data) {
                    dispatch(setUserData(response.data.data));
                    dispatch(setIsLoggedIn(true));
                    navigate('/'); // Or your dashboard route
                } else {
                    throw new Error("No user data received");
                }
            } catch (error) {
                console.error("Auth verification failed:", error);
                navigate('/sign-in'); // Redirect back to sign in on failure
            } finally {
                dispatch(setIsLoading(false));
            }
        };

        checkAuthStatus();
    }, [dispatch, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-pink-50">
            <div className="text-center p-8 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-heading font-bold text-pink-700 mb-4">Processing Your Login</h2>
                <p className="text-neutral-600 font-body mb-6">Please wait while we confirm your account...</p>

                {/* Add a simple loading animation */}
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
            </div>
        </div>
    );
};

export default AuthSuccess;