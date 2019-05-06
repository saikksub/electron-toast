'use strict'

const types = {
  iconSingleLine: 'TOAST-ICON-SINGLELINE',
  iconHero: 'TOAST-ICON-HERO',
  default: 'TOAST-DEFAULT'
}

const ElectronToast = function (props) {
  if (!(this instanceof ElectronToast)) {
    throw new Error('ElectronToast is a class.')
  }

  if (!(
    'browserWindow' in props && props.browserWindow &&
    'screen' in props && props.screen)
  ) {
    throw new Error(`ElectronToast is required electron.BrowserWindow and electron.screen object as prop.`)
  }

  this.browserWindow = props.browserWindow
  this.screen = props.screen

  this.type = ('type' in props && props.type) ? this.type: types.default
}

ElectronToast.types = types

ElectronToast.prototype.makeToast = function (data) {
  if (
    data && data.constructor === {}.constructor &&
    'message' in data
  ) {
    switch (this.type) {
      case types.iconHero:
        break
      case types.iconSingleLine: 
        break
      default:
        const width = 200
        const height = 60
        const x = (this.screen.getPrimaryDisplay().size.width / 2) - (width / 2)
        const y = (this.screen.getPrimaryDisplay().size.height / 2) + 200

        const win = this.browserWindow({
          height,
          width,
          x,
          y,
          modal: true,
          frame: false,
          alwaysOnTop: true,
          opacity: 0.9,
          center: false,
          backgroundColor: '#D9D9D6',
          hasShadow: false,
          show: false
        })
        win.loadURL(`data:text/html;charset=UTF-8,
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    position; relative;
                    font-family: monospace, sans-serif;
                    font-weight: bold;
                    font-size: 14px;
                    width: 100%;
                    height: 100%;
                  }
                  .message-view {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    text-align: center;
                    transform: translateY(-50%);
                  }
                  .message-view > .message {
                    width: 10px;
                  }
                  ::-webkit-scrollbar {
                    width: 0;
                  }
                </style>
              </head>
              <body>
                <div
                  class="message-view">
                  <span>${data.message}</span>
                </div>
              </body>
            </html>`
          )
          win.webContents.closeDevTools()
          win.on('ready-to-show', () => {
            win.show()
          })
          const waitTime = setInterval(() => {
            win.close()
            clearInterval(waitTime)
          }, 3000)
        break
    }
  }
}

module.exports = ElectronToast
