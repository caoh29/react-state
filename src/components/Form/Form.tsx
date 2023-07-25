import { useState } from 'react';

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

const handleSubmit = async (endpoint: string) => {
    const input = document.querySelector('input[type="email"]') as HTMLInputElement;
    if (input) {
        const email = input.value;
        const res = await POST_REQUEST(endpoint, email);
        res.message && (input.value = '');
    }
};

export default function Form() {

    const [loading, setLoading] = useState(false);

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
        <form onSubmit={handleSubscribe}>
            <input type="email" placeholder="Email"/>
            <button type='submit' disabled={loading} style={{ opacity: loading ? 0.5 : 1 }}>subscribe</button>
            <h6 onClick={handleUnsubscribe} style={{ opacity: loading ? 0.5 : 1 }}>Fill the input and click here if you want to unsubscribe from our newsletter</h6>
        </form>
    )
}
