/**
 * The midway's weather: it changes every 30 seconds, easing from one kind to
 * the next. Plain functions of time, so they test without a browser.
 */

export type Weather = 'sunny' | 'cloudy' | 'rainy' | 'snowy';

/** The order the weather comes round in, starting from page load. */
export const WEATHER_CYCLE: readonly Weather[] = ['sunny', 'cloudy', 'rainy', 'snowy'];
/** How long each kind of weather lasts. */
export const WEATHER_SECONDS = 30;
/** How long the change from one kind to the next takes, at the end of each spell. */
export const WEATHER_FADE_SECONDS = 3;

export interface WeatherState {
  current: Weather;
  next: Weather;
  /** How far the change to `next` has got, from 0 to 1. */
  mix: number;
}

/** The weather `seconds` after the page loaded. */
export function weatherAt(seconds: number): WeatherState {
  const spell = Math.floor(Math.max(0, seconds) / WEATHER_SECONDS);
  const into = Math.max(0, seconds) - spell * WEATHER_SECONDS;
  const fadeStart = WEATHER_SECONDS - WEATHER_FADE_SECONDS;
  return {
    current: WEATHER_CYCLE[spell % WEATHER_CYCLE.length],
    next: WEATHER_CYCLE[(spell + 1) % WEATHER_CYCLE.length],
    mix: Math.max(0, (into - fadeStart) / WEATHER_FADE_SECONDS),
  };
}

/** How much of one kind of weather there is right now, from 0 to 1. */
export function weatherAmount(state: WeatherState, weather: Weather): number {
  return (state.current === weather ? 1 - state.mix : 0) + (state.next === weather ? state.mix : 0);
}

/** Blends two `#rrggbb` colours: `s` of 0 gives `a`, 1 gives `b`. */
export function mixColor(a: string, b: string, s: number): string {
  const channel = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
  const parts = [0, 1, 2].map((i) =>
    Math.round(channel(a, i) + (channel(b, i) - channel(a, i)) * s)
      .toString(16)
      .padStart(2, '0'),
  );
  return `#${parts.join('')}`;
}

/** A colour for the current weather, blended from one colour per kind. */
export function weatherColor(state: WeatherState, colors: Record<Weather, string>): string {
  return mixColor(colors[state.current], colors[state.next], state.mix);
}
