import type { Wax, Container, TempScale } from '$lib/types';

export const TempScales: TempScale[] = [
  {
    name: 'Fahrenheit',
    value: 'F'
  },
  {
    name: 'Celsius',
    value: 'C'
  }
]

export const containers: Container[] = [
  {
    name: 'Small Apothecary Jar',
    waterGrams: 300,
    diameter: 3,
    wicks: ['LX 16', 'LX 18']
  },
  {
    name: 'Medium Straight Sided Jar',
    waterGrams: 219,
    diameter: 2.8,
    wicks: ['LX 16']
  },
  {
    name: 'Bonne Mamam 13oz jar',
    waterGrams: 240,
    diameter: 2.75,
    wicks: ['LX 16']
  },
  {
    name: 'Opalhouse 15oz jar',
    waterGrams: 490,
    diameter: 3.75,
    wicks: ['CD 2 (double wicked)']
  },
  {
    name: 'Oui yogurt 5oz jar',
    waterGrams: 128,
    diameter: 2,
    wicks: ['small wicks']
  }
];

export const waxes: Wax[] = [
  {
    name: 'Coconut Apricot Wax',
    addFragranceTemperature: {
      F: '190°F',
      C: '87.8°C'
    },
    pourTemperature: {
      F: '175°F',
      C: '79.4°C'
    },
    meltPoint: {
      F: '121-131°F',
      C: '49.4-55.0°C'
    },
    specificGravity: 0.88,
    maxFrangranceLoad: 'up to 15%',
    cureTime: '1-2 days'
  },
  {
    name: 'Golden 464 Soy Wax',
    addFragranceTemperature: {
      F: '185°F',
      C: '85°C'
    },
    pourTemperature: {
      F: '135°F',
      C: '57.2°C'
    },
    meltPoint: {
      F: '113°F',
      C: '45.0°C'
    },
    specificGravity: 0.86,
    maxFrangranceLoad: '6 - 10%',
    cureTime: '1-2 weeks'
  }
];