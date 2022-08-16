import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export class Filters extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleSearchInputChange = value => {
    this.props.actions.setSearch(value);
    this.props.actions.filterTools();
  };

  handleCategoryClick = value => {
    this.props.actions.setCategory(value);
    this.props.actions.filterTools();
  };

  render() {
    const { filters } = this.props.store;

    const languages = this.props.store.tools.reduce((acc, curr) => {
      if (!acc.includes(curr.language)) {
        acc.push(curr.language);
      }
      return acc;
    }, []);

    //Get a list of languages inside languages array
    const languageOptions = languages.map(language => (
      <Button
        key={language}
        variant="contained"
        color="primary"
        onClick={() => this.handleCategoryClick(language)}
      >
        {language}
      </Button>
    ));

    return (
      <div className="filters">
        <div className="search">
          <TextField
            id="search"
            placeholder="Search"
            onChange={event => this.handleSearchInputChange(event.target.value)}
            InputProps={{
              disableUnderline: true,
              endAdornment: <SearchIcon />,
            }}
            fullWidth={true}
          />
        </div>
        <div className="categories">
          <h4>Language</h4>
          <Button
            className={filters.categories.vector ? 'vector selected' : 'vector'}
            onClick={() => this.handleCategoryClick('vector')}
          >
            Vector
          </Button>
          <Button
            className={filters.categories.raster ? 'raster selected' : 'raster'}
            onClick={() => this.handleCategoryClick('raster')}
          >
            Raster
          </Button>
          <Button
            className={filters.categories.both ? 'both selected' : 'both'}
            onClick={() => this.handleCategoryClick('both')}
          >
            Both
          </Button>
          <Button
            className={filters.categories.other ? 'other selected' : 'other'}
            onClick={() => this.handleCategoryClick('other')}
          >
            Other
          </Button>
          <Button
            className={filters.categories.other ? 'other selected' : 'other'}
            onClick={() => this.handleCategoryClick('other')}
          >
            Other
          </Button>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    store: state.store,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);