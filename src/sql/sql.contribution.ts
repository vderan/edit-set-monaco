/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { registerLanguage } from '../_.contribution';

// Allow for running under nodejs/requirejs in tests
const _monaco: typeof monaco = (typeof monaco === 'undefined' ? (<any>self).monaco : monaco);

registerLanguage({
	id: 'sql',
	extensions: ['.sql'],
	aliases: ['SQL'],
	loader: () => _monaco.Promise.wrap(import('./sql'))
});
