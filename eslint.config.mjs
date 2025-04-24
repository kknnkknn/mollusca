import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react  from 'eslint-plugin-react' // v8 の書き方
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat?.recommended ?? {},
  //next.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [],
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ['error', 'never'],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
])
