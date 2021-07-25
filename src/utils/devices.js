export const enumerateDevices = async () => {
    const enumerateDevices = navigator.enumerateDevices || (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) ||
        (window.MediaStreamTrack && window.MediaStreamTrack.getSources) || null
    let videoNum = 0;
    let microphoneNum = 0;
    const deviceList = [];
    
    try {
        const devices = await enumerateDevices();
        devices.forEach(device => {
            deviceList.push(device);
            if (device.kind === 'videoinput') videoNum++;
            if (device.kind === 'audioinput') microphoneNum++;
        });  
    } catch (error) {
    }

    console.info(`***********devices size=${deviceList.length} videoNum=${videoNum} microphoneNum=${microphoneNum}***************`)

    return [deviceList, videoNum, microphoneNum]
}

//访问用户媒体设备的兼容方法
export const getUserMedia = async (constrains) => {
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
    } catch (error) {
    }

    return result;
}