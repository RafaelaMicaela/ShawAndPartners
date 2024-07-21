import { useState } from 'react';
import './app.css';
import NavBar from './components/navbar/NavBar';
import  IntDataUsers  from './components/navbar/interfaces';
import CardUser from './components/carduser/CardUser';

function App() {
    const [results, setResults] = useState<IntDataUsers[]>([])

    const handleSearchResults = (value: IntDataUsers[]) => {
        setResults(value)
    };

    return (
        <div>
            <NavBar onSearched={handleSearchResults} />
            <div className="flex align-center flex-wrap" style={{justifyContent: 'space-evenly'}}> 
              {results.map((i: IntDataUsers) => <CardUser key={i.name + i.country} data={i} />)}
            </div>
        </div>
    );
}

export default App;
