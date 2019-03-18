
/**
 * OnOff is a basic binary switch.
 */
export interface OnOff {
  isOn(): boolean;
  turnOff(): void;
  turnOn(): void;
}
/**
 * Brightness is a lighting device that can be dimmed/lit between 0 to 100.
 */
export interface Brightness {
  getLevel(): number;
  setLevel(brightness: number): void;
}
/**
 * ColorSettingTemperature sets the color temperature of a light in Kelvin.
 */
export interface ColorSettingTemperature {
  getTemperature(): number;
  getTemperatureMaxK(): number;
  getTemperatureMinK(): number;
  setTemperature(kelvin: number): void;
}
/**
 * ColorSettingRgb sets the color of a colored light using the RGB representation.
 */
export interface ColorSettingRgb {
  getRgb(): ColorRgb;
  setRgb(r: number, g: number, b: number): void;
}
/**
 * Represents an RGB color value component values between 0 and 255.
 */
export interface ColorRgb {
  b: number,
  g: number,
  r: number,
}
/**
 * ColorSettingHsv sets the color of a colored light using the HSV representation.
 */
export interface ColorSettingHsv {
  getHsv(): ColorHsv;
  setHsv(hue: number, saturation: number, value: number): void;
}
/**
 * Represents an HSV color value component values between 0 and 1.
 */
export interface ColorHsv {
  h: number,
  s: number,
  v: number,
}
export interface BinarySensor {
  getBinaryState(): boolean;
}
export interface EntrySensor {
  isEntryOpen(): boolean;
}
export interface EntryHandleSensor {
  isDoorOpen(): boolean;
}
export interface IntrusionSensor {
  isIntrusionDetected(): boolean;
}
export interface FloodSensor {
  isFlooded(): boolean;
}
/**
 * Notifier can be any endpoint that can receive messages, such as speakers, phone numbers, messaging clients, etc. The messages may optionally contain media.
 */
export interface Notifier {
  sendNotification(title: string, body: string): void;
  /**
   * If a the media parameter is supplied, the mime type denotes how to send the media within notification. For example, specify 'image/*' to send a video MediaObject as an image.
Passing null uses the native type of the MediaObject. If that is not supported by the notifier, the media will be converted to a compatible type.
   */
  sendNotification(title: string, body: string, media: MediaObject, mimeType: string): void;
}
/**
 * MediaObject is an intermediate object within Scrypted to represent all media objects. Plugins should use the MediaConverter to convert the Scrypted MediaObject into a desired type, whether it is a externally accessible URL, a Buffer, etc.
 */
export interface MediaObject {
}
/**
 * StartStop represents a device that can be started, stopped, and possibly paused and resumed. Typically vacuum cleaners or washers.
 */
export interface StartStop {
  isPausable(): boolean;
  isPaused(): boolean;
  isRunning(): boolean;
  pause(): void;
  resume(): void;
  start(): void;
  stop(): void;
}
/**
 * Dock instructs devices that have a base station or charger, to return to their home.
 */
export interface Dock {
  dock(): void;
  isDocked(): boolean;
}
export interface Program {
  /**
   * Synchronously run a script given the provided arguments.
   */
  run(args: object[]): object;
  /**
   * Asynchronously run a script given the provided arguments.
   */
  runAsync(args: object[]): object;
}
/**
 * TemperatureSetting represents a thermostat device.
 */
export interface TemperatureSetting extends Thermometer, HumiditySensor {
  getAvailableThermostatModes(): ThermostatMode[];
  getTemperatureSetpoint(): number;
  getTemperatureSetpointHigh(): number;
  getTemperatureSetpointLow(): number;
  getThermostatMode(): ThermostatMode;
  setTemperatureSetRange(low: number, high: number): void;
  setTemperatureSetpoint(degrees: number): void;
  setThermostatMode(mode: ThermostatMode): void;
}
export interface Thermometer {
  /**
   * Get the ambient temperature in Celsius.
   */
  getTemperatureAmbient(): number;
  /**
   * Get the user facing unit of measurement for this thermometer. This may be Fahrenheit, but getTemperatureAmbient will return results in Celsius.
   */
  getTemperatureUnit(): TemperatureUnit;
}
export enum TemperatureUnit {
  C = "C",
  F = "F",
}
export interface HumiditySensor {
  getHumidityAmbient(): number;
}
export enum ThermostatMode {
  Off = "Off",
  Cool = "Cool",
  Heat = "Heat",
  HeatCool = "HeatCool",
  Auto = "Auto",
  FanOnly = "FanOnly",
  Purifier = "Purifier",
  Eco = "Eco",
  Dry = "Dry",
  On = "On",
}
/**
 * Lock controls devices that can lock or unlock entries. Often works in tandem with PasswordControl.
 */
export interface Lock {
  isLocked(): boolean;
  lock(): void;
  unlock(): void;
}
/**
 * PasswordControl represents devices that authorize users via a passcode or pin code.
 */
