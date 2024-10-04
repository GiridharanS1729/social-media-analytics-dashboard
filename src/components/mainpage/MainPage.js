import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import Github from '../github/github';
import Leetcode from '../leetcode/leetcode';
import './main.css';

function MainPage() {
    const { username } = useParams();
    const location = useLocation();
    const { githubID, leetcodeID } = location.state || {};
    const [showLeetcode, setShowLeetcode] = useState(true);

    const handleShowLeetcode = () => {
        setShowLeetcode(true);  
    };

    const handleShowGithub = () => {
        setShowLeetcode(false);  
    };

    return (
        <div className="MainPage">
            <div className="button-container">
                <button onClick={handleShowLeetcode} className={`{showLeetcode ? 'active' : ''} mbtn`}>Leetcode</button>
                <button onClick={handleShowGithub} className={`{!showLeetcode ? 'active' : ''} mbtn`}>Github</button>
            </div>

            <h1>Welcome, {username}</h1>
            <p>Github ID: {githubID}</p>
            <p>Leetcode ID: {leetcodeID}</p>

            {showLeetcode ? <Leetcode leetcodeID={leetcodeID} /> : <Github githubID={githubID} />}
        </div>
    );
}

export default MainPage;
