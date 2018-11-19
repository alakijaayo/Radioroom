import React from 'react';
import ReactDom from 'react-dom';
import App from '../App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<App />, div);
  ReactDom.unmountComponentAtNode(div);
});

describe('App component', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a login text', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('a').text();
    expect(text).toEqual('Login to Spotify');
  });

  it('renders link to Spotify', () => {
    const wrapper = shallow(<App />);
    const linkToSpotify = wrapper.find('a');
    expect(linkToSpotify.length).toBe(1);
  });

  // it('shows a track in the "Now Playing" section', () => {
  //   const wrapper = shallow(<App />);
  //   const title = wrapper.find('.songTitle').text();
  //   expect(title).toContain('Now Playing: ');
  // });
});
