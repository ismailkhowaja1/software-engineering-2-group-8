import React, { Component } from 'react';
import Dock from 'react-dock';

class SidePanel extends Component {
  render() {
    const { isVisible } = this.props;
    const dockStyle = {
      width: '20px',
      marginTop: '30px',
      backgroundColor: 'lightgrey',
    };

    return (
      <Dock size={0.2} position='left' isVisible={isVisible} dimMode={'none'} dockStyle={dockStyle}>
      {/* you can pass a function as a child here or child components */}
      </Dock>
    );
  }
}

export default SidePanel;