import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import SectionHeader from '../../components/SectionHeader';

class Orders extends Component {
  render() {
    return (
      <SectionHeader text="ORDERS" icon="envelope">
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
