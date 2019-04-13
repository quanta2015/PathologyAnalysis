var superagent = require('superagent');
var cheerio = require('cheerio') 
var fs = require('fs');
var d = require('./data.js');

// f00a65fee938438199cce5a370aa3e81
const host = `http://115.236.55.91:4415/WebServer/HealthArchives/HealthReport/ReportTempItem.aspx?reportId=`;

getData(8959)
 
function getData(id) {
  console.log(`第${id}页data start...`)

  var url = `${host}${d.list[id].reportId}`;
  superagent.get(url)
    .end(function(err, res) {
      if (err) {
        console.log(err)
      }
      var $ = cheerio.load(res.text);
      data = ['一般检查','心电图','肿瘤检测','甲状腺功能检测','生化检验','血常规','糖化血红蛋白']
      ret  =  []
      
      data.forEach((item)=>{
        let list = $(`input[sectionname=${item}][class=reportItem]`)
        let sret = {'type':item, 'data':[]}
        for(i=0;i<list.length;i++) {
          name = list[i].attribs.itemname;
          val  = list[i].attribs.value;
          sret.data.push({'name':name,'val':val})
        }
        ret.push(sret)
      })
      fs.appendFileSync(`detail2/detail-${id}.md`, JSON.stringify(ret));
      console.log(`第${id}页data finished...`)
      id++

      if (id <= 58465) {
        getData(id)
      } else {
        return;
      }
  });
}

