# XuniWallet - A mobile, native XUNI wallet

### Initial Setup
* git clone https://github.com/lerdos/xuni-mobile-wallet
* cd xuni-mobile-wallet
* yarn install

### Running

* `node --max-old-space-size=8192 node_modules/react-native/local-cli/cli.js start` (Just need to run this once to start the server, leave it running)
* `react-native run-android`

### Logging

`react-native log-android`

### Creating a release

You need to bump the version number in:

* `src/Config.js` - `appVersion`
* `android/app/build.gradle` - `versionCode` and `versionName`
* `package.json` - `version` - Not strictly required

Then
`cd android`
`./gradlew bundleRelease`
Optionally
`./gradlew installRelease`

or `yarn deploy-android`

### Integrating QR Codes or URIs

PleWallet supports two kinds of QR codes.

* Standard addresses / integrated addresses - This is simply the address encoded as a QR code.

* plenteum:// URI encoded as a QR code.

Your uri must being with `plenteum://` followed by the address to send to, for example, `plenteum://PLearxtECBsKFLLeX3edPMEk4ncvZGkJQ7FpPyG3ADGtYbFj7FC5ELWXS2B7wRDfjwSqEwZVp7pwjbWCAhmGJp7z94TQzpNUkP`

There are a few optional parameters.

* `name` - This is used to add you to the users address book, and identify you on the 'Confirm' screen. A name can contain spaces, and should be URI encoded.
* `amount` - This is the amount to send you. This should be specified in atomic units.
* `paymentid` - If not using integrated address, you can specify a payment ID. Specifying an integrated address and a payment ID is illegal.

An example of a URI containing all of the above parameters:

```
plenteum://PLearxtECBsKFLLeX3edPMEk4ncvZGkJQ7FpPyG3ADGtYbFj7FC5ELWXS2B7wRDfjwSqEwZVp7pwjbWCAhmGJp7z94TQzpNUkP?amount=10000000000&name=Starbucks%20Coffee&paymentid=f13adc8ac78eb22ffcee3f82e0e9ffb251dc7dc0600ef599087a89b623ca1402
```

This would send `100 PLE` (10000000000 in atomic units) to the address `PLearxtECBsKFLLeX3edPMEk4ncvZGkJQ7FpPyG3ADGtYbFj7FC5ELWXS2B7wRDfjwSqEwZVp7pwjbWCAhmGJp7z94TQzpNUkP`, using the name `Starbucks Coffee` (Note the URI encoding), and using a payment ID of `f13adc8ac78eb22ffcee3f82e0e9ffb251dc7dc0600ef599087a89b623ca1402`

You can also just display the URI as a hyperlink. If a user clicks the link, it will open the app, and jump to the confirm screen, just as a QR code would function. (Provided all the fields are given)
