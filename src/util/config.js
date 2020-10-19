import { getContext, setContext} from 'svelte';
import { assertJsonKeys } from '@sveltrap/util/assertions.js';

const defaultConfigs = [];

export function initConfig(configName, config) {
	if (__dev__) {
		// eslint-disable-next-line no-console
		console.info('Config initialization', configName, config);
	}
	defaultConfigs[configName] = config;
}

export function setConfig(configName, config) {
	if (__dev__) {
		// eslint-disable-next-line no-console
		console.info('Config change', configName, config);
	}

	setContext(configName, merge(getConfig(configName), config));
}

export function getConfig(configName) {
	return getContext(configName) || defaultConfigs[configName];
}

export function merge(config1, config2, createNewConfig = true) {
	if (__dev__) {
		if (!config2) {
			// eslint-disable-next-line no-console
			console.group('Configuration');
			// eslint-disable-next-line no-console
			console.log('Current configuration', config1);
			throw new Error('No config provided');
		}

		// eslint-disable-next-line no-console
		if (!assertJsonKeys(config2, Object.keys(config1))) {
			// eslint-disable-next-line no-console
			console.log('Current configuration', config1);
			throw new TypeError('Configuration error');
		}
	}
	return createNewConfig ? Object.assign({}, config1, config2) : Object.assign(config1, config2);
	/*
	const config = createNewConfig ? {...config1} : config1;
	for(const [key, value] of Object.entries(config2)) {
		if (value != null) {
			config[key] = value;
		}
	}
	return config;
	*/
}

