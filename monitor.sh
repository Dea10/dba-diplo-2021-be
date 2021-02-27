systemctl status mariadb | grep running > /dev/null

if [ $? -eq 0 ]
then
	echo db running > /var/www/html/index.html
	echo const status={value: true} > /root/my-app/src/status.js
	echo export default status >> /root/my-app/src/status.js
else
	echo db down > /var/www/html/index.html
	echo const status={value: false} > /root/my-app/src/status.js
	echo export default status >> /root/my-app/src/status.js
fi
