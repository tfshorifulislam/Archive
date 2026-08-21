import React from "react";
import { MailCheck } from "lucide-react";

const EmailverifyMessage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <MailCheck className="h-8 w-8 text-blue-600" />
                </div>

                <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    Check your email
                </h1>

                <p className="mb-6 text-gray-600">
                    We have sent a verification link to your email address.
                    Please check your inbox and click the link to verify your
                    account.
                </p>

                <p className="text-sm text-gray-500">
                    Didn&apos;t receive the email? Check your spam or junk folder.
                </p>
            </div>
        </div>
    );
};

export default EmailverifyMessage;