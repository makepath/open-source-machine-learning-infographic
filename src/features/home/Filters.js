import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import tools from '../../data/tools.json';

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

  normalizeClassName = language =>
    language
      .toLowerCase()
      .replace('#', 'sharp')
      .replace('++', 'plusplus');

  render() {
    const { filters } = this.props.store;
    // const fileFormat = tools.reduce((acc, curr) => {
    //   curr.fileFormats.forEach(fileFormat =>
    //     !acc.includes(fileFormat) ? acc.push(fileFormat) : null,
    //   );
    //   return acc;
    // }, []);
    // console.log(fileFormat);

    const languages = tools.reduce((acc, curr) => {
      curr.language.forEach(lang => (!acc.includes(lang) ? acc.push(lang) : null));
      return acc;
    }, []);
    // console.log(languages);

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
        <div className="language">
          <h4>Language</h4>
          {languages.map(language => (
            <Button
              key={language}
              className={
                filters.categories.language
                  ? `${this.normalizeClassName(language)} selected`
                  : this.normalizeClassName(language)
              }
              onClick={() => this.handleCategoryClick(language)}
            >
              {language}
            </Button>
          ))}
          {/* <Button
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
            Python
          </Button>
          <Button
            className={filters.categories.other ? 'other selected' : 'other'}
            onClick={() => this.handleCategoryClick('other')}
          >
            JavaScript
          </Button> */}
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
