var superagent = require('superagent');
var fs = require("fs");


		superagent.post('http://proxy.peuland.com/proxy/search_proxy.php')
		.send({type:'HTTP',
			country_code:'',
			is_clusters:'',
			is_https:'',
			level_type:'',
			search_type:'all',
			page:'2'})
   		.set('Accept', '*/*')
   		.set('Accept-Encoding','gzip, deflate')
   		.set('Accept-Language','zh-CN,zh;q=0.8')
   		.set('Cache-Control','max-age=0')
   		.set('Connection','keep-alive')
   		.set('Content-Length','30')
   		.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
   		.set("Cookie", "peuland_id=35fefe23fedc52da9283ac5ed131cbab; PHPSESSID=3rpr5188tltfdnp7ni95ii5ll7; peuland_md5=ca1f57155f5638ade3c28a900fbdbd55; w_h=900; w_w=1440; w_cd=24;w_a_h=820;w_a_w=1440")
        .set("Origin", "http://proxy.peuland.com")
        .set("Referer", "http://proxy.peuland.com/proxy_list_by_category.htm")
        .set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36")
        .set("X-Request-With", "XMLHttpRequest")
		.end(function(err,res){
			if(err){
				console.log(err)
				return next(err);
			}
			var dataString = res.text;
			var dataObj = JSON.parse(dataString).data;
			var items=[];
			dataObj.map(function(obj){
				items.push({
					ip:new Buffer(obj.ip, 'base64').toString(),
					port: new Buffer(obj.port,'base64').toString()
				})
			})
			var dataResult={
				data:items
			}
			console.log(JSON.stringify(dataResult))
			console.log(typeof JSON.stringify(dataResult))
		 //写入文件
		 fs.writeFile("iplist.json",JSON.stringify(dataResult),function (err) {
		     if (err) throw err ;
		     console.log("File Saved !"); //文件被保存
		 }) ;
		})
		
