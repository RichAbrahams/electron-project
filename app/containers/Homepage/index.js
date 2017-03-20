import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as NavSelectors from '../NavBar/selectors';
import SectionHeader from '../../components/SectionHeader';

class HomePage extends Component {

  render() {
    return (
      <div>
      <SectionHeader text="HOME" icon="home" />
        <p>{this.props.accessExp}</p>
        <p>{this.props.access}</p>
        <p>{this.props.refresh}</p>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  access: NavSelectors.selectAccessToken(),
  accessExp: NavSelectors.selectAccessTokenExpires(),
  refresh: NavSelectors.selectRefreshToken(),
});


export default connect(mapStateToProps, null)(HomePage);
