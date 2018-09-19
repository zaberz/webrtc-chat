import './adapter';
import * as io from 'socket.io-client';

// let socket = io.connect('http://localhost:10000');
// let socket = io.connect('https://qqq.meipai.com:10001');

// let socket = io.connect('https://localhost:10001');
let socket = io.connect();

class RTCConnectionHandler {
    constructor(stream) {
        let peerConn = this.peerConn = new RTCPeerConnection();
        let sendChannel = this.sendChannel = peerConn.createDataChannel(+new Date());
        if (stream) {
            peerConn.addStream(stream);
        }
        this.initEvent(peerConn);
    }

    initEvent(conn) {
        conn.onicecandidate = event => {
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

    async createOffer() {
        console.log('createoffer');
        return await this.peerConn.createOffer().then(offer => {
            this.peerConn.setLocalDescription(offer);
            return this.peerConn.localDescription;
        });
    }

    async getOffer(offer) {
        console.log('getoffer');
        return await this.peerConn.setRemoteDescription(new RTCSessionDescription(offer));
    }

    async createAnswer() {
        console.log('createranswer');
        return await this.peerConn.createAnswer().then(answer => {
            this.peerConn.setLocalDescription(new RTCSessionDescription(answer));
            return this.peerConn.localDescription;
        });
    }

    getAnswer(answer) {
        console.log('getanswer');
        return this.peerConn.setRemoteDescription(new RTCSessionDescription(answer));
    }

    sendMsgToConnectServer(msg) {
        socket.emit('message', msg);
    }

    addIceCandidate(candidate) {
        this.peerConn.addIceCandidate(candidate);
    }

    sendMsg(msg) {
        this.sendChannel.send(msg);
    }

    joinRoom(room, stream) {
        console.log(room);
        console.log(stream);
        if (stream) {
            console.log(1);
            this.peerConn.addStream(stream);
            socket.emit('createOrJoin', room);
            console.log(2);
        }
    }
}

let stream = false;
let handler = new RTCConnectionHandler(stream);
socket.on('create', (room) => {
    console.log(`create ${room}`);
});
console.log(socket);
socket.on('guestJoin', async (e) => {
    console.log('join');
    let offer = await handler.createOffer();
    socket.emit('getOffer', offer);
});
socket.on('getOffer', async (offer) => {
    await handler.getOffer(offer);
    let answer = await handler.createAnswer();
    socket.emit('getAnswer', answer);
});
socket.on('getAnswer', async (answer) => {
    await handler.getAnswer(answer);
    console.log(handler);
});

socket.on('message', (msg) => {
    console.log('onmessage');
    console.log(msg);
    if (msg.type = 'candidate') {
        handler.addIceCandidate(new RTCIceCandidate({candidate: msg.candidate}));
    }
});

setTimeout(() => {
    console.error(handler);
}, 3000);

export default handler;