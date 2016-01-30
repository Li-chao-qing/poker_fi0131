window.onload=function(){



var jia=document.getElementById('jia'); 

setTimeout(function(){
	jia.style.display='none';

},1000);
var scene=document.getElementById('scene'); 
var el,hang;
//事件委托

// dom方式
//金字塔28个
document.onmousedown=function(e){
	e.preventDefault();
};

//画金字塔
var fnjinzita1=function(){
	for(var i=0;i<7;i++){
		for(var j=0;j<i+1;j++){
			el=document.createElement('div');
			scene.appendChild(el);
			el.setAttribute('class','block');
			el.setAttribute('id',i+'-'+j);
			el.style.left=(6-i)*67+j*134+'px';
			el.style.top=i*40+'px';
		}

	}
};
fnjinzita1();
//左边24个
var fanpai=document.getElementById('fanpai'),odd,
    refan=document.getElementById('refan');
for(var i=0;i<24;i++){
	odd=document.createElement('div');
	odd.setAttribute('class','block');
	odd.style.left='0';
	odd.style.top='0';
	fanpai.appendChild(odd);

}

//点击时的变化
var above=document.getElementById('above');
var below=document.getElementById('below');
var jishu=0;

// 写一个函数生成一副乱序的扑克牌

var dic={1:'A',2:'2',3:'3',4:'4',5:'5',
		6:'6',7:'7',8:'8',9:'9',10:'10',
		11:'J',12:'Q',13:'K'
	};
var hs=['hong','hei','fang','mei'];
var pai=function(){
	var poker=[];

	var zidian={};
	while(poker.length!==52){
	
		var rehs=hs[Math.floor(Math.random()*4)];
		var num=dic[1+Math.floor(Math.random()*13)];
		if(!zidian[rehs+num]){
			poker.push({huase:rehs,number:num});
			zidian[rehs+num]=true; 	
		}
	}
	return poker;
};

var poker=pai();

//给每个block加背景
var els=document.getElementsByClassName('block');

for(var i=0;i<52;i++){
	els[i].innerHTML=poker[i].number;
	els[i].style.backgroundImage='url(./images/'+poker[i].number+'_'+poker[i].huase+'.png)';
	
}
//第一个数，第二个数，前一个
var previous=null;
var diyi,dier;

above.onclick=function(){
	
	if(fanpai.lastElementChild==null){return;}
	diyi=0,dier=0;
	refan.appendChild(fanpai.lastElementChild);
	if(previous!==null){
		previous.style.border='none';
	}
	previous=null;	
};

below.onclick=function(){
	if(fanpai.children.length==0){
		diyi=0,dier=0;
		if(previous!=null){
			previous.style.border='none';
		}	
		previous=null;
		if(jishu==3){return;}
		var cccc=refan.children.length;
		for(var i=0;i<cccc;i++){
			fanpai.appendChild(refan.lastElementChild);
		}
		jishu++;
	}
}

var whochildren=function(chi){
	if(chi.parentElement.getAttribute('id')=='scene'){
			scene.removeChild(chi);
	}
	else if(chi.parentElement.getAttribute('id')=='fanpai'){
		fanpai.removeChild(chi);
	}
	else if(chi.parentElement.getAttribute('id')=='refan'){
		refan.removeChild(chi);
	}
};

var zhi=function(shu,el){
	if(shu=='A'){shu=1;}
	else if(shu=='J'){shu=11;}
	else if(shu=='Q'){shu=12;}
	else if(shu=='K'){shu=0;previous=null;
		whochildren(el);return shu;
	}
	else{
		
		shu=Number(shu);
	}
	return shu;
};
scene.onclick=function(e){
	var el=e.target;
	if(el==this){
		return;
	}
	if(el==above||el==below||el==fanpai||el==refan){return;}
	//判断他下面有没有拍，有的话下面的点不到
	if(el.hasAttribute('id')){
		var id=el.getAttribute('id');
	
		var x=Number(id.split('-')[0]);
	
		var y=Number(id.split('-')[1]);
		var nx=document.getElementById((x+1)+'-'+(y+1));//z怎么获取id，document.getElementById();
		var ny=document.getElementById((x+1)+'-'+(y));
		console.log(nx,ny);
		if(nx||ny){
			return;
		}
	}
	
	

	if(previous!==null){
		diyi=previous.innerHTML;//前一次
		var qqq=previous;
		diyi=zhi(diyi,qqq);		
		previous.style.border='none';

	}
	
	el.style.border='1px solid red';
	previous=el;
	dier=previous.innerHTML;
	var ppp=previous;
	dier=zhi(dier,ppp);
	
	if(diyi+dier==13){
		diyi=0;dier=0;previous=null;
		if(ppp.parentElement.getAttribute('id')=='scene'){
			scene.removeChild(ppp);
			whochildren(qqq);
		}
		else if(ppp.parentElement.getAttribute('id')=='fanpai'){
			fanpai.removeChild(ppp);
			whochildren(qqq);

		}
		else if(ppp.parentElement.getAttribute('id')=='refan'){
			refan.removeChild(ppp);
			whochildren(qqq);
		
		}
	}
}

//红心大战

};//最后