export interface PasswordControl {
  addPassword(password: string): void;
  getPasswords(): string[];
  removePassword(password: string): void;
}
export interface CameraStream extends ReferenceId {
  createVideoCapturer(): MediaObject;
}
export interface ReferenceId {
  getRefId(): number;
}
export interface UltravioletSensor {
  getUltraviolet(): number;
}
export interface LuminanceSensor {
  getLuminance(): number;
}
/**
 * Scenes control multiple different devices into a given state.
 */
export interface Scene {
  activate(): void;
  deactivate(): void;
  /**
   * If a scene can be reversed, isReversible should return true. Otherwise deactivate will not be called.
   */
  isReversible(): boolean;
}
/**
 * Entry represents devices that can open and close barriers, such as garage doors.
 */
export interface Entry {
  closeEntry(): void;
  isEntryOpen(): boolean;
  openEntry(): void;
}
/**
 * Event data from the Scheduler component.
 */
export interface Alarm {
  getClockType(): ClockType;
  getHour(): number;
  getMinute(): number;
  isEnabled(day: number): boolean;
}
export enum ClockType {
  _AM = "_AM",
  _PM = "_PM",
  _24HourClock = "_24HourClock",
  _BeforeSunrise = "_BeforeSunrise",
  _AfterSunrise = "_AfterSunrise",
  _BeforeSunset = "_BeforeSunset",
  _AfterSunset = "_AfterSunset",
}
/**
 * Battery retrieves the battery level of battery powered devices.
 */
export interface Battery {
  getBatteryLevel(): number;
}
/**
 * Refresh indicates that this device has properties that are not automatically updated, and must be periodically refreshed.
 */
export interface Refresh {
  /**
   * Get the recommended refresh/poll frequency in seconds for this device.
   */
  getRefreshFrequency(): number;
  /**
   * This method is called by Scrypted when the properties of the device need to be refreshed. When the device has completed the refresh, the appropriate events should be emitted. The parameters provide the specific interface that needs to be refreshed and whether it was user initiated (via UI or voice).
   */
  refresh(refreshInterface: string, userInitiated: boolean): void;
}
/**
 * MediaPlayer allows media playback on screen or speaker devices, such as Chromecasts or TVs.
 */
export interface MediaPlayer {
  load(media: MediaObject, options: MediaPlayerOptions): void;
  load(mediaUrl: string, options: MediaPlayerOptions): void;
  pause(): void;
  play(): void;
  stop(): void;
}
export interface MediaPlayerOptions {
  autoplay: boolean,
  mimeType: string,
}
export interface FaceDetector {
}
/**
 * Online denotes whether the device is online or unresponsive. It may be unresponsive due to being unplugged, network error, etc.
 */
export interface Online {
  isOnline(): boolean;
}
export interface EventListener {
  /**
   * This device type can be hooked by Automation actions to handle events. The event source, event type (interface), and event data are all passed to the listener as arguments.
   */
  onEvent(eventSource: ScryptedInterface, eventInterface: string, eventData: object): void;
}
/**
 * Logger is exposed via log.* to allow writing to the Scrypted log.
 */
export interface Logger {
  /**
   * Alert. Alert level logs will be displayed as a notification in the management console.
   */
  a(msg: string): void;
  /**
   * Clear the log
   */
  clear(): void;
  /**
   * Clear a specific alert
   */
  clearAlert(msg: string): void;
  /**
   * Clear all alerts
   */
  clearAlerts(): void;
  /**
   * Debug
   */
  d(msg: string): void;
  /**
   * Error
   */
  e(msg: string): void;
  /**
   * Info
   */
  i(msg: string): void;
  /**
   * Verbose
   */
  v(msg: string): void;
  /**
   * Warn
   */
  w(msg: string): void;
}
export interface MediaSource {
  /**
   * Get a MediaObject that will be automatically converted for playback on other devices.
   */
  getMedia(): MediaObject;
}
export interface MessagingEndpoint {
}
/**
 * Settings viewing and editing of device configurations that describe or modify behavior.
 */
export interface Settings {
  getBoolean(key: string): boolean;
  getBoolean(key: string, defaultValue: boolean): boolean;
  getConfigurationValueList(key: string): string[];
  getDouble(key: string): number;
  getFloat(key: string): number;
  getInt(key: string): number;
  getKeyDescription(key: string): string;
  getKeys(): string[];
  getString(key: string): string;
  putBoolean(key: string, value: boolean): void;
  putDouble(key: string, value: number): void;
  putFloat(key: string, value: number): void;
  putInt(key: string, value: number): void;
  putString(key: string, value: string): void;
}
/**
 * The OauthClient can be implemented to perform the browser based Oauth process from within a plugin.
 */
export interface OauthClient {
  /**
   * Get the Oauth URL to navigate to in the browser. The redirect_uri parameter is not needed and will be automatically set by Scrypted.
   */
  getOauthUrl(): string;
  /**
   * When an oauth request by a plugin completes, the callback url, with the code/token, will be passed to this method.
   */
  onOauthCallback(callbackUrl: string): void;
}
/**
 * DeviceManager is the interface which plugins use to report devices and device events to Scrypted. It is also used to query Scrypted for other devices.
 */
