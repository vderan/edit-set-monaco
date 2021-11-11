/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const REPO_ROOT = path.join(__dirname, '..');

/**
 * Copy a file.
 *
 * @param {string} _source
 * @param {string} _destination
 */
function copyFile(_source, _destination) {
	const source = path.join(REPO_ROOT, _source);
	const destination = path.join(REPO_ROOT, _destination);

	// ensure target dir
	(function () {
		/** @type {string[]} */
		const dirs = [];
		/** @type {string} */
		let dirname = path.dirname(destination);
		while (dirname.length > REPO_ROOT.length) {
			dirs.push(dirname);
			dirname = path.dirname(dirname);
		}
		dirs.reverse();
		dirs.forEach(function (dir) {
			try {
				fs.mkdirSync(dir);
			} catch (err) {}
		});
	})();

	fs.writeFileSync(destination, fs.readFileSync(source));

	console.log(`Copied ${_source} to ${_destination}`);
}
exports.copyFile = copyFile;

/**
 * Remove a directory and all its contents.
 *
 * @param {string} _dirPath
 */
function removeDir(_dirPath) {
	const dirPath = path.join(REPO_ROOT, _dirPath);
	if (!fs.existsSync(dirPath)) {
		return;
	}
	rmDir(dirPath);
	console.log(`Deleted ${_dirPath}`);

	/**
	 * @param {string} dirPath
	 */
	function rmDir(dirPath) {
		const entries = fs.readdirSync(dirPath);
		for (const entry of entries) {
			const filePath = path.join(dirPath, entry);
			if (fs.statSync(filePath).isFile()) {
				fs.unlinkSync(filePath);
			} else {
				rmDir(filePath);
			}
		}
		fs.rmdirSync(dirPath);
	}
}
exports.removeDir = removeDir;

/**
 * Launch the typescript compiler synchronously over a project.
 *
 * @param {string} projectPath
 */
function tsc(_projectPath) {
	const projectPath = path.join(REPO_ROOT, _projectPath);
	cp.spawnSync(process.execPath, [path.join(__dirname, '../node_modules/typescript/lib/tsc.js'), '-p', projectPath], { stdio: 'inherit', stderr: 'inherit' });

	console.log(`Compiled ${_projectPath}`);
}
exports.tsc = tsc;

/**
 * Transform an external .d.ts file to an internal .d.ts file
 *
 * @param {string} _source
 * @param {string} _destination
 * @param {string} namespace
 */
function dts(_source, _destination, namespace) {
	const source = path.join(REPO_ROOT, _source);
	const destination = path.join(REPO_ROOT, _destination);

	const lines = fs
		.readFileSync(source)
		.toString()
		.split(/\r\n|\r|\n/);

	let result = [
		`/*---------------------------------------------------------------------------------------------`,
		` *  Copyright (c) Microsoft Corporation. All rights reserved.`,
		` *  Licensed under the MIT License. See License.txt in the project root for license information.`,
		` *--------------------------------------------------------------------------------------------*/`,
		``,
		`/// <reference path="../node_modules/monaco-editor-core/monaco.d.ts" />`,
		``,
		`declare namespace ${namespace} {`
	];
	for (let line of lines) {
		if (/^import/.test(line)) {
			continue;
		}
		line = line.replace(/    /g, '\t');
		line = line.replace(/declare /g, '');
		if (line.length > 0) {
			line = `\t${line}`;
			result.push(line);
		}
	}
	result.push(`}`);
	result.push(``);

	fs.writeFileSync(destination, result.join('\n'));
}
exports.dts = dts;
