import React from 'react';
import ReactDom from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Search from './search';
import Enzyme, { shallow } from 'enzyme';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Search />, div);
  ReactDom.unmountComponentAtNode(div);
});
