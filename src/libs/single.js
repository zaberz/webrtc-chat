import './adapter';

let localConn = new RTCPeerConnection();
let remoteConn = new RTCPeerConnection();

navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
}).then(stream => {
    localstream = stream;
    let videoElm = document.getElementById('video');
    videoElm.srcObject = stream;
    localConn.addStream(localstream);
}).then(() => {
    // connect
    localConn.createOffer().then(offer => {
//     console.log(offer);
        localConn.setLocalDescription(offer).then(() => {
            let a = localConn.localDescription;
            a = JSON.stringify(a);
            a = JSON.parse(a);
            remoteConn.setRemoteDescription(new RTCSessionDescription(a)).then((success) => {
                remoteConn.createAnswer().then(answer => {
                    remoteConn.setLocalDescription(answer);
                    localConn.setRemoteDescription(JSON.parse(JSON.stringify(answer)));
                });
            }, error => {
                console.log(error);
            });
        });
//
    });
});

let sendChannel = localConn.createDataChannel('send');
let receiveChannel = remoteConn.createDataChannel('receive');

localConn.onicecandidate = (e) => {
    if (e.candidate) {
        remoteConn.addIceCandidate(new RTCIceCandidate(e.candidate));
    }
};
remoteConn.onicecandidate = (e) => {
    if (e.candidate) {
        localConn.addIceCandidate(new RTCIceCandidate(e.candidate));
    }
};
localConn.ondatachannel = e => {
    console.log(e);
    let channel = e.channel;
    channel.onopen = (e) => {
        console.log('onopen-local');
    };
    channel.onmessage = (e) => {
        console.log('onmessage-local');
        console.log(e.data);
        // sendChannel.send('reply msg');
    };
    // sendChannel.send('send msg');
};
remoteConn.ondatachannel = e => {
    let channel = e.channel;

    channel.onopen = (e) => {
        console.log('onopen-rem');
    };
    channel.onmessage = (e) => {
        console.log('onmessage-rem');
        console.log(e);
        setTimeout(() => {
            receiveChannel.send('receive msg');
        }, 2000);
    };
};

setTimeout(() => {
    console.log(localConn);
    console.log(remoteConn);
    console.log(localConn.localDescription);
}, 2000);

let localstream;
localConn.onaddstream = e => {
    console.log('onaddstream');
    console.log(e);
};
remoteConn.onaddstream = e => {
    console.log('onaddstream-remote');
    console.log(e);
    let remoteVideoElm = document.getElementById('remotevideo');
    remoteVideoElm.srcObject = e.stream;
};