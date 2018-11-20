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

  it('informs the person to sign in', () => {
    const wrapper = shallow(<App />);
    const inform = wrapper.find('h2').text();
    expect(inform).toEqual('To get started, please login via Spotify')
  })

  it('warns users before logging in', () => {
    const wrapper = shallow(<App />);
    const warning = wrapper.find('p').text();
    expect(warning).toEqual("Note: To enjoy the full experience of RadioRoom you need to have a Spotify Premium subscription")
  })

});
