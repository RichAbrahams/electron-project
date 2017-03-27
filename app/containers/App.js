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
      <AppWrapper className="app-wrapper">
        <NavBar />
        {this.props.children}
      </AppWrapper>
    );
  }
}
