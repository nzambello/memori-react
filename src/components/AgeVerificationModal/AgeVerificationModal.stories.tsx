import React from 'react';
import { Meta, Story } from '@storybook/react';
import AgeVerificationModal, { Props } from './AgeVerificationModal';

import './AgeVerificationModal.css';

const meta: Meta = {
  title: 'AgeVerificationModal',
  component: AgeVerificationModal,
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
};

export default meta;

const Template: Story<Props> = args => <AgeVerificationModal {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
Default.args = {
  visible: true,
  onClose: () => {},
  minAge: 0,
};

export const Min14yo = Template.bind({});
Min14yo.args = {
  visible: true,
  onClose: () => {},
  minAge: 14,
};

export const Min18yo = Template.bind({});
Min18yo.args = {
  visible: true,
  onClose: () => {},
  minAge: 18,
};
