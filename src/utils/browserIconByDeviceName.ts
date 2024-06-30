import deviceBrowserIcons, {
  defaultIcon,
} from 'src/views/pages/account-settings/datas/devices'

export function getBrowserIconByDeviceName(deviceName: string) {
  const device = deviceBrowserIcons.find((d) => d.deviceName === deviceName)
  return device ? device.browserIcon : defaultIcon[0].icon
}
