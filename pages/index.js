// pages/index.js
import styles from '../app/page.module.css';
import Navbar from '../components/Navbar';

export async function getServerSideProps() {
    // Fetch data from your GraphQL API
    const res = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
        query GetUsers {
          users {
            id
            name
            email
          }
        }
      `,
        }),
    });
    const json = await res.json();
    return {
        props: {
            users: json.data.users,
        },
    };
}

export default function Home({ users }) {
    return (
        <>
            <Navbar />
            <main className={styles.container}>
                <h1 className={styles.title}>Users List</h1>
                <div className={styles.userList}>
                    {users.map((user) => (
                        <div key={user.id} className={styles.user}>
                            <div><strong>ID:</strong> {user.id}</div>
                            <div><strong>Name:</strong> {user.name}</div>
                            <div><strong>Email:</strong> {user.email}</div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
