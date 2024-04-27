import { defineConfig, presetWebFonts, presetUno } from 'unocss'
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
          sans:'Titillium Web',
        }
    }),
    presetAnimations(),
    presetShadcn({
      color: "slate",
    }),
  ],

  transformers: [
    transformerDirectives(),
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