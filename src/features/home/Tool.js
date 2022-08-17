import React, { Component } from 'react';
import Snake from './Snake';
import Chip from '@material-ui/core/Chip';

export default class Tool extends Component {
  static propTypes = {};

  getOffsets = (el, side) => {
    const rect = el.getBoundingClientRect(),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (!el.classList.contains('tool')) {
      return this.getOffsets(el.parentElement, side);
    }
    const offsetTop = rect.top + scrollTop;
    const h3Element = el.getElementsByTagName('h3')[0];
    const offsetHorizontal =
      side === 'left'
        ? h3Element.offsetLeft
        : rect.width - h3Element.offsetLeft - h3Element.offsetWidth;
    return { offsetTop, offsetHorizontal };
  };

  normalizeClassName = language =>
    language
      .toLowerCase()
      .replace('#', 'sharp')
      .replace('++', 'plusplus');

  render() {
    const { side, tool, first, last, secondLast, openPopup, selected } = this.props;
    // const categoryLabel = tool.category.charAt(0).toUpperCase() + tool.category.slice(1);
    const languageLabel = tool.language.length > 1 ? 'Multi-language' : tool.language;
    return (
      <div className="home-tool">
        <div
          className={`tool ${side} ${
            tool.language.length > 1 ? 'multi' : this.normalizeClassName(tool.language[0])
          }${selected ? ' selected' : ''}`}
          onClick={event => openPopup(tool.name, side, this.getOffsets(event.target, side), last)}
        >
          {side === 'left' ? (
            <div className="text left">
              <h3>{tool.releaseYear}</h3>
              <h2>{tool.name}</h2>
              <Chip className="category" label={languageLabel} />
            </div>
          ) : (
            <div className="text right">
              <Chip className="category" label={languageLabel} />
              <h2>{tool.name}</h2>
              <h3>{tool.releaseYear}</h3>
            </div>
          )}
          <Snake side={side} first={first} last={last} secondLast={secondLast} />
        </div>
      </div>
    );
  }
}
