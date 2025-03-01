// prevzate z QVIKS

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


type FromSpreeProps = {
    type: 'beta' | 'contact' | 'subscribe-ms'
}

export default function FormsSpree({ type }: FromSpreeProps) {
    const [state, handleSubmit] = useForm("moqgwdlr");


    let note = '';
    let label = '';
    let thankyou = '';
    if (type === 'contact') {}
    else if (type === 'subscribe-ms') {
        note = 'Sign up to get notified when the full album is out.';
        label = 'Subscribe';
        thankyou = 'Thanks! Stay tuned for our response.';
    }
    else if (type === 'beta') {
        note = 'Enter your email. We will get back to you.';
        label = 'Apply';
        thankyou = 'Thanks! Stay tuned for our response.';
    }


    if (state.succeeded) {
        return <p className='bg-blue-300'>{thankyou}</p>;
    }


    const handleOnClick = async (event: React.FormEvent<HTMLFormElement>) => {
        // Stop the form from submitting for now
        event.preventDefault();

        // Set the message value programmatically
        const formData = new FormData(event.currentTarget);
        console.log(formData);
        formData.set('message', type);

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        handleSubmit(formData);
    };

    return (

        <>
            <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleOnClick} className="flex space-x-2 flex-wrap">
                    <Input className="max-w-lg flex-1 bg-white"
                        placeholder="Enter your email"
                        type="email"
                        id="email"
                        name="email"
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                    />
                    <Button type="submit" disabled={state.submitting}>{label}</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {note}
                    <Link href='/legal/privacy' className="underline underline-offset-2 ml-2">
                        Privacy Policy
                    </Link>
                </p>
            </div>

        </>
    );
}