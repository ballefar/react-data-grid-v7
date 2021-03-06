import React from 'react';
import { Link } from 'react-router-dom';

import ExampleList from './ExampleList';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar navbar-fixed-top headroom">
        <div className="container">
          <div className="navbar-header">
            <a href="https://github.com/adazzle/react-data-grid/fork">
              <img
                className="github-ribbon"
                src="http://aral.github.com/fork-me-on-github-retina-ribbons/right-green@2x.png"
                alt="Fork me on GitHub"
              />
            </a>

            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
            <a className="navbar-brand" href="https://www.adazzle.com"><img className="header-logo" src="assets/images/AdazzleHeaderLogo.png" /></a> <Link className="navbar-brand" to="/">React Data Grid</Link>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav pull-right">
              <li className="active">
                <Link to="/">Home</Link>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Documentation <b className="caret" /></a>
                <ul className="dropdown-menu">
                  <li><Link to="/documentation/gettingstarted">Getting Started</Link></li>
                  <li><Link to="/documentation/apireference">API Reference</Link></li>
                  <li><Link to="/documentation/componentsdocs">Component Docs</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Examples <b className="caret" /></a>
                <ExampleList className="dropdown-menu" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
