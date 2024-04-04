// add-user.js
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../app/page.module.css';

export default function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the mutation
        const mutation = `
            mutation AddUser($name: String!, $email: String!) {
                addUser(name: $name, email: $email) {
                    id
                    name
                    email
                }
            }
        `;

        // Send the mutation to the GraphQL API
        const res = await fetch('/api/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    name,
                    email,
                },
            }),
        });

        // Handle the response from the GraphQL API
        const json = await res.json();
        if (json.errors) {
            setMessage('Error: ' + json.errors.map((error) => error.message).join(', '));
        } else {
            setMessage('User added successfully!');
            setName('');
            setEmail('');
        }
    };

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className={styles.userList}>
                    <h1 className={styles.title}>Add New User</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.user}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="name" className={styles.label}>Name </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>Email </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <button type="submit" className={styles.button}>
                                    Submit
                                </button>
                            </div>
                        </div>
                        {message && <p className={styles.message}>{message}</p>}
                    </form>
                </div>
            </main>
            <style jsx>{`
              .form {
                display: flex;
                flex-direction: column;
                gap: 10px;
                align-items: center;
                justify-content: center;
              }
              .inputGroup {
                margin-bottom: 1rem;
                width: 100%; // Full width of the form
              }
              .input {
                width: 100%; // Full width of the inputGroup
                padding: 0.5rem;
                margin-top: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 4px;
              }
              .button {
                padding: 0.5rem;
                border: none;
                border-radius: 4px;
                background-color: #333;
                color: white;
                cursor: pointer;
                transition: background-color 0.3s;
                width: 100%; // Full width of the inputGroup
              }
              .button:hover {
                background-color: #555;
              }
              .message {
                text-align: center;
                color: #4BB543;
              }
              .main {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh; // Use full viewport height to center vertically
              }
            `}</style>
        </>
    );
}
