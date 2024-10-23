declare module 'ico-endec' {
  export default class IcoEndec {
    addFromPng(...pngBlobs: Blob[]): this
    encode(): ArrayBuffer
  }
}
