// ForgotPasswordModal.js
import { useSelector } from "react-redux";
import EmailVerify from "./EmailVerify";
import PinVerify from "./PinVerify";
import ResetPass from "./ResetPass";

const ForgotPasswordModal = () => {
    const { phase } = useSelector((state) => state.forgotPassword);

    const phaseComponents = {
        1: <EmailVerify />,
        2: <PinVerify />,
        3: <ResetPass />,
    };

    return <div className="space-y-4">{phaseComponents[phase] || null}</div>;
};

export default ForgotPasswordModal;
