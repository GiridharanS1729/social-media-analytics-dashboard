import React from 'react'
import './App.css';
import Twitter from './components/twitter';

<<<<<<< HEAD
function App() {
  const [username, setUsername] = useState('Cristiano');
  const [data, setData] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const fetchUserData = async () => {
    setStatusMessage('Fetching data...');
    setData(null); // Reset data before fetching new data
    try {
      const response = await axios.post('http://localhost:5000/get_profile', { username });
      setData(response.data);
      setStatusMessage('Data fetched successfully!');
    } catch (error) {
      setStatusMessage('Network slow. Please try again later.');
      console.error('Error fetching data', error);
    }
  };

=======
export default function App() {
>>>>>>> twitter
  return (
    <>
    <Twitter/>
    </>
  )
}
