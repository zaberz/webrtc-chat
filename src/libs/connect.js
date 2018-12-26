import 'webrtc-adapter';
import * as io from 'socket.io-client';
import MediaDevices from './getMedias';

// let socket = io.connect('localhost:10000');
// let socket = io.connect('https://qqq.meipai.com:10001');

// let socket = io.connect('localhost:10000');

let socket = io.connect('https://zzz.lizimeow.cn')

class RTCConnectionHandler {
    constructor() {
        if (!window.RTCPeerConnection) {
            alert('系统不支持webrtc');
            throw new Error('系统不支持webrtc');
        }

        // let peerConn = this.peerConn = new RTCPeerConnection({
        //     iceServers: [
        //         {'url': 'stun:stun1.l.google.com:19302'},
        //         {
        //             'url': 'turn:zzz.lizimeow.cn',
        //             'username': 'zj',
        //             'credential': 'z111111',
        //         },
        //     ],
        // });
        // this.initEvent(peerConn);
        this.initPeerCoon();
        this.initSocketEvent();
        this.mediaDevices = MediaDevices;
        this.debugObj = {};
    }

    initPeerCoon() {
        let peerConn = this.peerConn = new RTCPeerConnection({
            iceServers: [
                {'url': 'stun:stun1.l.google.com:19302'},
                {
                    'url': 'turn:zzz.lizimeow.cn',
                    'username': 'zj',
                    'credential': 'z111111',
                },
            ],
        });
        let stream = this.mediaStream;
        if (stream && !stream.errorCode) {
            this.peerConn.addStream(stream);
        }
        this.initEvent(peerConn);
    }

    getMedia(config) {
        return this.mediaDevices.getUserMedia(config).then(stream => {
            this.mediaStream = stream;
            return stream;
        });
    }

    connectRoom(room) {
        socket.emit('createOrJoin', room);
    }

    initEvent(conn) {
        conn.onicecandidate = event => {
            // if (event.type === 'icecandidate') {
            //     let candidate = event.candidate;
            //     if (candidate) {
            // let msg = `address:${candidate.address},ip: ${candidate.ip},protocol:${candidate.protocol},port:${candidate.port},sdpMid:${candidate.sdpMid};`;
            // this.debugObj.localMsg.push(msg);
            // this.debugObj.localMsg.push(candidate.candidate);
            // }
            // }
            if (event.candidate) {
                let msg = {
                    type: 'candidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                };
                this.sendMsgToConnectServer(msg);

            }
        };
        conn.onaddstream = e => {
            console.log(e);
            if (typeof this.onAddStream === 'function') {
                this.onAddStream(e.stream);
            }
        };
        conn.ondatachannel = e => {
            this.initChannelEvent(e.channel);
        };
    }

    initChannelEvent(channel) {
        channel.onopen = (e) => {
            console.log('open');
            console.log(e);
        };
        channel.onmessage = (msg) => {
            if (typeof this.onMessage === 'function') {
                this.onMessage(msg);
            }
        };
        channel.onclose = e => {
            console.log(e);
        };
    }

    initSocketEvent() {
        socket.on('create', (room) => {
            console.log(`create ${room}`);
        });
        socket.on('guestJoin', async (e) => {
            console.log('guestJoin');
            this.initPeerCoon();
            let offer = await this.createOffer();
            socket.emit('getOffer', offer);
        });
        socket.on('getOffer', async (offer) => {
            console.log('getoffer');
            this.initPeerCoon();
            await this.getOffer(offer);
            let answer = await this.createAnswer();
            socket.emit('getAnswer', answer);
        });
        socket.on('getAnswer', async (answer) => {
            console.log('getanswer');
            await this.getAnswer(answer);
        });

        socket.on('message', (msg) => {
            if (msg.type = 'candidate') {
                let candidate = msg.candidate;
                // this.debugObj.remoteMsg.push(candidate);
                this.addIceCandidate(new RTCIceCandidate({candidate: msg.candidate})).then(res => {
                    console.log(`addicecandate success ${res}`);
                }, error => {
                    console.error(`addicecandate fail ${error}`);
                });
            }
        });
        socket.on('full', (msg) => {
            alert('房间已满');
            location.href = '/';
        });
        socket.on('getAvailableRooms', (rooms) => {
            if (typeof this.onGetAvailableRooms === 'function') {
                this.onGetAvailableRooms(rooms);
            }
        });
    }

    async createOffer() {
        return await this.peerConn.createOffer().then(offer => {
            this.peerConn.setLocalDescription(offer);
            return this.peerConn.localDescription;
        }, (err) => {
            alert(`create offer error:${err}`);
        });
    }

    async getOffer(offer) {
        return await this.peerConn.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
        }, (err) => {
            alert(`setRemoteDesc error: ${err}`);
        });
    }

    async createAnswer() {
        return await this.peerConn.createAnswer().then(answer => {
            this.peerConn.setLocalDescription(new RTCSessionDescription(answer));
            return this.peerConn.localDescription;
        }, (err) => {
            alert(`create answer erro : ${err}`);
        });
    }

    getAnswer(answer) {
        return this.peerConn.setRemoteDescription(new RTCSessionDescription(answer)).then(() => {
        }, (err) => {
            alert(`set remote answer error :${err}`);
        });
    }

    sendMsgToConnectServer(msg) {
        socket.emit('message', msg);
    }

    addIceCandidate(candidate) {
        return this.peerConn.addIceCandidate(candidate);
    }

    sendMsg(msg) {
        this.sendChannel.send(msg);
    }

    getAvailableRooms() {
        socket.emit('getAvailableRooms');
    }

    debug(obj) {
        this.debugObj = obj;
    }
}

export default new RTCConnectionHandler();
// export default RTCConnectionHandler;
