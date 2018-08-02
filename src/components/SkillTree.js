import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SkillButton from './SkillButton';

import skills from '../skills.json';

class SkillTree extends Component {
  constructor(props) {
    super(props);
    this.state = skills.reduce(
      (acc, skill) => ({
        [skill.id]: 'locked',
        ...acc
      }),
      {
        'blade-1': 'empty',
        shield: 'empty'
      }
    );
  }
  componentDidMount() {
    const matched = this.props.location.search.match(
      /[&?]k=(.+)(&|$)/
    );
    if (matched) {
      const [, selectedString] = matched;
      const selectedSkills = selectedString.split(',');

      const newState = {};
      for (let i = 0; i < selectedSkills.length; i++) {
        const id = selectedSkills[i];
        newState[id] = 'selected';
      }
      this.setState(newState, this.updateSkill);

      this.setState(
        selectedSkills.reduce(
          (acc, id) => ({
            ...acc,
            [id]: 'selected'
          }),
          {}
        ),
        this.updateSkills
      );
    }
  }
  toggle = ({ id }) => {
    if (this.state[id] === 'locked') return;
    this.setState(
      {
        [id]: 'selected'
      },
      this.updateSkills
    );
  };
  updateSkills = () => {
    const newState = skills.reduce((acc, skill) => {
      if (
        this.state[skill.id] === 'locked' &&
        skill.prev.every(prevID => this.state[prevID] === 'selected')
      ) {
        return {
          ...acc,
          [skill.id]: 'empty'
        };
      }
      return acc;
    }, {});
    this.setState(newState);
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const selectedSkills = Object.keys(this.state).filter(
        key => this.state[key] === 'selected'
      );
      this.props.history.replace(`/?k=${selectedSkills.join(',')}`);
    }
  }

  render() {
    return (
      <div>
        {skills.map(skill => (
          <SkillButton
            {...skill}
            onClick={() => this.toggle(skill)}
            onMouseEnter={() => this.props.showInfo(skill)}
            status={this.state[skill.id]}
            key={skill.id}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(SkillTree);
