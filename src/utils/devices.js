export const enumerateDevices = async () => {
  let target = null;
  let enumerateDevices = null;
  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    target = navigator.mediaDevices;
    enumerateDevices = navigator.mediaDevices.enumerateDevices;
  } else if (navigator.enumerateDevices) {
    target = navigator;
    enumerateDevices = navigator.enumerateDevices;
  } else if (window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
    target = window.MediaStreamTrack;
    enumerateDevices = window.MediaStreamTrack.getSources;
  }
  let videoNum = 0;
  let microphoneNum = 0;
  const deviceList = [];
  if (enumerateDevices) {
    try {
      const devices = await enumerateDevices.call(target);
      devices.forEach(device => {
        deviceList.push(device);
        if (device.kind === 'videoinput') videoNum++;
        if (device.kind === 'audioinput') microphoneNum++;
      });
    } catch (error) {}
  }

  console.info(`***********devices size=${deviceList.length} videoNum=${videoNum} microphoneNum=${microphoneNum}***************`);

  return [deviceList, videoNum, microphoneNum];
};

//访问用户媒体设备的兼容方法
export const getUserMedia = async constrains => {
  let result = null;
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      //最新标准API
      result = await navigator.mediaDevices.getUserMedia(constrains);
    } else if (navigator.webkitGetUserMedia) {
      //webkit内核浏览器
      result = await navigator.webkitGetUserMedia(constrains);
    } else if (navigator.mozGetUserMedia) {
      //Firefox浏览器
      result = await navagator.mozGetUserMedia(constrains);
    } else if (navigator.getUserMedia) {
      //旧版API
      result = await navigator.getUserMedia(constrains);
    }
  } catch (error) {}
  return result;
};
