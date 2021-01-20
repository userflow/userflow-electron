import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

/** @type {import('rollup').RollupWatchOptions} */
const config = {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: 'userflow-electron',
      format: 'umd',
      sourcemap: true
    },
    {file: pkg.module, format: 'es', sourcemap: true}
  ],
  plugins: [typescript({useTsconfigDeclarationDir: true})]
}

export default config
