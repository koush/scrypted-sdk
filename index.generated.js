class ScryptedDeviceBase {
    constructor(nativeId) {
        this._nativeId = nativeId;
    }

    _lazyLoadDeviceState() {
        if (!this._deviceState) {
            if (this._nativeId) {
                this._deviceState = deviceManager.getDeviceState(this._nativeId);
            }
            else {
                this._deviceState = deviceManager.getDeviceState();
            }
        }
    }

    get on() {
        this._lazyLoadDeviceState();
        return this._deviceState.on;
    }
    set on(value) {
        this._lazyLoadDeviceState();
        this._deviceState.on = value;
    }

    get brightness() {
        this._lazyLoadDeviceState();
        return this._deviceState.brightness;
    }
    set brightness(value) {
        this._lazyLoadDeviceState();
        this._deviceState.brightness = value;
    }

    get colorTemperature() {
        this._lazyLoadDeviceState();
        return this._deviceState.colorTemperature;
    }
    set colorTemperature(value) {
        this._lazyLoadDeviceState();
        this._deviceState.colorTemperature = value;
    }

    get rgb() {
        this._lazyLoadDeviceState();
        return this._deviceState.rgb;
    }
    set rgb(value) {
        this._lazyLoadDeviceState();
        this._deviceState.rgb = value;
    }

    get hsv() {
        this._lazyLoadDeviceState();
        return this._deviceState.hsv;
    }
    set hsv(value) {
        this._lazyLoadDeviceState();
        this._deviceState.hsv = value;
    }

    get paused() {
        this._lazyLoadDeviceState();
        return this._deviceState.paused;
    }
    set paused(value) {
        this._lazyLoadDeviceState();
        this._deviceState.paused = value;
    }

    get running() {
        this._lazyLoadDeviceState();
        return this._deviceState.running;
    }
    set running(value) {
        this._lazyLoadDeviceState();
        this._deviceState.running = value;
    }

    get docked() {
        this._lazyLoadDeviceState();
        return this._deviceState.docked;
    }
    set docked(value) {
        this._lazyLoadDeviceState();
        this._deviceState.docked = value;
    }

    get temperature() {
        this._lazyLoadDeviceState();
        return this._deviceState.temperature;
    }
    set temperature(value) {
        this._lazyLoadDeviceState();
        this._deviceState.temperature = value;
    }

    get temperatureUnit() {
        this._lazyLoadDeviceState();
        return this._deviceState.temperatureUnit;
    }
    set temperatureUnit(value) {
        this._lazyLoadDeviceState();
        this._deviceState.temperatureUnit = value;
    }

    get humidity() {
        this._lazyLoadDeviceState();
        return this._deviceState.humidity;
    }
    set humidity(value) {
        this._lazyLoadDeviceState();
        this._deviceState.humidity = value;
    }

    get lockState() {
        this._lazyLoadDeviceState();
        return this._deviceState.lockState;
    }
    set lockState(value) {
        this._lazyLoadDeviceState();
        this._deviceState.lockState = value;
    }

    get passwords() {
        this._lazyLoadDeviceState();
        return this._deviceState.passwords;
    }
    set passwords(value) {
        this._lazyLoadDeviceState();
        this._deviceState.passwords = value;
    }

    get entryOpen() {
        this._lazyLoadDeviceState();
        return this._deviceState.entryOpen;
    }
    set entryOpen(value) {
        this._lazyLoadDeviceState();
        this._deviceState.entryOpen = value;
    }

    get batteryLevel() {
        this._lazyLoadDeviceState();
        return this._deviceState.batteryLevel;
    }
    set batteryLevel(value) {
        this._lazyLoadDeviceState();
        this._deviceState.batteryLevel = value;
    }

    get online() {
        this._lazyLoadDeviceState();
        return this._deviceState.online;
    }
    set online(value) {
        this._lazyLoadDeviceState();
        this._deviceState.online = value;
    }

    get updateAvailable() {
        this._lazyLoadDeviceState();
        return this._deviceState.updateAvailable;
    }
    set updateAvailable(value) {
        this._lazyLoadDeviceState();
        this._deviceState.updateAvailable = value;
    }

    get fromMimeType() {
        this._lazyLoadDeviceState();
        return this._deviceState.fromMimeType;
    }
    set fromMimeType(value) {
        this._lazyLoadDeviceState();
        this._deviceState.fromMimeType = value;
    }

    get toMimeType() {
        this._lazyLoadDeviceState();
        return this._deviceState.toMimeType;
    }
    set toMimeType(value) {
        this._lazyLoadDeviceState();
        this._deviceState.toMimeType = value;
    }

    get binaryState() {
        this._lazyLoadDeviceState();
        return this._deviceState.binaryState;
    }
    set binaryState(value) {
        this._lazyLoadDeviceState();
        this._deviceState.binaryState = value;
    }

    get intrusionDetected() {
        this._lazyLoadDeviceState();
        return this._deviceState.intrusionDetected;
    }
    set intrusionDetected(value) {
        this._lazyLoadDeviceState();
        this._deviceState.intrusionDetected = value;
    }

    get motionDetected() {
        this._lazyLoadDeviceState();
        return this._deviceState.motionDetected;
    }
    set motionDetected(value) {
        this._lazyLoadDeviceState();
        this._deviceState.motionDetected = value;
    }

    get flooded() {
        this._lazyLoadDeviceState();
        return this._deviceState.flooded;
    }
    set flooded(value) {
        this._lazyLoadDeviceState();
        this._deviceState.flooded = value;
    }

    get ultraviolet() {
        this._lazyLoadDeviceState();
        return this._deviceState.ultraviolet;
    }
    set ultraviolet(value) {
        this._lazyLoadDeviceState();
        this._deviceState.ultraviolet = value;
    }

    get luminance() {
        this._lazyLoadDeviceState();
        return this._deviceState.luminance;
    }
    set luminance(value) {
        this._lazyLoadDeviceState();
        this._deviceState.luminance = value;
    }

}

