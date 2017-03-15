import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import SectionHeader from '../../components/SectionHeader';

class HomePage extends Component {

  componentDidMount() {
    this.props.testThunk();
  }

  render() {
    return (
      <SectionHeader text="HOME" icon="home">
        {this.props.data}
      </SectionHeader>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: selectors.selectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    testThunk: () => dispatch(actions.testThunk()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
