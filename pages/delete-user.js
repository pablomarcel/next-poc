// pages/delete-user.js
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../app/page.module.css';

export default function DeleteUser() {
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the mutation
        const mutation = `
            mutation DeleteUser($id: ID!) {
                deleteUser(id: $id) {
                    id
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
                },
            }),
        });

        // Handle the response from the GraphQL API
        const json = await res.json();
        if (json.errors) {
            setMessage(`Error: ${json.errors.map((error) => error.message).join(', ')}`);
        } else if (json.data.deleteUser === null) {
            setMessage('No user found with the given ID.');
        } else {
            setMessage('User deleted successfully!');
            setId(''); // Reset the ID field
        }
    };

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className={styles.userList}>
                    <h1 className={styles.title}>Delete User</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.user}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="id" className={styles.label}>User ID</label>
                                <input
                                    id="id"
                                    type="text"
                                    placeholder="Enter user ID to delete"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <button type="submit" className={styles.button}>
                                    Delete
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
