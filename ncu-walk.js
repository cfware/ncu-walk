#!/usr/bin/env node
'use strict';

const os = require('os');
const {promisify} = require('util');
const readFile = promisify(require('fs').readFile);
const glob = require('fast-glob');
const pMap = require('p-map');
const semver = require('semver');
const yargs = require('yargs');

async function main(oldest, concurrency) {
	const compare = oldest ? 'gt' : 'lt';
	const packages = await glob('**/node_modules/{*,@*/*}/package.json');
	const dependencies = {};
	const mapper = async pkg => {
		try {
			const data = JSON.parse(await readFile(pkg, 'utf-8'));
			if (data.name in dependencies && !semver[compare](dependencies[data.name], data.version)) {
				return;
			}

			dependencies[data.name] = data.version;
		} catch (_) {
			throw new Error(`Error processing ${pkg}`);
		}
	};

	await pMap(packages, mapper, {concurrency});

	console.log(JSON.stringify({dependencies}));
}

const {argv} = yargs
	.usage('$0 [options]')
	.help()
	.options({
		jobs: {
			describe: 'Maximum number of package.json files to process concurrently',
			default: os.cpus().length * 2,
			type: 'number',
			alias: 'j'
		},
		oldest: {
			describe: 'List the oldest version found for each package',
			default: false,
			type: 'boolean',
			alias: 'o'
		}
	});

main(argv.oldest, argv.jobs).catch(error => {
	console.error(error);
	process.exit(1);
});
