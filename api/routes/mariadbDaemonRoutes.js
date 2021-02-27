const { exec } = require('child_process');

'use strict';
module.exports = function (app) {

   app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });

   app.get('/stopDaemon', function (req, res) {
      res.json({
         ok: true
      })

      exec('systemctl stop mariadb', (error, stdout, stderr) => {
         if (error) {
           console.error(`exec error: ${error}`);
           return;
         }
         console.log(`stdout: ${stdout}`);
         console.error(`stderr: ${stderr}`);
       });

       exec('/root/monitor.sh', (error, stdout, stderr) => {
         if (error) {
           console.error(`exec error: ${error}`);
           return;
         }
         console.log(`stdout: ${stdout}`);
         console.error(`stderr: ${stderr}`);
       });

      console.log('finish stop!');
   })

   app.get('/startDaemon', function (req, res) {
    res.json({
       ok: true
    })

    exec('systemctl start mariadb', (error, stdout, stderr) => {
       if (error) {
         console.error(`exec error: ${error}`);
         return;
       }
       console.log(`stdout: ${stdout}`);
       console.error(`stderr: ${stderr}`);
     });

     setTimeout(() => {
      exec('/root/monitor.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
     }, 4000);

    console.log('finish start!');
 })
}
