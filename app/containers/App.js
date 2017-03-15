// @flow
import React, { Component } from 'react';
import NavBar from './NavBar';
import AppWrapper from '../components/stc/AppWrapper';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <AppWrapper>
        <NavBar />
        {this.props.children}
      </AppWrapper>
    );
  }
}
