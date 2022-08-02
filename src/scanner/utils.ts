export const getPath = (config: any) => {
  return Array.isArray(config)
    ? "{" + config.join(",") + "}"
    : typeof config === "string"
    ? config
    : "";
};

export const showProgress = (
  icon: any,
  msg: any,
  tooltip: any,
  window: any
) => {
  if (window.statusBarItem) {
    window.statusBarItem.text = `${icon} ${msg}` || "";
    if (tooltip) {
      window.statusBarItem.tooltip = tooltip;
    }
    window.statusBarItem.show();
  }
};

export const errorHandler = (err: any, window: any) => {
  window.processing = true;
  showProgress("", "", "", window);
};

export const calculateProgress = (filesScanned: number, totalFiles: number) => {
  return Math.floor((filesScanned / totalFiles) * 100);
};
