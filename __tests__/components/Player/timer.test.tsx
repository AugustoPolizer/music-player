import React from 'react'
import Timer from '../../../src/components/Player/timer';
import TestRender from 'react-test-renderer';

describe('<Timer />', () =>{
  it('has 1 child', () => {
    const tree = TestRender.create(<Timer currentTime={100} duration={1000}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
})
