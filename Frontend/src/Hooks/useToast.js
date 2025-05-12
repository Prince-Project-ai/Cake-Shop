import { useDispatch } from 'react-redux';
import { showToast } from '../Redux/features/client/toast/toastSlice';

const useToast = () => {
    const dispatch = useDispatch();

    const showToastMessage = (message, type) => {
        dispatch(showToast({ message, type }));
    };

    return {
        showToast: showToastMessage,
        // showSuccess: (message) => showToastMessage(message, 'success'),
        // showError: (message) => showToastMessage(message, 'error')
    };
};

export default useToast;