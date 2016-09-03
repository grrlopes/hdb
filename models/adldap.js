module.exports = function(){
var active = require('activedirectory');
var config = { url: 'ldap://10.130.214.252',
               baseDN: 'DC=indproj,DC=com,DC=br', //'dc=corp,dc=rede,dc=local',
               username: 'SERVICEMYPMS@indproj.com.br', //'gabriel@corp.rede.local',
               password: 'mp23@troo' } //'Win2008' }
var ad = new active(config);
var username = 'gabriel@corp.rede.local';
var password = 'Win2008';
/*
ad.authenticate(username, password, function(err, auth){
  if(err){
    console.error('ERROR: '+JSON.stringify(err));
    return;
  }
  if(auth){
    console.log('Autenticado');
  }
  else{
    console.log('Authentication failed!');
  }
});

if(auth){
  console.log('Autenticado '+usernamee+' '+passwordd);
  var groupName = 'prod';
  ad.getUsersForGroup(groupName, function(err, users){
    if (err){
      console.log('ERROR: ' +JSON.stringify(err));
      debugger;
    }
    if(!users){
      console.log('Group: ' + groupName + ' not found.');
      next();
    }else{
      //console.log(users);
      //for(var i =0; i<users.length;i++){
        //res.send(users[i].sAMAccountName);
      //}
      //res.send(JSON.stringify(users));
      console.log(users);
      next();
      debugger;
    }
  });
}else{
  console.log('Authentication failed!');
  debugger;
}

*/
return ad;
}