export interface DeviceManager {
  /**
   * Find a Scrypted device by id.
   */
  getDeviceById(id: string): ScryptedInterface;
  /**
   * Find a Scrypted device by name.
   */
  getDeviceByName(name: string): ScryptedInterface;
  /**
   * onDeviceDiscovered is used to report new devices that are trickle discovered, one by one, such as via a network broadcast.
   */
  onDeviceDiscovered(device: Device): void;
  /**
   * Fire an event for this plugin's device.
   */
  onDeviceEvent(eventInterface: string, eventData: object): void;
  /**
   * Fire an event for a device provided by this plugin.
   */
  onDeviceEvent(id: string, eventInterface: string, eventData: object): void;
  /**
   * onDevicesChanged is used to sync Scrypted with devices that are attached to a hub, such as Hue or SmartThings. All the devices should be reported at once.
   */
  onDevicesChanged(devices: DeviceManifest): void;
}
/**
 * Device objects are created by DeviceProviders when new devices are discover and synced to Scrypted via the DeviceManager.
 */
export interface Device {
  events: string[],
  id: string,
  interfaces: string[],
  model: string,
  name: string,
  room: string,
  type: ScryptedThingType,
}
export enum ScryptedThingType {
  Camera = "Camera",
  Fan = "Fan",
  Light = "Light",
  Switch = "Switch",
  Outlet = "Outlet",
  Sensor = "Sensor",
  Scene = "Scene",
  Program = "Program",
  Automation = "Automation",
  Vacuum = "Vacuum",
  Notifier = "Notifier",
  Thermostat = "Thermostat",
  Lock = "Lock",
  PasswordControl = "PasswordControl",
  Display = "Display",
  Speaker = "Speaker",
  Event = "Event",
  Entry = "Entry",
  DeviceProvider = "DeviceProvider",
  DataSource = "DataSource",
  API = "API",
  Unknown = "Unknown",
}
/**
 * DeviceManifest is passed to DeviceManager.onDevicesChanged to sync a full list of devices from the controller/hub (Hue, SmartThings, etc)
 */
export interface DeviceManifest {
  devices: Device[],
}
/**
 * DeviceProvider acts as a controller/hub and exposes multiple devices to Scrypted Device Manager.
 */
export interface DeviceProvider {
  /**
   * Initiate device discovery for the specified duration.
   */
  discoverDevices(duration: number): void;
  /**
   * Get an instance of a previously discovered device that was reported to the device manager.
   */
  getDevice(id: string): object;
}
/**
 * The HttpRequestHandler allows handling of web requests under the endpoint path: /endpoint/<endpoint>/*.
 */
export interface HttpRequestHandler {
  /**
   * Get the preferred endpoint of this HttpRequestHandler. Local/development scripts can set this to any value. This is ignored if the plugin is installed via npm: the endpoint will always be the npm package name.
   */
  getEndpoint(): string;
  /**
   * Callback to handle an incoming request.
   */
  onRequest(request: HttpRequest, response: HttpResponse): void;
}
export interface HttpRequest {
  body: string,
  headers: object,
  method: string,
  rootPath: string,
  url: string,
}
/**
 * Response object provided by the HttpRequestHandler.
 */
export interface HttpResponse {
  send(options: HttpResponseOptions, body: string): void;
  send(options: HttpResponseOptions, body: Buffer): void;
  send(body: string): void;
  send(body: Buffer): void;
}
export interface HttpResponseOptions {
  asContent: boolean,
  code: number,
  headers: object,
}
/**
 * EventEmitter is implemented by most devices. Add listeners to subscribe to events from that device.
 */
export interface EventEmitter {
  /**
   * Subscribe to events from a specific interface on a device, such as 'OnOff' or 'Brightness'.
The callback function has the signature function(eventSource, eventData).
The eventSource is the interface from where the event originated, and eventData will contain data specific
to that type of interface. OnOff would be boolean, while Brightness would be an integer between 0 and 100.
   */
  on(event: string, callback: (eventSource: ScryptedInterface, eventInterface: string, eventData: object) => void): EventListenerRegister;
  /**
   * Similar to 'on', but will passively watch for events, and not initiate polling.
   */
  watch(event: string, callback: (eventSource: ScryptedInterface, eventInterface: string, eventData: object) => void): EventListenerRegister;
}
/**
 * Returned when an event listener is attached to an EventEmitter. Call removeListener to unregister from events.
 */
export interface EventListenerRegister {
}
/**
 * All Scrypted devices implement ScryptedInterface, which contains id, name, and type.
 */
export interface ScryptedInterface {
  id(): string;
  name(): string;
  type(): ScryptedThingType;
}


export interface ScryptedStatic {
    deviceManager: DeviceManager,
    scriptSettings: Settings,
    log: Logger,
}

declare const Scrypted: ScryptedStatic;

export default Scrypted;
