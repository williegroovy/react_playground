import React from 'react';
import { shallow, mount } from 'enzyme';

import Step from '../Step';
import { StyledStageContent } from '../styledComponents';

describe('Navigation -> Step Component', () => {
  it('should not render any children if none provided', () => {
    const component = shallow(<Step/>);

    expect(component.exists()).toEqual(true);
    expect(component.children().length).toEqual(0);
  });

  describe('when components are passed', () => {
    it('as children it should render children', () => {
      const component = shallow(
        <Step>
          <div data-test-id="testChild" />
        </Step>
      );

      expect(component.exists()).toEqual(true);

      const stageContent = component.find(StyledStageContent);
      expect(stageContent.exists()).toEqual(true);

      const testChild = component.find('[data-test-id="testChild"]');
      expect(testChild.exists()).toEqual(true);
    });

    it('as function as a child it should render children', () => {
      const component = shallow(
        <Step>
          {
            () => <div data-test-id="testChild" />
          }
        </Step>
      );

      expect(component.exists()).toEqual(true);

      const stageContent = component.find(StyledStageContent);
      expect(stageContent.exists()).toEqual(false);

      const testChild = component.find('[data-test-id="testChild"]');
      expect(testChild.exists()).toEqual(true);
    });

    it('as component prop it should render component', () => {
      const TestComponent = () => <div data-test-id="testChild" />;
      const component = shallow(<Step component={TestComponent} />);

      expect(component.exists()).toEqual(true);

      const stageContent = component.find(StyledStageContent);
      expect(stageContent.exists()).toEqual(true);

      const testComponent = component.find(TestComponent);
      expect(testComponent.exists()).toEqual(true);
    });

    describe('using render prop', () => {
      it('should render null if value is not a function', () => {
        const TestComponent = () => <div data-test-id="testChild" />;
        const component = shallow(
          <Step render={
            () => <TestComponent />
          }/>
        );
      });

      it('should render component', () => {

      });

    });
  });
});
