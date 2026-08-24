import Link from "next/link";
import { Button } from "../ui/button";

const AuthButton = () => {
    return (
        <div className="flex items-center space-x-3">
            <Link href='/auth/login'>
                <Button variant='outline'>Login</Button>
            </Link>
            <Link href='/auth/signup'>
                <Button>SignUp</Button>
            </Link>
        </div>
    );
};

export default AuthButton;