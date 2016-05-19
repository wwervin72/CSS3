(function(planetObj, TimeArr, judgeDirec) {
	//检测参数是否规范
	var timeRegexp = /^[1-9][0-9]*$/,
		direcRegexp = /^[01]$/;
	function checkArgs (arg, ele, regexp) {
		if(arg){
			$(arg).each(function (i, item) {
				if(arg.length != planetObj.length || !regexp.test(item)){
					throw Error('an error occured');
					return;
				}else{
					return arg;
				}
			})
		}else{
			arg = [];
			for(var i = 0; i < planetObj.length; i++){
				arg.push(ele);
			}
		}
		return arg;
	}
	TimeArr = checkArgs(TimeArr, 50, timeRegexp);
	judgeDirec = checkArgs(judgeDirec, 1, direcRegexp);

	var PathArr = [];
	$(planetObj).each(function (i, item) {
		var n = 0;  //定义一个标识，来判断当前是怎么运动的
		PathArr.push({
			a : $(item).parent().width() / 2,
			b : $(item).parent().height() / 2
		});

		//变化x坐标，然后根据椭圆轨迹，获得y坐标，以达到运动的效果
		function getEllopsePath (x, PathObj) {
			x = x - PathObj.a;
			var m;

			n ? (judgeDirec[i] ? m = 1 : m = -1) : (judgeDirec[i] ? m = -1 : m = 1); //判断开根号求得的y值是否为负数，从而确定旋转方向
			// if(judgeDirec[i]){
			// 	n ? (m = judgeDirec[i]) : (m = judgeDirec[i]-2);  
			// }else{
			// 	n ? (m = judgeDirec[i] - 1) : (m = judgeDirec[i] + 1);
			// }
			return Math.sqrt((1 - x * x / (PathObj.a * PathObj.a)) * PathObj.b * PathObj.b) * m + PathObj.b; 
		}

		function moving () {
			var x = parseInt($(item).css('left'), 10);
			if(x == 2 * PathArr[i].a){
				n--;
			}else if (x == 0) {
				n++;
			}
			n ? x++ : x--;
			$(item).css({
				'top' : getEllopsePath(x, PathArr[i]) + 'px',
				'left' : x + 'px'
			});
		}

		setInterval(moving, TimeArr[i]);
	});
})(['#Saturn', '#earth', '#Venus', '#Neptune', '#Mercury', '#Jupiter', '#satellite', '#moon'], [40, 180, 240, 20, 120, 200, 30, 10]/*option默认为50毫秒*/, [1, 0, 0, 0, 1, 0, 1, 1]/*option 判断运动方向，0为顺时针，1为逆时针，默认为逆时针*/);
