import React from "react";
import "./SearchBar.css";


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'term': '',
      'location': '',
      'sortBy': 'best_match'
    }
    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count",
      "Distance": "distance"
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    // this.handleSortByChange = this.handleSortByChange.bind(this);
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

  handleSortByChange(sortByOption) {
    this.setState({
      'sortBy': sortByOption
    }, () => {
      if (this.props.businesses.length !== 0) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
      }
    })
  } //May need to be bound '.bind(this)'

  handleTermChange(event) {
    this.setState({
      'term': event.target.value
    })
  }

  handleLocationChange(event) {
    this.setState({
      'location': event.target.value
    })
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      const sortByOptionValue = this.sortByOptions[sortByOption];
      return (<li
        className={this.getSortByClass(sortByOptionValue)}
        key={sortByOptionValue}
        onClick={
          this.handleSortByChange.bind(this, sortByOptionValue)
          /*Yet to fully understand this use of '.bind(this)'*/
          /*Finally got it, ha!*/ 
        }
      >{sortByOption}</li>);
    })
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <form>
          <div className="SearchBar-fields">
            <input onChange={this.handleTermChange} placeholder="Search for Services e.g 'Pizza', 'Taxi', 'Nanny'" />
            <input onChange={this.handleLocationChange} placeholder="Where?" />
          </div>
          <div className="SearchBar-submit">
            <input type="submit" onClick={this.handleSearch} value="Let's Go" />
          </div>
        </form>
      </div>
    )
  }
}

export default SearchBar;


