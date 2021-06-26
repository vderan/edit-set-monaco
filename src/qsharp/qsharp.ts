/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { languages } from '../fillers/monaco-editor-core';


export const language = <languages.IMonarchLanguage> {
	// Set defaultToken to invalid to see what you do not tokenize yet
	defaultToken: 'invalid',

	keywords: [
		'namespace',
		'open',
		'as',
		'operation',
		'function',
		'body',
		'adjoint',
		'newtype',
		'controlled',
		'if',
		'elif',
		'else',
		'repeat',
		'until',
		'fixup',
		'for',
		'in',
		'while',
		'return',
		'fail',
		'within',
		'apply',
		'Adjoint',
		'Controlled',
		'Adj',
		'Ctl',
		'is',
		'self',
		'auto',
		'distribute',
		'invert',
		'intrinsic',
		'let',
		'set',
		'w\/',
		'new',
		'not',
		'and',
		'or',
		'use',
		'borrow',
		'using',
		'borrowing',
		'mutable'
	  ],

	typeKeywords: [
		'Unit',
		'Int',
		'BigInt',
		'Double',
		'Bool',
		'String',
		'Qubit',
		'Result',
		'Pauli',
		'Range'
	],

	invalidKeywords: [
		'abstract',
		'base',
		'bool',
		'break',
		'byte',
		'case',
		'catch',
		'char',
		'checked',
		'class',
		'const',
		'continue',
		'decimal',
		'default',
		'delegate',
		'do',
		'double',
		'enum',
		'event',
		'explicit',
		'extern',
		'finally',
		'fixed',
		'float',
		'foreach',
		'goto',
		'implicit',
		'int',
		'interface',
		'lock',
		'long',
		'null',
		'object',
		'operator',
		'out',
		'override',
		'params',
		'private',
		'protected',
		'public',
		'readonly',
		'ref',
		'sbyte',
		'sealed',
		'short',
		'sizeof',
		'stackalloc',
		'static',
		'string',
		'struct',
		'switch',
		'this',
		'throw',
		'try',
		'typeof',
		'unit',
		'ulong',
		'unchecked',
		'unsafe',
		'ushort',
		'virtual',
		'void',
		'volatile'
	],

	constants: [
		'true',
		'false',
		'PauliI',
		'PauliX',
		'PauliY',
		'PauliZ',
		'One',
		'Zero'
	],

	builtin: [
		'X',
		'Y',
		'Z',
		'H',
		'HY',
		'S',
		'T',
		'SWAP',
		'CNOT',
		'CCNOT',
		'MultiX',
		'R',
		'RFrac',
		'Rx',
		'Ry',
		'Rz',
		'R1',
		'R1Frac',
		'Exp',
		'ExpFrac',
		'Measure',
		'M',
		'MultiM',
		'Message',
		'Length',
		'Assert',
		'AssertProb',
		'AssertEqual'
	],

	operators: [
	  'and=',
	  '<-',
	  '->',
	  '*',
	  '*=',
	  '@',
	  '!',
	  '^',
	  '^=',
	  ':',
	  '::',
	  '..',
	  '==',
	  '...',
	  '=',
	  '=>',
	  '>',
	  '>=',
	  '<',
	  '<=',
	  '-',
	  '-=',
	  '!=',
	  'or=',
	  '%',
	  '%=',
	  '|',
	  '+',
	  '+=',
	  '?',
	  '/',
	  '/=',
	  '&&&',
	  '&&&=',
	  '^^^',
	  '^^^=',
	  '>>>',
	  '>>>=',
	  '<<<',
	  '<<<=',
	  '|||',
	  '|||=',
	  '~~~',
	  '_',
	  'w/',
	  'w/='
	],

	symbols:  /[=><!~?:&|+\-*\/\^%@._]+/,

	escapes: /\\[\s\S]/,

	// The main tokenizer for our languages
	tokenizer: {
	  root: [
		// identifiers and keywords
		[/[a-zA-Z_$][\w$]*/, { cases: { '@typeKeywords': 'type',
									 '@keywords': 'keyword',
									 '@constants': 'constant',
									 '@builtin': 'keyword',
									 '@invalidKeywords': 'invalid',
									 '@default': 'identifier'
									 } }],

		// whitespace
		{ include: '@whitespace' },

		// delimiters and operators
		[/[{}()\[\]]/, '@brackets'],
		[/@symbols/, { cases: { '@operators': 'operator',
								'@default'  : '' } } ],


		// numbers
		[/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
		[/\d+/, 'number'],

		// delimiter: after number because of .\d floats
		[/[;,.]/, 'delimiter'],

		// strings
		//[/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
		[/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],

	  ],

	  string: [
		[/[^\\"]+/,  'string'],
		[/@escapes/, 'string.escape'],
		[/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
	  ],

	  whitespace: [
		[/[ \t\r\n]+/, 'white'],
		[/(\/\/).*/,    'comment']
	  ],
	},
  };
