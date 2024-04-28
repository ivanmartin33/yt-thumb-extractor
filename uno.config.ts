import { defineConfig, presetWebFonts, presetUno, presetMini } from 'unocss'
import type { Theme } from 'unocss/preset-uno'
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";
import transformerDirectives from '@unocss/transformer-directives'
import presetTheme from 'unocss-preset-theme'

export default defineConfig({
  theme: {
    colors: {
      'primary': {
        950: '#E6E6E6', /* value from 50 */
        900: '#DBDBDB',
        800: '#C7C7C7',
        700: '#B3B3B3',
        600: '#9E9E9E',
        500: '#8A8A8A',
        400: '#6E6E6E',
        300: '#525252',
        200: '#363636',
        100: '#1A1A1A',
        50: '#0B0B0B', /* value from 950 */
        DEFAULT: '#0B0B0B',
      },
      'secondary': '#E6E6E6',

    },
  },

  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Roboto',
      }
    }),
    presetAnimations(),
    presetShadcn({
      color: "slate",
    }),
    presetTheme<Theme>({
      theme: {
        dark: {
          colors: {
            'primary': {
              DEFAULT: '#E6E6E6',
              50: '#E6E6E6',
              100: '#DBDBDB',
              200: '#C7C7C7',
              300: '#B3B3B3',
              400: '#9E9E9E',
              500: '#8A8A8A',
              600: '#6E6E6E',
              700: '#525252',
              800: '#363636',
              900: '#1A1A1A',
              950: '#0B0B0B'
            },
            'secondary': '#0B0B0B'
          }
        }
      }
    }),
    presetMini({
      dark: 'class'
    }),
  ],

  transformers: [
    transformerDirectives(),
  ],
  rules: [
    ['bg-iconic', { background: 'repeating-conic-gradient(#f6f3f0, #f6f3f0 25%, #e5e5e5 0%, #e5e5e5 50%)', 'background-size': '1.5rem 1.5rem' }],
    ['bg-iconic-dark', { background: 'repeating-conic-gradient(#050505, #050505 25%, hsl(223deg 10% 7%) 0%, hsl(223deg 10%, 7%) 50%)', 'background-size': '1.5rem 1.5rem' }],
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|[jt]sx|mdx?|phtml|html)($|\?)/,
        // include js/ts files
        "./**/*.{js,ts}",
        "./components/ui/**/*.{vue,ts}"
      ],
    },
  },

})