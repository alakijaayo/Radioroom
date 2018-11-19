import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Chat from '../Chat'

Enzyme.configure({ adapter: new Adapter() });

const chat = [{
  id: 1,
  text: 'hello radioroom',
  user_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/1381887_10201346045386534_973307961_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=469ec1722c45310e5fd3e5043e7eed66&oe=5C6DE405'
}, {

  id: 2,
  text: 'goodbye radioroom',
  user_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/15978093_10154712760570568_4766216528086979_n.jpg?_nc_cat=106&_nc_ht=scontent.xx&oh=e2864c83a2c5173327b5b548bee2a8be&oe=5C69475A'
}]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Chat messages={chat} />, div);
  ReactDom.unmountComponentAtNode(div);
});

describe('Chat component', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<Chat />).toJSON();
    expect(tree).toMatchSnapshot()
  });

  // it('renders the chat messages', () => {
  //   const chatUI = mount(<Chat messages={chat}/>);
  //   expect(
  //     chatUI.containsMatchingElement(
  //       <p>hello radioroom</p>
  //     ).to.equal(true)
  //   )
  // });
});
