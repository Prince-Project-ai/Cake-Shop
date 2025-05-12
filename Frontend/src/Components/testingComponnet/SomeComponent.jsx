import React, { useCallback } from "react";
import useToast from "../../Hooks/useToast";


function SomeComponent() {
    const { showToast, showSuccess, showError } = useToast();

    const handleAction = useCallback(() => {
        // Using generic showToast
        showToast('This is a message', 'error');

        // // Using convenience methods
        // showSuccess('Success message!');

        // // Non-string messages will be automatically stringified
        // showError({ code: 404, message: 'Not found' });
    }, [showToast, showSuccess, showError]);


    return (
        <button onClick={handleAction}>Show Toast</button>
    );
}


export default SomeComponent