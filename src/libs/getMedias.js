import 'webrtc-adapter';

/*
let config = {
    audio: false,
    video: false,
    video: {
        width: 1280,
        height: 720,
    },
    // 当请求包含一个ideal（应用最理想的）值时，这个值有着更高的权重，意味着浏览器会先尝试找到最接近指定的理想值的设定或者摄像头（如果设备拥有不止一个摄像头）。
    video: {
        width: {min: 1024, ideal: 1280, max: 1920},
        height: {min: 776, ideal: 720, max: 1080},
    },
    video: {facingMode: 'user'},
    video: {facingMode: {exact: 'environment'}},
};*/
class MediaDevices {
    getUserMedia(constraints) {
        let defaultCOnstraints = {
            audio: true,
            video: true,
        };
        constraints = Object.assign({}, defaultCOnstraints, constraints);
        return navigator.mediaDevices.getUserMedia(constraints).catch(e => {
            return this.errorHandler(e);
        });
    }

    errorHandler(e) {
        /*e = {
            code: ,
            message: ,
            name: ,
        }*/
        switch (e.name) {
            case 'AbortError' :
                // 尽管用户和操作系统都授予了访问设备硬件的权利，而且未出现可能抛出NotReadableError异常的硬件问题，但仍然有一些问题的出现导致了设备无法被使用。
                break;
            case 'NotAllowedError' :
                // 用户拒绝了当前的浏览器实例的访问请求；或者用户拒绝了当前会话的访问；或者用户在全局范围内拒绝了所有媒体访问请求。
                break;
            case 'NotFoundError' :
                // 找不到满足请求参数的媒体类型。
                break;
            case 'NotReadableError':
                // 尽管用户已经授权使用相应的设备，操作系统上某个硬件、浏览器或者网页层面发生的错误导致设备无法被访问。
                break;
            case 'OverConstrainedError':
                // 指定的要求无法被设备满足，此异常是一个类型为OverconstrainedError的对象，拥有一个constraint属性，这个属性包含了当前无法被满足的constraint对象，还拥有一个message属性，包含了阅读友好的字符串用来说明情况。
                break;
            case 'SecurityError':
                // 在getUserMedia() 被调用的 Document 上面，使用设备媒体被禁止。这个机制是否开启或者关闭取决于单个用户的偏好设置。
                break;
            case 'TypeError':
                // constraints对象未设置［空］，或者都被设置为false。
                break;
        }
        console.log(e);
        return {
            errorCode: e.code,
            errorMsg: e.name,
        };
    }
}

export default new MediaDevices();