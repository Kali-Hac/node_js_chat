var express = require('express');
var sio = require('socket.io');
app = express.createServer(
    express.static('public'),
    express.bodyParser()
);
app.listen(3000);
var io = sio.listen(app);
var cnt = 0,
    dj, currentsong = '28481103';

function elect(socket) {
    dj = socket;
    io.sockets.emit('annoucement', socket.nickname + ' is the new dj');
    socket.emit('elected');
    socket.dj = true;
    socket.on('disconnect', function () {
        dj = null;
        io.sockets.emit('annoucement', 'the dj left - next one to join becomes dj');
    });
}
io.sockets.on('connection', function (socket) {
    console.log('someone connected');
    if (!socket.flag) {
        socket.emit('text', '系统', '欢迎进入Hac聊天室v2.0~ \n目前支持的功能有：1.(聊天)信息加密传输/2.获取秘钥解密/3.管理员点歌广播');
        // 目前支持的功能有：1.(聊天)信息加密传输/2.获取秘钥解密/3.管理员点歌广播
        socket.emit('text', '系统', '当前在线聊天的人数为：' + cnt);
        if (dj) {
            socket.emit('text', '系统', '可以广播音乐的是：' + dj.nickname);
        }
    }
    socket.flag = true;
    socket.on('join', function (name) {
        socket.nickname = name;
        cnt++;
        if (!dj) {
            elect(socket);
        } else {
            socket.emit('song', currentsong);
        }
        socket.broadcast.emit('announcement', name + ' joined the chat.');
    });
    socket.on('text', function (msg) {
        socket.broadcast.emit('text', socket.nickname, msg);
    });
    socket.on('disconnect', function () {
        cnt--;
        socket.dj = false;
        dj = null;
    });
    socket.on('song', function (id) {
        if (socket.dj) {
            currentsong = id;
            socket.broadcast.emit('song', id);
        } else {
            socket.emit('text', '系统', '当前管理电台的用户是：' + dj.nickname + '\n您暂时只能本地点歌播放');
        }
    });
});