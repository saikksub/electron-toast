# electron-toast
Toast style notification for electron application.

## Install
> npm package not published yet.

> Install `electron` before using `electron-toast`

``` bash
npm install --save electron-toast
```

## Usage

``` JavaScript
const remote = require('electron').remote
const ElectronToast = require('electron-toast')

const toast = new ElectronToast(remote)

toast.makeToast({
  message: 'Hello World'
})
```

# License
[MIT](https://opensource.org/licenses/MIT)

## Author
[saikksub](https://github.com/saikksub)
