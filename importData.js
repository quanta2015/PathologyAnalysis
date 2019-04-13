var fs = require('fs');
var path = require('path');
var __projdir = path.resolve(__dirname,'./');
var path = `${__projdir}/data2/`;
var ret = []


fs.readdir(path ,function(err,files){
  files.forEach(v=>{
    if (v.split('.')[1] === 'md') {
      let id = parseInt(v.split('.')[0].split('-')[1]) +1

      fp = `${path}/${v}`
      jsonData = JSON.parse(fs.readFileSync(fp,'utf-8'));

      for(i=0;i<jsonData.length;i++) {
        let type = jsonData[i].type
        let list = jsonData[i].data
        for(j=0;j<list.length;j++) {
          let name = list[j].name
          let val  = (list[j].val!=="")?list[j].val:0
          let line = `${id},${type},${name},${val}\n`
          fs.appendFileSync(`result2.csv`, line);
        }
      }
      console.log(`${id} finished...`)
    }
  })
})