const sdk = {
    ScryptedDeviceBase,
}

module.exports = sdk;
module.exports.default = sdk;
module.exports.ScryptedDeviceType = {
  Builtin: "Builtin",
  Camera: "Camera",
  Fan: "Fan",
  Light: "Light",
  Switch: "Switch",
  Outlet: "Outlet",
  Sensor: "Sensor",
  Scene: "Scene",
  Program: "Program",
  Automation: "Automation",
  Vacuum: "Vacuum",
  Notifier: "Notifier",
  Thermostat: "Thermostat",
  Lock: "Lock",
  PasswordControl: "PasswordControl",
  Display: "Display",
  Speaker: "Speaker",
  Event: "Event",
  Entry: "Entry",
  Garage: "Garage",
  DeviceProvider: "DeviceProvider",
  DataSource: "DataSource",
  API: "API",
  Unknown: "Unknown",
}
module.exports.TemperatureUnit = {
  C: "C",
  F: "F",
}
module.exports.ThermostatMode = {
  Off: "Off",
  Cool: "Cool",
  Heat: "Heat",
  HeatCool: "HeatCool",
  Auto: "Auto",
  FanOnly: "FanOnly",
  Purifier: "Purifier",
  Eco: "Eco",
  Dry: "Dry",
  On: "On",
}
module.exports.LockState = {
  Locked: "Locked",
  Unlocked: "Unlocked",
  Jammed: "Jammed",
}
module.exports.ClockType = {
  AM: "AM",
  PM: "PM",
  TwentyFourHourClock: "TwentyFourHourClock",
  BeforeSunrise: "BeforeSunrise",
  AfterSunrise: "AfterSunrise",
  BeforeSunset: "BeforeSunset",
  AfterSunset: "AfterSunset",
}
module.exports.ZwaveNotificationType = {
  Type_ValueAdded: "Type_ValueAdded",
  Type_ValueRemoved: "Type_ValueRemoved",
  Type_ValueChanged: "Type_ValueChanged",
  Type_ValueRefreshed: "Type_ValueRefreshed",
  Type_Group: "Type_Group",
  Type_NodeNew: "Type_NodeNew",
  Type_NodeAdded: "Type_NodeAdded",
  Type_NodeRemoved: "Type_NodeRemoved",
  Type_NodeProtocolInfo: "Type_NodeProtocolInfo",
  Type_NodeNaming: "Type_NodeNaming",
  Type_NodeEvent: "Type_NodeEvent",
  Type_PollingDisabled: "Type_PollingDisabled",
  Type_PollingEnabled: "Type_PollingEnabled",
  Type_SceneEvent: "Type_SceneEvent",
  Type_CreateButton: "Type_CreateButton",
  Type_DeleteButton: "Type_DeleteButton",
  Type_ButtonOn: "Type_ButtonOn",
  Type_ButtonOff: "Type_ButtonOff",
  Type_DriverReady: "Type_DriverReady",
  Type_DriverFailed: "Type_DriverFailed",
  Type_DriverReset: "Type_DriverReset",
  Type_EssentialNodeQueriesComplete: "Type_EssentialNodeQueriesComplete",
  Type_NodeQueriesComplete: "Type_NodeQueriesComplete",
  Type_AwakeNodesQueried: "Type_AwakeNodesQueried",
  Type_AllNodesQueriedSomeDead: "Type_AllNodesQueriedSomeDead",
  Type_AllNodesQueried: "Type_AllNodesQueried",
  Type_Notification: "Type_Notification",
  Type_DriverRemoved: "Type_DriverRemoved",
  Type_ControllerCommand: "Type_ControllerCommand",
  Type_NodeReset: "Type_NodeReset",
  Type_UserAlerts: "Type_UserAlerts",
  Type_ManufacturerSpecificDBReady: "Type_ManufacturerSpecificDBReady",
}
