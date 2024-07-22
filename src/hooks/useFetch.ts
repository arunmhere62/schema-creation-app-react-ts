// src/hooks/usePostData.ts
import { useState } from 'react';

export const usePostData = <T>() => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const postData = async (url: string, data: T): Promise<any> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setLoading(false);
            return await response.json();
        } catch (error) {
            setLoading(false);
            console.error('Error posting data:', error);
            throw error;
        }
    };

    return { postData, loading, error };
};
