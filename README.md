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
  BASE58,
  BASE62,
  BASE64URL
} = pushid;

PushID.BASE58.alphabet; // => '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
PushID.BASE62.alphabet; // => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
PushID.BASE64URL.alphabet; // => '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
```
