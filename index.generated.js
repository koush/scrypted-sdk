class ScryptedDeviceBase {
    constructor(nativeId) {
        this.nativeId = nativeId;
    }

    get storage() {
        if (!this._storage) {
            this._storage = deviceManager.getDeviceStorage(this.nativeId);
        }
        return this._storage;
    }

    get log() {
        if (!this._log) {
            this._log = deviceManager.getDeviceLogger(this.nativeId);
        }
        return this._log;
    }

    _lazyLoadDeviceState() {
        if (!this._deviceState) {
            if (this.nativeId) {
                this._deviceState = deviceManager.getDeviceState(this.nativeId);
            }
            else {
                this._deviceState = deviceManager.getDeviceState();
            }
        }
    }
}

(function() {
function _createGetState(state) {
    return function() {
        this._lazyLoadDeviceState();
        return this._deviceState[state];
    };
}

function _createSetState(state) {
    return function(value) {
        this._lazyLoadDeviceState();
        this._deviceState[state] = value;
    };
}

var fields = ["component","id","interfaces","metadata","name","room","type","on","brightness","colorTemperature","rgb","hsv","running","paused","docked","temperature","temperatureUnit","humidity","thermostatAvailableModes","thermostatMode","thermostatSetpoint","thermostatSetpointHigh","thermostatSetpointLow","lockState","entryOpen","batteryLevel","online","updateAvailable","fromMimeType","toMimeType","binaryState","intrusionDetected","motionDetected","occupied","flooded","ultraviolet","luminance","position",
];
for (var field of fields) {
    Object.defineProperty(ScryptedDeviceBase.prototype, field, {
        set: _createSetState(field),
        get: _createGetState(field),
    });
}
})();


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
module.exports.MediaPlayerState = {
  Idle: "Idle",
  Playing: "Playing",
  Paused: "Paused",
  Buffering: "Buffering",
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

module.exports.ScryptedInterface = {
  OnOff: "OnOff",
  Brightness: "Brightness",
  ColorSettingTemperature: "ColorSettingTemperature",
  ColorSettingRgb: "ColorSettingRgb",
  ColorSettingHsv: "ColorSettingHsv",
  Notifier: "Notifier",
  StartStop: "StartStop",
  Pause: "Pause",
  Dock: "Dock",
  TemperatureSetting: "TemperatureSetting",
  Thermometer: "Thermometer",
  HumiditySensor: "HumiditySensor",
  Camera: "Camera",
  VideoCamera: "VideoCamera",
  Lock: "Lock",
  PasswordStore: "PasswordStore",
  Authenticator: "Authenticator",
  Scene: "Scene",
  Entry: "Entry",
  EntrySensor: "EntrySensor",
  DeviceProvider: "DeviceProvider",
  Battery: "Battery",
  Refresh: "Refresh",
  MediaPlayer: "MediaPlayer",
  Online: "Online",
  SoftwareUpdate: "SoftwareUpdate",
  BufferConverter: "BufferConverter",
  Settings: "Settings",
  BinarySensor: "BinarySensor",
  IntrusionSensor: "IntrusionSensor",
  AudioSensor: "AudioSensor",
  MotionSensor: "MotionSensor",
  OccupancySensor: "OccupancySensor",
  FloodSensor: "FloodSensor",
  UltravioletSensor: "UltravioletSensor",
  LuminanceSensor: "LuminanceSensor",
  PositionSensor: "PositionSensor",
  MediaSource: "MediaSource",
  MessagingEndpoint: "MessagingEndpoint",
  OauthClient: "OauthClient",
  Android: "Android",
  HttpRequestHandler: "HttpRequestHandler",
  EndpointHandler: "EndpointHandler",
  EngineIOHandler: "EngineIOHandler",
  PushHandler: "PushHandler",
}

module.exports.ScryptedInterfaceDescriptors = {
  OnOff: {
      name: "OnOff",
      properties: [
        "on",
      ],
      methods: [
        "turnOff",
        "turnOn",
      ]
  },
  Brightness: {
      name: "Brightness",
      properties: [
        "brightness",
      ],
      methods: [
        "setBrightness",
      ]
  },
  ColorSettingTemperature: {
      name: "ColorSettingTemperature",
      properties: [
        "colorTemperature",
      ],
      methods: [
        "getTemperatureMaxK",
        "getTemperatureMinK",
        "setColorTemperature",
      ]
  },
  ColorSettingRgb: {
      name: "ColorSettingRgb",
      properties: [
        "rgb",
      ],
      methods: [
        "setRgb",
      ]
  },
  ColorSettingHsv: {
      name: "ColorSettingHsv",
      properties: [
        "hsv",
      ],
      methods: [
        "setHsv",
      ]
  },
  Notifier: {
      name: "Notifier",
      properties: [
      ],
      methods: [
        "sendNotification",
      ]
  },
  StartStop: {
      name: "StartStop",
      properties: [
        "running",
      ],
      methods: [
        "start",
        "stop",
      ]
  },
  Pause: {
      name: "Pause",
      properties: [
        "paused",
      ],
      methods: [
        "pause",
        "resume",
      ]
  },
  Dock: {
      name: "Dock",
      properties: [
        "docked",
      ],
      methods: [
        "dock",
      ]
  },
  TemperatureSetting: {
      name: "TemperatureSetting",
      properties: [
        "thermostatAvailableModes",
        "thermostatMode",
        "thermostatSetpoint",
        "thermostatSetpointHigh",
        "thermostatSetpointLow",
      ],
      methods: [
        "setThermostatMode",
        "setThermostatSetpoint",
        "setThermostatSetpointHigh",
        "setThermostatSetpointLow",
      ]
  },
  Thermometer: {
      name: "Thermometer",
      properties: [
        "temperature",
        "temperatureUnit",
      ],
      methods: [
      ]
  },
  HumiditySensor: {
      name: "HumiditySensor",
      properties: [
        "humidity",
      ],
      methods: [
      ]
  },
  Camera: {
      name: "Camera",
      properties: [
      ],
      methods: [
        "takePicture",
      ]
  },
  VideoCamera: {
      name: "VideoCamera",
      properties: [
      ],
      methods: [
        "getVideoStream",
      ]
  },
  Lock: {
      name: "Lock",
      properties: [
        "lockState",
      ],
      methods: [
        "lock",
        "unlock",
      ]
  },
  PasswordStore: {
      name: "PasswordStore",
      properties: [
      ],
      methods: [
        "addPassword",
        "getPasswords",
        "removePassword",
      ]
  },
  Authenticator: {
      name: "Authenticator",
      properties: [
      ],
      methods: [
        "checkPassword",
      ]
  },
  Scene: {
      name: "Scene",
      properties: [
      ],
      methods: [
        "activate",
        "deactivate",
        "isReversible",
      ]
  },
  Entry: {
      name: "Entry",
      properties: [
      ],
      methods: [
        "closeEntry",
        "openEntry",
      ]
  },
  EntrySensor: {
      name: "EntrySensor",
      properties: [
        "entryOpen",
      ],
      methods: [
      ]
  },
  DeviceProvider: {
      name: "DeviceProvider",
      properties: [
      ],
      methods: [
        "discoverDevices",
        "getDevice",
      ]
  },
  Battery: {
      name: "Battery",
      properties: [
        "batteryLevel",
      ],
      methods: [
      ]
  },
  Refresh: {
      name: "Refresh",
      properties: [
      ],
      methods: [
        "getRefreshFrequency",
        "refresh",
      ]
  },
  MediaPlayer: {
      name: "MediaPlayer",
      properties: [
      ],
      methods: [
        "getMediaStatus",
        "load",
        "seek",
        "skipNext",
        "skipPrevious",
      ]
  },
  Online: {
      name: "Online",
      properties: [
        "online",
      ],
      methods: [
      ]
  },
  SoftwareUpdate: {
      name: "SoftwareUpdate",
      properties: [
        "updateAvailable",
      ],
      methods: [
        "checkForUpdate",
        "installUpdate",
      ]
  },
  BufferConverter: {
      name: "BufferConverter",
      properties: [
        "fromMimeType",
        "toMimeType",
      ],
      methods: [
        "convert",
      ]
  },
  Settings: {
      name: "Settings",
      properties: [
      ],
      methods: [
        "getSettings",
        "putSetting",
      ]
  },
  BinarySensor: {
      name: "BinarySensor",
      properties: [
        "binaryState",
      ],
      methods: [
      ]
  },
  IntrusionSensor: {
      name: "IntrusionSensor",
      properties: [
        "intrusionDetected",
      ],
      methods: [
      ]
  },
  AudioSensor: {
      name: "AudioSensor",
      properties: [
      ],
      methods: [
      ]
  },
  MotionSensor: {
      name: "MotionSensor",
      properties: [
        "motionDetected",
      ],
      methods: [
      ]
  },
  OccupancySensor: {
      name: "OccupancySensor",
      properties: [
        "occupied",
      ],
      methods: [
      ]
  },
  FloodSensor: {
      name: "FloodSensor",
      properties: [
        "flooded",
      ],
      methods: [
      ]
  },
  UltravioletSensor: {
      name: "UltravioletSensor",
      properties: [
        "ultraviolet",
      ],
      methods: [
      ]
  },
  LuminanceSensor: {
      name: "LuminanceSensor",
      properties: [
        "luminance",
      ],
      methods: [
      ]
  },
  PositionSensor: {
      name: "PositionSensor",
      properties: [
        "position",
      ],
      methods: [
      ]
  },
  MediaSource: {
      name: "MediaSource",
      properties: [
      ],
      methods: [
        "getMedia",
      ]
  },
  MessagingEndpoint: {
      name: "MessagingEndpoint",
      properties: [
      ],
      methods: [
      ]
  },
  OauthClient: {
      name: "OauthClient",
      properties: [
      ],
      methods: [
        "getOauthUrl",
        "onOauthCallback",
      ]
  },
  Android: {
      name: "Android",
      properties: [
      ],
      methods: [
        "newIntent",
        "sendBroadcast",
        "startActivity",
        "startService",
      ]
  },
  HttpRequestHandler: {
      name: "HttpRequestHandler",
      properties: [
      ],
      methods: [
        "onRequest",
      ]
  },
  EndpointHandler: {
      name: "EndpointHandler",
      properties: [
      ],
      methods: [
        "getEndpoint",
      ]
  },
  EngineIOHandler: {
      name: "EngineIOHandler",
      properties: [
      ],
      methods: [
        "onConnection",
      ]
  },
  PushHandler: {
      name: "PushHandler",
      properties: [
      ],
      methods: [
        "onPush",
      ]
  },
}