import React from 'react';

import MetricScore from './MetricScore';

export default {
  title: 'Example/MetricScore',
  component: MetricScore,
};

const Template = (args) => <MetricScore {...args} />;

export const Worst = Template.bind({});
Worst.args = {
  score: {
    metric: "2019/1.8",
    code: "SI1",
    name: "The ratio of open space area to the total area",
    point: 300,
    ranges: [
      {
        label: "<= 1%",
        start: 0,
        end: 1,
        multiplier: 0,
        checked: true,
      },
      {
        label: "> 1 - 80%",
        start: 2,
        end: 80,
        multiplier: 0.25,
      },
      {
        label: "> 80 - 90%",
        start: 81,
        end: 90,
        multiplier: 0.5,
      },
      {
        label: "> 90 - 95%",
        start: 91,
        end: 95,
        multiplier: 0.75,
      },
      {
        label: "> 95%",
        start: 96,
        end: 100,
        multiplier: 1,
      },
    ]
  },
};

export const Average = Template.bind({});
Average.args = {
  score: {
    metric: "2019/1.9",
    code: "SI2",
    name: "Total area on campus covered in forest vegetation",
    point: 200,
    ranges: [
      {
        label: "<= 2%",
        start: 0,
        end: 2,
        multiplier: 0,
      },
      {
        label: "> 2 - 9%",
        start: 3,
        end: 9,
        multiplier: 0.25,
      },
      {
        label: "> 9 - 22%",
        start: 10,
        end: 22,
        multiplier: 0.5,
        checked: true,
      },
      {
        label: "> 22 - 35%",
        start: 23,
        end: 35,
        multiplier: 0.75,
      },
      {
        label: "> 35%",
        start: 36,
        end: 100,
        multiplier: 1,
      },
    ]
  },
};

export const Best = Template.bind({});
Best.args = {
  score: {
    metric: "2019/1.10",
    code: "SI3",
    name: "Total area on campus covered in planted vegetation",
    point: 300,
    ranges: [
      {
        label: "<= 10%",
        start: 0,
        end: 10,
        multiplier: 0,
      },
      {
        label: "> 10 - 20%",
        start: 11,
        end: 20,
        multiplier: 0.25,
      },
      {
        label: "> 20 - 30%",
        start: 21,
        end: 30,
        multiplier: 0.5,
      },
      {
        label: "> 30 - 40%",
        start: 31,
        end: 40,
        multiplier: 0.75,
      },
      {
        label: "> 40%",
        start: 41,
        end: 100,
        multiplier: 1,
        checked: true,
      },
    ]
  },
};


export const Short = Template.bind({});
Short.args = {
  short: true,
  score: {
    metric: "2019/1.11",
    code: "SI4",
    name: "Total area on campus for water absorption besides the forest and planted vegetation",
    point: 200,
    ranges: [
      {
        label: "<= 2%",
        start: 0,
        end: 2,
        multiplier: 0,
      },
      {
        label: "> 2 - 9%",
        start: 3,
        end: 9,
        multiplier: 0.25,
      },
      {
        label: "> 9 - 22%",
        start: 10,
        end: 22,
        multiplier: 0.5,
        checked: true,
      },
      {
        label: "> 22 - 35%",
        start: 23,
        end: 35,
        multiplier: 0.75,
      },
      {
        label: "> 35%",
        start: 36,
        end: 100,
        multiplier: 1,
      },
    ]
  },
};
