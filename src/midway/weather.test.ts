import { describe, expect, it } from 'vitest';
import {
  mixColor,
  WEATHER_CYCLE,
  WEATHER_FADE_SECONDS,
  WEATHER_SECONDS,
  weatherAmount,
  weatherAt,
  weatherColor,
} from './weather';

describe('weatherAt', () => {
  it('starts sunny and holds steady for most of the spell', () => {
    expect(weatherAt(0)).toEqual({ current: 'sunny', next: 'cloudy', mix: 0 });
    expect(weatherAt(WEATHER_SECONDS - WEATHER_FADE_SECONDS)).toEqual({
      current: 'sunny',
      next: 'cloudy',
      mix: 0,
    });
  });

  it('changes every 30 seconds', () => {
    expect(WEATHER_SECONDS).toBe(30);
    expect(weatherAt(30).current).toBe('cloudy');
    expect(weatherAt(60).current).toBe('rainy');
    expect(weatherAt(90).current).toBe('snowy');
  });

  it('comes back round to the start after a full cycle', () => {
    expect(weatherAt(WEATHER_SECONDS * WEATHER_CYCLE.length + 5)).toEqual(weatherAt(5));
  });

  it('eases into the next weather at the end of a spell', () => {
    const halfway = weatherAt(WEATHER_SECONDS - WEATHER_FADE_SECONDS / 2);
    expect(halfway.current).toBe('sunny');
    expect(halfway.next).toBe('cloudy');
    expect(halfway.mix).toBeCloseTo(0.5);
  });

  it('treats a negative time as the start', () => {
    expect(weatherAt(-10)).toEqual(weatherAt(0));
  });
});

describe('weatherAmount', () => {
  it('is all one kind between changes', () => {
    const rainy = weatherAt(65);
    expect(weatherAmount(rainy, 'rainy')).toBe(1);
    expect(weatherAmount(rainy, 'snowy')).toBe(0);
  });

  it('splits between both kinds during a change', () => {
    const change = weatherAt(90 - WEATHER_FADE_SECONDS / 4);
    expect(weatherAmount(change, 'rainy')).toBeCloseTo(0.25);
    expect(weatherAmount(change, 'snowy')).toBeCloseTo(0.75);
  });
});

describe('mixColor', () => {
  it('blends two colours', () => {
    expect(mixColor('#000000', '#ffffff', 0)).toBe('#000000');
    expect(mixColor('#000000', '#ffffff', 1)).toBe('#ffffff');
    expect(mixColor('#000000', '#ff8040', 0.5)).toBe('#804020');
  });
});

describe('weatherColor', () => {
  it('picks the colour for the weather, blending during a change', () => {
    const colors = { sunny: '#000000', cloudy: '#ffffff', rainy: '#ff0000', snowy: '#0000ff' };
    expect(weatherColor(weatherAt(10), colors)).toBe('#000000');
    expect(weatherColor(weatherAt(40), colors)).toBe('#ffffff');
    expect(weatherColor(weatherAt(30 - WEATHER_FADE_SECONDS / 2), colors)).toBe('#808080');
  });
});
