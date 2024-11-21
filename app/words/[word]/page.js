'use client';

import { useEffect, useState } from 'react';

export default function WordPage({ params }) {
    const { word } = params;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWordData = async () => {
            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                if (!response.ok) {
                    throw new Error('Word not found');
                }
                const json = await response.json();
                setData(json[0]); // Access the first entry
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWordData();
    }, [word]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>{data.word}</h1>
            {data.phonetics && data.phonetics[0]?.text && (
                <p>
                    <strong>Phonetic:</strong> {data.phonetics[0].text}
                </p>
            )}
            {data.phonetics && data.phonetics[0]?.audio && (
                <audio controls>
                    <source src={data.phonetics[0].audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
            <div>
                <h2>Definitions</h2>
                <ul>
                    {data.meanings.map((meaning, index) => (
                        <li key={index}>
                            <strong>{meaning.partOfSpeech}:</strong> {meaning.definitions[0]?.definition}
                            {meaning.definitions[0]?.example && (
                                <p style={{ marginLeft: '1em', fontStyle: 'italic' }}>
                                    Example: {meaning.definitions[0].example}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
