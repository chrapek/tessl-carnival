import { theme } from '../carnival';

const { colors } = theme;

/**
 * The midway map's daytime palette. Tent reds, creams and golds come from the
 * carnival theme; the sky, grass, paths and other scenery shades only the map
 * uses live here.
 */
export const palette = {
  sky: '#38b4e6',
  skyHigh: '#1f9bd6',
  cloud: '#bfeafc',
  cloudShade: '#94d8f4',
  haze: '#5fc3b8',

  grass: '#a5c43a',
  grassDark: '#8aab2a',
  grassEdge: '#7a9a22',
  grassLight: '#b6d24c',
  path: '#f3e28e',
  pathShade: '#e2cd70',
  hedge: '#6f9a2c',
  hedgeDark: '#5a8122',
  hedgeLight: '#86b236',
  shadow: 'rgba(60, 90, 10, 0.28)',

  red: colors.stripeA,
  redShade: '#b8283a',
  cream: colors.stripeB,
  creamShade: '#e3d9c2',
  gold: colors.accent,
  goldShade: '#e0a91c',
  blue: '#2b8ccc',
  blueShade: '#1f6aa0',
  sky2: colors.water,
  pink: '#f59ac0',
  pinkShade: '#e076a4',
  wood: colors.wood,
  woodDark: '#6b4429',
  woodLight: '#b7834f',
  board: '#c8955b',
  metal: '#e9e4f2',
  metalShade: '#b9b0cc',
  ink: colors.background,
  opening: '#4a2a28',
  closed: '#a99cc4',
  closedShade: '#8a7daa',
  white: '#ffffff',

  skins: ['#f1c27d', '#c68642', '#8d5524', '#e0ac69', '#ffdbac'],
  hairs: ['#3b2219', '#1b1035', '#a55728', '#e6c35c', '#6b4429'],
  shirts: [colors.water, '#7bd389', '#b48ee0', colors.danger, '#2b8ccc', colors.stripeB],
  pants: ['#2d3a6b', '#3b2a4f', '#5a4a3a'],
  bunting: [colors.stripeA, colors.accent, '#2b8ccc', colors.stripeB],
  balloons: [colors.stripeA, colors.accent, '#2b8ccc', colors.water, '#f59ac0'],

  /** The sky and clouds for each kind of weather. Sunny is the daytime palette above. */
  weather: {
    sky: { sunny: '#38b4e6', cloudy: '#8fb6cc', rainy: '#6f8799', snowy: '#c3d3df' },
    skyHigh: { sunny: '#1f9bd6', cloudy: '#7299b0', rainy: '#4f6577', snowy: '#a3b8c8' },
    cloud: { sunny: '#bfeafc', cloudy: '#e4ecf1', rainy: '#9aa6b0', snowy: '#f4f8fb' },
    cloudShade: { sunny: '#94d8f4', cloudy: '#c3d0d8', rainy: '#7c8994', snowy: '#d6e0e8' },
  },
  /** Laid thinly over the midway when the sky is grey. */
  gloom: '#2f3d4a',
  rain: '#dcebf5',
  snow: '#ffffff',
} as const;
