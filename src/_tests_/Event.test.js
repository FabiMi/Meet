import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe("<Event /> component", () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];

    EventWrapper = shallow(<Event event={event} />);
  });

  test('render title in event item', () => {
    expect(EventWrapper.find('.event-summary-title')).toHaveLength(1);
  });

  test('render info in event item', () => {
    expect(EventWrapper.find('.event-info')).toHaveLength(1);
  });

  test('render show details button in event item', () => {
    expect(EventWrapper.find('.event-details-btn')).toHaveLength(1);
  });

  test('render event title correctly', () => {
    expect(EventWrapper.find('.event-summary-title').text()).toBe(
      event.summary
  )});

  test('render event info correctly', () =>  {
    expect(EventWrapper.find('.event-info').text()).toContain (event.summary, event.location, event.dateTime);
 test('event stays collapsed by default', () =>{
     expect(EventWrapper.state('show')).toBe(false);
 });
 test('render click to expand event details', () => {
    EventWrapper.find('.event-details-btn').simulate('click');
    expect(EventWrapper.state('show')).toBe(true);
  });
});