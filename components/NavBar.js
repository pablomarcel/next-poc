// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/" passHref>
                <button className="nav-button">Get Users</button>
            </Link>
            <Link href="/add-user" passHref>
                <button className="nav-button">Add New User</button>
            </Link>
            <style jsx>{`
                .navbar {
                    display: flex;
                    justify-content: center;
                    padding: 1rem;
                    background-color: #f7f7f7;
                    border-bottom: 1px solid #ececec;
                }
                .nav-button {
                    margin: 0 10px;
                    padding: 10px 20px;
                    cursor: pointer;
                    background-color: #333;
                    border: none;
                    color: white;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }
                .nav-button:hover {
                    background-color: #555;
                }
            `}</style>
        </nav>
    );
}
