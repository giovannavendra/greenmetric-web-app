import React from 'react';

import CategoryScore from './CategoryScore';

export default {
  title: 'Example/CategoryScore',
  component: CategoryScore,
};

const Template = (args) => <CategoryScore {...args} />;

export const Default = Template.bind({});
Default.args = {
  category: {
    name: "Setting and Infrastructure",
    color: "orange",
    code: "SI",
    weight: 0.15,
    value: 600,
    total: 1200,
    scores: [
      {
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
      {
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
      }, {
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
      {
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
      {
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
    ]
  },
}

export const Another = Template.bind({});
Another.args = {
  category: {
    name: "Energy and Climate Change",
    color: "teal",
    code: "EC",
    weight: 0.21,
    value: 600,
    total: 2100,
    scores: [
      {
        metric: "2019/1.8",
        code: "EC1",
        name: "Energy efficient appliances usage",
        point: 50,
        ranges: [
          {
            label: "<= 1%",
            start: 0,
            end: 1,
            multiplier: 0,
          },
          {
            label: "> 1 - 25%",
            start: 2,
            end: 25,
            multiplier: 0.25,
            checked: true,
          },
          {
            label: "> 25 - 50%",
            start: 26,
            end: 50,
            multiplier: 0.5,
          },
          {
            label: "> 50 - 75%",
            start: 51,
            end: 75,
            multiplier: 0.75,
          },
          {
            label: "> 75%",
            start: 76,
            end: 100,
            multiplier: 1,
          },
        ]
      },
      {
        metric: "2019/1.9",
        code: "EC2",
        name: "Smart building implementation",
        point: 200,
        ranges: [
          {
            label: "<= 1%",
            start: 0,
            end: 1,
            multiplier: 0,
          },
          {
            label: "> 1 - 25%",
            start: 2,
            end: 25,
            multiplier: 0.25,
          },
          {
            label: "> 25 - 50%",
            start: 26,
            end: 50,
            multiplier: 0.5,
            checked: true,
          },
          {
            label: "> 50 - 75%",
            start: 51,
            end: 75,
            multiplier: 0.75,
          },
          {
            label: "> 75%",
            start: 76,
            end: 100,
            multiplier: 1,
          },
        ]
      }, {
        metric: "2019/1.9",
        code: "EC3",
        name: "Number of renewable energy sources in campus",
        point: 300,
        ranges: [
          {
            label: "None",
            start: 0,
            end: 0,
            multiplier: 0,
          },
          {
            label: "1 Source",
            start: 1,
            end: 1,
            multiplier: 0.25,
          },
          {
            label: "2 Sources",
            start: 2,
            end: 2,
            multiplier: 0.5,
            checked: true,
          },
          {
            label: "3 Sources",
            start: 3,
            end: 3,
            multiplier: 0.75,
          },
          {
            label: "> 3 Sources",
            start: 4,
            end: 100,
            multiplier: 1,
          },
        ]
      },
      {
        metric: "2019/1.10",
        code: "EC3",
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
      {
        metric: "2019/1.11",
        code: "EC4",
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
    ]
  },
}