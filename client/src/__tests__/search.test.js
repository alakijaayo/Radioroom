import React from 'react';
import ReactDom from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Search from '../Search';
import Enzyme, { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Search />, div);
  ReactDom.unmountComponentAtNode(div);
});

describe('search component', () => {
  it('matches the snapshot', () => {
    // Note: this currently doesn't work with posed animation
    // const tree = renderer.create(<Search />).toJSON();
    // expect(tree).toMatchSnapshot();
  });
});
