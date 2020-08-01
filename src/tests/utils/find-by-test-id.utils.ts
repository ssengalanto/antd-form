import { ShallowWrapper, ReactWrapper } from 'enzyme';

type EnzymeWrapper = ShallowWrapper | ReactWrapper;

export const findByTestId = (wrapper: EnzymeWrapper, attr: string): EnzymeWrapper =>
  wrapper.find(`[data-test-id='${attr}']`);
