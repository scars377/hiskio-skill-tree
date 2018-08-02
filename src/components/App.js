import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import SkillTree from './SkillTree';
import Dialog from './Dialog';

class App extends Component {
  state = {
    info: null
  };
  showInfo = skill => {
    this.setState({
      info: skill
    });
  };
  render() {
    const { info } = this.state;
    return (
      <Router>
        <div>
          <SkillTree showInfo={this.showInfo} />
          {info && <Dialog {...info} />}
        </div>
      </Router>
    );
  }
}

export default App;
