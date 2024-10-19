import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CharacterDetails from './CharacterDetails';
import './App.css';
import CharacterList from './CharacterList';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const fetchCharacters = async () => {
    let allCharacters = [];
    let nextUrl = 'https://swapi.dev/api/people/';

    try {
      setLoading(true);
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
        nextUrl = data.next;
      }
      setCharacters(allCharacters);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleCharacterSelect = (character) => {
    if (selectedCharacter && selectedCharacter.name === character.name) {
      setSelectedCharacter(null);
    } else {
      setSelectedCharacter(character);
    }
  };

  const handleSearch = (query) => {
    if (query) {
      const filtered = characters.filter((char) =>
        char.name.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length > 0) {
        setSelectedCharacter(filtered[0]);
      } else {
        setSelectedCharacter(null);
      }
    } else {
      setSelectedCharacter(null);
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="star-wars-title">
          <div className="star">Star Wars</div>
          <div className="wars">Characters</div>
        </div>
        <SearchBar onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {error && <p>Error, something went wrong</p>}
        <div className="results">
          {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
        </div>
      </div>

      <div className="sidebar">
        <h2>All Characters</h2>
        <CharacterList characters={characters} onCharacterSelect={handleCharacterSelect} />
      </div>
    </div>
  );
};

export default App;
