import { Button } from "../ui/button";

const AuthButton = () => {
    return (
        <div className="flex items-center space-x-3">
            <Button>Login</Button>
            <Button>SignUp</Button>
        </div>
    );
};

export default AuthButton;