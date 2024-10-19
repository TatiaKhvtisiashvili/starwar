import React from 'react';

class CharacterDetails extends React.Component {
    state = {
      films: [],
      species: [],
      starships: [],
      vehicles: [],
      showFilms: false,
      showSpecies: false,
      showStarships: false,
      showVehicles: false
    };
  

  fetchDetails = async (urls, stateKey) => {
    if (urls.length === 0) return;
    const details = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );
    this.setState({ [stateKey]: details });
  }

  toggleDetails = (detailType, urls) => {
    this.setState((prevState) => {
      const isShown = prevState[`show${detailType}`];
      if (!isShown && prevState[detailType.toLowerCase()].length === 0) {
        this.fetchDetails(urls, detailType.toLowerCase());
      }
      return { [`show${detailType}`]: !isShown };
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.character !== prevProps.character) {
      this.setState({
        films: [],
        species: [],
        starships: [],
        vehicles: [],
        showFilms: false,
        showSpecies: false,
        showStarships: false,
        showVehicles: false
      });
    }
  }

  render() {
    const { character } = this.props;
    const { films, species, starships, vehicles, showFilms, showSpecies, showStarships, showVehicles } = this.state;

    return (
      <div className="character-details">
        <h2>{character.name}</h2>
        <p>Height: {character.height}</p>
        <p>Mass: {character.mass}</p>
        <p>Birth Year: {character.birth_year}</p>

        <div className="additional-details">
          {character.films.length > 0 && (
            <button onClick={() => this.toggleDetails('Films', character.films)}>
              {showFilms ? 'Hide Films' : 'Show Films'}
            </button>
          )}
          {showFilms && (
            <ul>
              {films.map((film) => (
                <li key={film.title}>{film.title}</li>
              ))}
            </ul>
          )}

          {character.species.length > 0 && (
            <button onClick={() => this.toggleDetails('Species', character.species)}>
              {showSpecies ? 'Hide Species' : 'Show Species'}
            </button>
          )}
          {showSpecies && (
            <ul>
              {species.map((s) => (
                <li key={s.name}>{s.name}</li>
              ))}
            </ul>
          )}

          {character.starships.length > 0 && (
            <button onClick={() => this.toggleDetails('Starships', character.starships)}>
              {showStarships ? 'Hide Starships' : 'Show Starships'}
            </button>
          )}
          {showStarships && (
            <ul>
              {starships.map((ss) => (
                <li key={ss.name}>{ss.name}</li>
              ))}
            </ul>
          )}

          {character.vehicles.length > 0 && (
            <button onClick={() => this.toggleDetails('Vehicles', character.vehicles)}>
              {showVehicles ? 'Hide Vehicles' : 'Show Vehicles'}
            </button>
          )}
          {showVehicles && (
            <ul>
              {vehicles.map((v) => (
                <li key={v.name}>{v.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default CharacterDetails;
