// pages/update-user.js
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../app/page.module.css';

export default function UpdateUser() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the mutation
        const mutation = `
            mutation UpdateUser($id: ID!, $name: String!, $email: String!) {
                updateUser(id: $id, name: $name, email: $email) {
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
                    id,
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
            setMessage('User updated successfully!');
            // Optionally reset the form fields
            setId('');
            setName('');
            setEmail('');
        }
    };

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className={styles.userList}>
                    <h1 className={styles.title}>Update User</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.user}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="id" className={styles.label}>ID </label>
                                <input
                                    id="id"
                                    type="text"
                                    placeholder="User ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
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
                                    Update
                                </button>
                            </div>
                        </div>
                        {message && <p className={styles.message}>{message}</p>}
                    </form>
                </div>
            </main>
        </>
    );
}
