import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import * as NavSelectors from '../NavBar/selectors';
import SectionHeader from '../../components/SectionHeader';

class HomePage extends Component {

  componentDidMount() {
    this.props.testThunk();
  }

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
  data: selectors.selectData(),
  access: NavSelectors.selectAccessToken(),
  accessExp: NavSelectors.selectAccessTokenExpires(),
  refresh: NavSelectors.selectRefreshToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    testThunk: () => dispatch(actions.testThunk()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
