import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import SectionHeader from '../../components/SectionHeader';

class Orders extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <SectionHeader text="Print Orders" icon="print">
        <h1>Print orders</h1>
      </SectionHeader>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
