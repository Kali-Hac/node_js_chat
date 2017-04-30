var flag=0;
		$(window).load(function() {
		  var tl = new TimelineMax({
		      paused: true
		    }),
		    tlback = new TimelineMax({
		      paused: true
		    }),
		    intro = new TimelineMax();

		  intro
		    .from('.phone', 1, {
		      autoAlpha: 0
		    })
		    .from('.hello', 0.5, {
		      autoAlpha: 0
		    }, 0.5)

		  tl
		    .to('.hello', 0.3, {
		      autoAlpha: 0
		    })
		    .set('.home', {
		      className: '+=active'
		    })
		    .set('.item', {
		      scale: 1
		    }) // fix for a bug when on of the item was appearing at 0.5 scale
		    .to('.home', 0.1, {
		      scale: 1.2,
		      yoyo: true,
		      repeat: 1
		    })
		    .to('.home', 0.3, {
		      x: 20,
		      y: 20,
		      ease: Elastic.easeOut.config(1, 0.5)
		    }, 0)
		    .staggerFrom('.item', 0.7, {
		      left: 20,
		      top: 20,
		      autoAlpha: 0,
		      scale: 0.5,
		      ease: Elastic.easeOut.config(1, 0.5)
		    }, 0.1);

		  tlback
		    .set('.home', {
		      className: '-=active'
		    })
		    .staggerTo('.item', 0.7, {
		      left: 20,
		      top: 20,
		      autoAlpha: 0,
		      scale: 0.5,
		      ease: Elastic.easeOut.config(1, 0.5)
		    }, 0.1)
		    .to('.hello', 0.3, {
		      autoAlpha: 1
		    })
		    .to('.home', 0.3, {
		      x: 0,
		      y: 0,
		      ease: Power2.easeOut
		    }, 0.5);
				var a=document.getElementById('a');
				var b=document.getElementById('b');
				var c=document.getElementById('c');
				var f=document.getElementById('form');
				var msg=document.getElementById('messages');
				var music=document.getElementById('music');
		  $(document).on('click', '.home:not(.active)', function(e) {
		    event.preventDefault();
		    tl.play(0);
				a.style.display='block';
				b.style.display='block';
				c.style.display='block';
				f.style.display='none';
				msg.style.display='none';
				music.style.display='none';
				var songs=document.getElementById('songs');
				var jm=document.getElementById('jm');
				var js=document.getElementById('js');
			songs.style.display='none';
			jm.style.display='none';
			js.style.display='none';
		  });

		  $(document).on('click', '.home.active, .item', function(e) {
		    event.preventDefault();
		    TweenMax.to($(this), 0.1, {
		      scale: 1.2,
		      yoyo: true,
		      repeat: 1,
		      onComplete: function() {
		        tlback.play(0)
		      }
		    });
				a.style.display='none';
				b.style.display='none';
				c.style.display='none';
				if(flag!==1){
				f.style.display='block';
				msg.style.display='block';
			}
		  });
		});
function mc(){
			flag=1;
			form_hide_or_not(1);
			var music=document.getElementById('music');
			music.style.display='block';
			var songs=document.getElementById('songs');
			songs.style.display='block';
		}
		function clean(){
			flag=0;
			var lis=document.getElementById('messages');
			while(lis.children.length){
				lis.removeChild(lis.children[0]);}
			form_hide_or_not(0);
			}
		function hf(){
			flag=0;
			form_hide_or_not(0);
		}
		function gr(){
			flag=1;
			form_hide_or_not(1);
			var posi=document.getElementById('jm');
			var ks=document.getElementById('ks');
			var js=document.getElementById('js');
			posi.innerHTML="<input type='text' maxlength='16'  id='password' /><button class='button button-glow button-border button-rounded button-primary' onclick='jmcg(1)'>加密√</button><br/><br/>输入要解密的内容：<textarea id='2decode'></textarea><br/><br/>输入对方秘钥：<input type='text'  id='other_key' /><br/><p style='text-align: center;'><button class='button button-3d button-primary button-rounded' onclick='decode()'>开始解译转换</button></p><h2 style='text-align:center' id='encoded'></h2>";
			js.innerHTML="本功能还在开发(暂用于测试):<br/>采用Aes-128-cdc加密<br/>请在下面输入你的密码(不超过16位):"
			js.style.display='block';
			posi.style.display='block';
		}
		function jmcg(flag){
			var posi=document.getElementById('jm');
			var js=document.getElementById('js');
		if(flag===1){
			js.style.color='red';
			jm_or_not(1);
			posi.innerHTML="<input type='text' maxlength='16'  id='password' value='可以直接按右边解密'/><button class='button button-glow button-border button-rounded button-primary' onclick='jmcg(0)'>解密×</button><br/><br/>输入要解密的内容：<textarea id='2decode'></textarea><br/><br/>输入对方秘钥：<input type='text'  id='other_key' /><br/><p style='text-align: center;'><button class='button button-3d button-primary button-rounded' onclick='decode()'>开始解译转换</button></p><h2 style='text-align:center' id='encoded'></h2>";
			js.innerHTML="加密成功!信息将编码后发送<br/>对方需要秘钥才能解译内容<br/>可以重新输入密码解除加密:"
}
 			else{
 				js.style.color='black';
			jm_or_not(0);
			posi.innerHTML="<input type='text' maxlength='16'  id='password' /><button class='button button-glow button-border button-rounded button-primary' onclick='jmcg(1)'>加密√</button><br/><br/>输入要解密的内容：<textarea id='2decode'></textarea><br/><br/>输入对方秘钥：<input type='text'  id='other_key' /><br/><p style='text-align: center;'><button class='button button-3d button-primary button-rounded' onclick='decode()'>开始解译转换</button></p><h2 style='text-align:center' id='encoded'></h2>";
 			js.innerHTML="本功能还在开发(暂用于测试):<br/>采用Aes-128-cdc加密<br/>请在下面输入你的密码(不超过16位):";
 			}
		}
			function form_hide_or_not(s){
					var msg=document.getElementById('messages');
			var f=document.getElementById('form');
			if(s===1){
			msg.style.display='none';
			f.style.display='none';}
 			else{
 				msg.style.display='block';
			f.style.display='block';
 			}
			}