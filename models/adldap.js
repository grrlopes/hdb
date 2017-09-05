module.exports = function(){
var active = require('activedirectory');
var config = { url: 'ldap://10.130.214.252',
               baseDN: 'DC=indproj,DC=com,DC=br',
               username: 'SERVICEMYPMS@indproj.com.br',
               password: 'senha' };
var ad = new active(config);
var username = 'gabriel@corp.rede.local';
var password = 'Win2008';
return ad;
}
