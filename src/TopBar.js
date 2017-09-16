import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';
import { Image } from 'cloudinary-react';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      singleView: false
    };
  }

  render() {
    return (
      <AppBar
        zDepth={4}
        iconStyleLeft={{ margin: 'auto', display: this.props.singleView ? '' : 'none' }}
        iconElementLeft={
          <IconButton
            onClick={this.props.backCallback}
            style={{ width: 30, height: 30 }}
            iconStyle={{ width: 70, height: 70, padding: 14 }}>
            <NavigationArrowBack />
          </IconButton>
        }
        style={{
          backgroundColor: '#FFFFFF',
          position: 'fixed',
          top: '0px'
        }} >
        <Image
          cloudName={'instaleesh'}
          publicId={'title_logo_zhnnid'}
          height={100}
        />
      </AppBar>
    )
  }
}

export default TopBar;