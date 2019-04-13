// var superagent = require('superagent');
// var fs = require('fs');

// var index = 0;
// var host = `http://115.236.55.91:4415/WebServer/HealthArchives/HealthReport/GetReportInfoList.aspx?pageSize=1000&&pageIndex=`;
// var max = 60;

// fs.appendFileSync('ldoc.md', 'reportId,reportNo,clientId,clientName,gender,unit,age,reportDate,examinationOrgan,company,grade,total,abnornmltotal\n');
// getData(index)

// function getData(id) {
//   console.log(`第${id}页data start...`)
//   var url = `${host}${id}`;
//   superagent.get(url)
//     .end(function(err, res) {
//       if (err) {
//         return next(err);
//       }
//       var list = JSON.parse(res.text).data
//       for(i=0;i<list.length;i++) {
//         line = `${list[i].reportId},${list[i].reportNo},${list[i].clientId},${list[i].clientName},${list[i].gender},${list[i].unit},${list[i].age},${list[i].reportDate},${list[i].examinationOrgan},${list[i].company},${list[i].grade},${list[i].total},${list[i].abnornmltotal}\n`
//         fs.appendFileSync('ldoc.md', line);
//       }
//       console.log(`第${id}页data finished...`)

//       id++;
//       if (id <= max) {
//         getData(id)
//       } else {
//         return;
//       }
//   });
// }



var superagent = require('superagent');
var fs = require('fs');
var index = 0;
var host = `http://115.236.55.91:4415/WebServer/HealthArchives/HealthReport/GetReportInfoList.aspx?pageSize=1000&&pageIndex=`;

for(i=index;i<=60;i++) {
  getData(i)
}
 
function getData(id) {
  console.log(`第${id}页data start...`)

  var url = `${host}${id}`;
  superagent.get(url)
    .end(function(err, res) {
      if (err) {
        return next(err);
      }
      fs.appendFileSync(`log-${id}.md`, res.text);
      var list = JSON.parse(res.text).data
      for(i=0;i<list.length;i++) {
        line = `${list[i].reportId},${list[i].reportNo},${list[i].clientId},${list[i].clientName},${list[i].gender},${list[i].unit},${list[i].age},${list[i].reportDate},${list[i].examinationOrgan},${list[i].company},${list[i].grade},${list[i].total},${list[i].abnornmltotal}\n`
        fs.appendFileSync(`alldoc-${id}.md`, line);
      }
      console.log(`第${id}页data finished...`)
  });
}

