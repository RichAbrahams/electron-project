import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayPush } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import SectionWrapper from '../../components/stc/SectionWrapper';
import SectionHeader from '../../components/SectionHeader';
import AddConsignmentForms from '../../components/AddConsignmentForms';

class AddConsignment extends Component {

  componentDidMount() {
    this.props.addProduct();
  }

  render() {
    let subtext;
    switch (this.props.formPageNumber) {
      case 1:
        subtext = 'Consigment Details';
        break;
      case 2:
        subtext = 'Consigment Details > Product Details';
        break;
      case 3:
        subtext = 'Consigment Details > Product Details > Summary';
        break;
      default:
        subtext = 'Consigment Details';
    }
    return (
      <SectionWrapper>
        <SectionHeader text="ADD CONSIGNMENT" subtext={subtext} icon="globe" />
        <AddConsignmentForms {...this.props} subtext={subtext} />
      </SectionWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formPageNumber: selectors.selectFormPageNumber(),
  consignmentForm: selectors.selectConsignmentForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    addConsignment: (data) => dispatch(actions.addConsignment(data)),
    nextForm: () => dispatch(actions.nextForm()),
    previousForm: () => dispatch(actions.previousForm()),
    addProduct: () => dispatch(arrayPush('addConsignment', 'products', { dateAdded: Date.now() })),
    setPageTo1: () => dispatch(actions.SetPageTo1()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddConsignment);
