import React from 'react';

class SearchBar extends React.Component {
  state = { query: '' };

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
      this.props.onSearch(this.state.query);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-bar">
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
          placeholder="Search for a character"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;
