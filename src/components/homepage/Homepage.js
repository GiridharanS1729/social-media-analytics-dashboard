import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
function Homepage() {
    const [username, setUsername] = useState('');
    const [githubID, setGithubID] = useState('');
    const [leetcodeID, setLeetcodeID] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username) {
            navigate(`/${username}`, { state: { githubID, leetcodeID } });
        } else {
            alert('Please enter your username.');
        }
    };

    return (
        <div className="Homepage">
            <h1>Enter your details</h1>
            <form onSubmit={handleSubmit} autoComplete='true'>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Github ID: </label>
                    <input
                        type="text"
                        value={githubID}
                        onChange={(e) => setGithubID(e.target.value)}
                    />
                </div>
                <div>
                    <label>Leetcode ID: </label>
                    <input
                        type="text"
                        value={leetcodeID}
                        onChange={(e) => setLeetcodeID(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Homepage;
