// Copyright (C) 2018, Zpalmtree
//
// Please see the included LICENSE file for more information.

import { Platform } from 'react-native';

import { MixinLimit, MixinLimits, Daemon } from 'plenteum-wallet-backend';

import {
    derivePublicKey, generateKeyDerivation, generateRingSignatures,
    deriveSecretKey, generateKeyImage,
} from './NativeCode';

const Config = new function() {
    /**
     * If you can't figure this one out, I don't have high hopes
     */
    coinName: 'Ultranote Infinity',

    /**
     * Prefix for URI encoded addresses
     */
    uriPrefix: 'xuni://',

    /**
     * How often to save the wallet, in milliseconds
     */
    this.walletSaveFrequency = 60 * 1000;

    /**
     * The amount of decimal places your coin has, e.g. Plenteum has eight
     * decimals
     */
    decimalPlaces: 6,

    /**
     * The address prefix your coin uses - you can find this in CryptoNoteConfig.h.
     * In Plenteum, this converts to PLe
     */
    addressPrefix: 0x2de638,

    /**
     * Request timeout for daemon operations in milliseconds
     */
    this.requestTimeout = 10 * 1000;

    /**
     * The block time of your coin, in seconds
     */
    blockTargetTime: 120,

    /**
     * How often to process blocks, in millseconds
     */
    this.syncThreadInterval = 4;

    /**
     * How often to update the daemon info, in milliseconds
     */
    daemonUpdateInterval: 15 * 1000,

    /**
     * How often to check on locked transactions
     */
    lockedTransactionsCheckInterval: 15 * 3000,

    /**
     * The amount of blocks to process per 'tick' of the mainloop. Note: too
     * high a value will cause the event loop to be blocked, and your interaction
     * to be laggy.
     */
    this.blocksPerTick = 1;

    /**
     * Your coins 'ticker', generally used to refer to the coin, i.e. 123 PLE
     */
    ticker: 'XUNI',

    /**
     * Most people haven't mined any blocks, so lets not waste time scanning
     * them
     */
    this.scanCoinbaseTransactions = false;

    /**
     * The minimum fee allowed for transactions, in ATOMIC units
     */
    minimumFee: 0.001000,

    /**
     * The length of a standard address for your coin
     */
    standardAddressLength: 99,

    /**
     * The length of an integrated address for your coin - It's the same as
     * a normal address, but there is a paymentID included in there - since
     * payment ID's are 64 chars, and base58 encoding is done by encoding
     * chunks of 8 chars at once into blocks of 11 chars, we can calculate
     * this automatically
     */
    integratedAddressLength: 99 + ((64 * 11) / 8),

    /**
     * Use our native func instead of JS slowness
     */
    this.derivePublicKey = Platform.OS === 'ios' ? undefined : derivePublicKey;

    /**
     * Use our native func instead of JS slowness
     */
    this.generateKeyDerivation = Platform.OS === 'ios' ? undefined : generateKeyDerivation;

    /**
     * Use our native func instead of JS slowness
     */
    this.generateRingSignatures = Platform.OS === 'ios' ? undefined : generateRingSignatures;

    /**
     * Use our native func instead of JS slowness
     */
    this.deriveSecretKey = Platform.OS === 'ios' ? undefined : deriveSecretKey;

    /**
     * Use our native func instead of JS slowness
     */
    this.generateKeyImage = Platform.OS === 'ios' ? undefined : generateKeyImage;

    /**
     * Memory to use for storing downloaded blocks - 16MB
     */
    this.blockStoreMemoryLimit = 1024 * 1024 * 16;

    /**
     * Amount of blocks to request from the daemon at once
     */
    this.blocksPerDaemonRequest = 100;

    /**
     * Unix timestamp of the time your chain was launched.
     *
     * Note - you may want to manually adjust this. Take the current timestamp,
     * take away the launch timestamp, divide by block time, and that value
     * should be equal to your current block count. If it's significantly different,
     * you can offset your timestamp to fix the discrepancy
     */
    chainLaunchTimestamp: new Date(1000 * 1533106800),

    /**
     * Fee to take on all transactions, in percentage
     */
    devFeePercentage: 0,

    /**
     * Address to send dev fee to
     */
    devFeeAddress: '',

    /**
     * Base url for price API
     *
     * The program *should* fail gracefully if your coin is not supported, or
     * you just set this to an empty string. If you have another API you want
     * it to support, you're going to have to modify the code in Currency.js.
     */
    this.priceApiLink = '';

    /**
     * Default daemon to use. Can either be a BlockchainCacheApi(baseURL, SSL),
     * or a ConventionalDaemon(url, port).
     */
    defaultDaemon: new Daemon('node1.ultranote.org', 43000),

    /**
     * A link to where a bug can be reported for your wallet. Please update
     * this if you are forking, so we don't get reported bugs for your wallet...
     *
     */
    repoLink: 'https://github.com/xun-project/xuni-mobile-wallet/issues',

    /**
     * This only controls the name in the settings screen.
     */
    appName: 'XuniWallet',

    /** 
     * Customer user agent string for wallet backend requests
     */
    this.customUserAgentString = this.appName.toLowerCase() + '-da-xuniest!';

    /**
     * Slogan phrase during wallet CreateScreen
     */
    sloganCreateScreen: 'Anonymous & Untraceable Network, Instant Private Transactions!',

    /**
     * Displayed in the settings screen
     */
    appVersion: 'v0.0.1',

    /**
     * Base URL for us to chuck a hash on the end, and find a transaction
     */
    explorerBaseURL: 'https://explorer.ultranote.org/index.html?hash=',

    /**
     * A link to your app on the Apple app store. Currently blank because we
     * haven't released for iOS yet...
     */
    this.appStoreLink = '';

    /**
     * A link to your app on the google play store
     * Also not released yet, but linking to old wallet
     */
    googlePlayLink: 'https://play.google.com/store/apps/details?id=com.xuniwallet',
};

module.exports = Config;
