import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribe, unsubscribe, checkSubscription } from '../../data/reducers/emailSubscriptionSlice';
import { RootState } from '../../data/store/store';
import '../../App.css';
import './Form.css';

const POST_REQUEST = async (endpoint: string, data: string) => {
    const response = await fetch(`http://localhost:4000/${endpoint}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    });
    const json = await response.json();
    json.error ? alert(json.error) : alert(json.message);
    return json;
}

export default function Form() {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const isSubscribed: boolean = useSelector((state: RootState) => state.emailSubscription.isSubscribed);

    const handleSubmit = async (endpoint: string) => {
        const input = document.querySelector('input[type="email"]') as HTMLInputElement;
        if (!input  || input.value === '') return;
        const email = input.value;
        dispatch(checkSubscription(email));
        endpoint === 'subscribe' && !isSubscribed && dispatch(subscribe(email));
        endpoint === 'unsubscribe' && isSubscribed && dispatch(unsubscribe(email));
        const res = await POST_REQUEST(endpoint, email);
        res.message && (input.value = '');
    };

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        await handleSubmit('subscribe');
        setLoading(false);
    };

    const handleUnsubscribe = async () => {
        if (loading) return;
        setLoading(true);
        await handleSubmit('unsubscribe');
        setLoading(false);
    };

    return (
        <form className='mx-30 form' onSubmit={handleSubscribe}>
            <input className='mt-48 mb-0 email' type="email" placeholder="Email"/>
            <button className='mt-48 mb-0' type='submit' disabled={loading} style={{ opacity: loading ? 0.5 : 1 }}>Subscribe</button>
            <h6 className='mt-24 mb-96 unsubscribe' onClick={handleUnsubscribe} style={{ opacity: loading ? 0.5 : 1 }}>Fill the input and click here if you want to unsubscribe from our newsletter</h6>
            {/* {isSubscribed && <h2>TEST</h2>} */}
        </form>
    )
}
