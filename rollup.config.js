import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import alias from 'rollup-plugin-alias';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

const production = !process.env.ROLLUP_WATCH;
const useVisualizer = process.env.visualizer;

function mainConfig(bundleName) {
	return {
		treeshake: {
			moduleSideEffects: false
		},
		plugins: [
			svelte({
				// enable run-time checks when not in production
				dev: !production,
				// we'll extract any component CSS out into
				// a separate file — better for performance
				css: css => {
					css.write('public/bundle.css');
				}
			}),
			alias({
				entries:[
					{find:'sveltrap', replacement: 'src'},
				]
			}),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/rollup-plugin-commonjs
			resolve({
				browser: true,
				dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
			}),
			commonjs(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			!production && livereload('public'),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser(),
			useVisualizer && visualizer({filename: `./public/${bundleName}.html`, sourcemap: true}),
		],
		watch: {
			clearScreen: false
		}
	};
}

const moduleConfig = {
	input: {
		bundle: 'demo/main.js'
	},
	output: {
		sourcemap: true,
		format: 'esm',
		name: 'app',
		dir: 'public/module',
		// assetFileNames: '[name].js',
		// entryFileNames: '[name].js',
		chunkFileNames: '[name].js',
	},
};

const noModuleConfig = {
	input: {
		bundle: 'demo/main.js'
	},
	output: {
		sourcemap: true,
		format: 'system',
		name: 'app',
		dir: 'public/nomodule',
		// assetFileNames: '[name].js',
		// entryFileNames: '[name].js',
		chunkFileNames: '[name].js',
	}
};

const defaultConfig = mainConfig('bundle');

export default [
	{...mainConfig('module/bundle'), ...moduleConfig},
	{...mainConfig('nomodule/bundle'), ...noModuleConfig},
];
