# PushID

## Install
`npm i --save @dwlib/pushid`

## Usage
```javascript
// CJS
const pushid = require('@dwlib/pushid');
// ESM
import PushID from '@dwlib/pushid';
import * as pushid from '@dwlib/pushid';
// Module Exports
const {
  PushID,
  BASE64URL,
  BASE62,
  BASE58
} = pushid;

PushID.BASE64URL.alphabet; // => '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
PushID.BASE62.alphabet; // => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
PushID.BASE58.alphabet; // => '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
```
