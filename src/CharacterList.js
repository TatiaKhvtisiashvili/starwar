import React from 'react';

const CharacterList = ({ characters, onCharacterSelect }) => (
  <ul className="character-list">
    {characters.map((character) => (
      <li 
        key={character.name} 
        onClick={() => onCharacterSelect(character)}
      >
        {character.name}
      </li>
    ))}
  </ul>
);

export default CharacterList;