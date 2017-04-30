   var sig_flag = 0;
   var current_song, key, default_key = '751f621ea5c8f930';
   var me;
   var dj_flag = false;
   var jm_flag = false;

   function play(id) {
       var music = document.getElementById('music');
       music.innerHTML = "<iframe frameborder='no' border='0' marginwidth='0' marginheight='0' width='330' height='86' src='//music.163.com/outchain/player?type=2&amp;id=" + id + "&amp;auto=1&amp;height=66'></iframe>";
       if (dj_flag) {
           current_song = id;
           if (sig_flag === 0) {
               sig_flag = 1;
           }
       }
   }

   function jm_or_not(jm) {
       if (jm) {
           jm_flag = true;
           var yourkey = document.getElementById('password').value;
           key = yourkey;
       } else {
           key = null;
           jm_flag = false;
       }
   }

   function encrypt(mykey, word) {
       mykey = mykey + default_key.substring(mykey.length);
       var key = CryptoJS.enc.Utf8.parse(mykey); //16位
       var iv = CryptoJS.enc.Utf8.parse("5683022032017429");
       var encrypted = '';
       if (typeof (word) == 'string') {
           var srcs = CryptoJS.enc.Utf8.parse(word);
           encrypted = CryptoJS.AES.encrypt(srcs, key, {
               iv: iv,
               mode: CryptoJS.mode.CBC,
               padding: CryptoJS.pad.Pkcs7
           });
       } else if (typeof (word) == 'object') { //对象格式的转成json字符串
           data = JSON.stringify(word);
           var srcs = CryptoJS.enc.Utf8.parse(data);
           encrypted = CryptoJS.AES.encrypt(srcs, key, {
               iv: iv,
               mode: CryptoJS.mode.CBC,
               padding: CryptoJS.pad.Pkcs7
           })
       }
       return encrypted.ciphertext.toString();
   }
   // aes解密
   function decrypt(other_key, word) {
       other_key = other_key + default_key.substring(other_key.length);
       var key = CryptoJS.enc.Utf8.parse(other_key);
       var iv = CryptoJS.enc.Utf8.parse("5683022032017429");
       var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
       var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
       var decrypt = CryptoJS.AES.decrypt(srcs, key, {
           iv: iv,
           mode: CryptoJS.mode.CBC,
           padding: CryptoJS.pad.Pkcs7
       });
       var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
       return decryptedStr.toString();
   }

   function decode() {
       var deco_content = document.getElementById('2decode').value;
       var other_key = document.getElementById('other_key').value;
       var encoded = document.getElementById('encoded');
       console.log(deco_content);
       var test = decrypt(other_key, deco_content);
       console.log(test);
       encoded.innerHTML = decrypt(other_key, deco_content);

   }
   window.onload = function () {
       var socket = io.connect();
       me = socket;
       socket.on('elected', function () {
           dj_flag = true;
       });
       socket.on('connect', function () {
           var name = prompt('What is your nickname?');
           var currentnum = 0;
           socket.emit('join', name);
           document.getElementById('me').innerHTML = "Your Name:&nbsp;" + name;
           console.log('jinle');
           document.getElementById('chat').style.display = 'block';
           console.log('?');
           var songs = document.getElementById('songs');
           var music = document.getElementById('music');
           songs.innerHTML = "<li>你给我听好   -陈奕迅<a href='#'' onclick='play(28481103)'>&nbsp;select √</a></li><li>陪你度过漫长岁月   -陈奕迅<a href='#' onclick='play(35403523)'>&nbsp;select √</a>　</li><li>红玫瑰   -陈奕迅<a href='#' onclick='play(65126)'>&nbsp;select √</a></li><li>好久不见   -陈奕迅<a href='#' onclick='play(65538)'>&nbsp;select √</a></li><li>苦瓜   -陈奕迅<a href='#' onclick='play(64293)'>&nbsp;select √</a></li><li>可以了   -陈奕迅<a href='#' onclick='play(28481818)'>&nbsp;select √</a></li><li>富士山下   -陈奕迅<a href='#' onclick='play(65766)'>&nbsp;select √</a></li><li>不要说话   -陈奕迅<a href='#' onclick='play(25906124)'>&nbsp;select √</a></li><li>淘汰   -陈奕迅<a href='#' onclick='play(65528)'>&nbsp;select √</a></li><li>阴天快乐   -陈奕迅<a href='#' onclick='play(28563317)'>&nbsp;select √</a></li><li>夕阳无限好   -陈奕迅<a href='#' onclick='play(66272)'>&nbsp;select √</a></li><li>因为爱情   -陈奕迅<a href='#' onclick='play(64317)'>&nbsp;select √</a></li><li>孤独患者   -陈奕迅<a href='#' onclick='play(64093)'>&nbsp;select √</a></li><li>稳稳的幸福   -陈奕迅<a href='#' onclick='play(25730757)'>&nbsp;select √</a></li><li>最佳损友   -陈奕迅<a href='#' onclick='play(65800)'>&nbsp;select √</a></li><li>约定   -陈奕迅<a href='#' onclick='play(64443)'>&nbsp;select √</a></li>";
           if (socket.dj) {
               dj_flag = true;
           }
           socket.on('announcement', function (msg) {
               var li = document.createElement('li');
               li.className = 'announcement';
               li.innerHTML = msg;
               document.getElementById('messages').appendChild(li);
           });
           socket.on('song', play);
       });

       function addMessage(from, text) {
           var lis = document.getElementById('messages');
           if (lis.children.length < 12) {
               var li = document.createElement('li');
               li.className = 'message';
               li.innerHTML = '<b>' + from + '</b>: ' + text;
               document.getElementById('messages').appendChild(li);
           } else {
               for (var i = 0; i < 11; i++) {
                   lis.children[i].innerHTML = lis.children[i + 1].innerHTML;
               }
               lis.children[11].innerHTML = '<b>' + from + '</b>: ' + text;
           }
           if (sig_flag === 1 && current_song) {
               sig_flag = 0;
               socket.emit('song', current_song);
           }
           console.log(text);
       }
       var input = document.getElementById('input');
       document.getElementById('form').onsubmit = function () {
           addMessage('me', input.value);
           if (jm_flag) {
               socket.emit('text', encrypt(key, input.value));
           } else {
               socket.emit('text', input.value);
           }
           input.value = '';
           input.focus();
           return false;
       }

       socket.on('text', addMessage);
   }