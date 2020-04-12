import { getContext, setContext} from 'svelte';

const defaultConfigs = [];

export function initConfig(configName, config) {
	defaultConfigs[configName] = config;
}

export function setConfig(configName, config) {
	setContext(configName, merge(getConfig(configName), config));
}

export function getConfig(configName) {
	return getContext(configName) || defaultConfigs[configName];
}

export function merge(config1, config2) {
	const config = {...config1};
	for(const [key, value] of Object.entries(config2)) {
		if (value != null) {
			config[key] = value;
		}
	}
	return config;
}

