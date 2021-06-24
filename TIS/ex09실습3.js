var user = {
    tall : null,
    kg :null,
    적정체중 : null,
    당신의체중: null,
    color: null
}

function scan(){
    user.tall = window.prompt(" 키 입력 ")
    user.kg = window.prompt(' 몸무게 입력 ')
    user.적정체중 = (user.tall-100)*0.9;

    if((user.적정체중*0.9)>=user.kg){
        user.당신의체중 = '체중미달';
        user.color = 'blue';
    }else if((user.적정체중*1.1)<=user.kg){
        user.당신의체중 = '과체중';
        user.color = 'red';
    }else{
        user.당신의체중 = '적정체중';
        user.color = 'green';
    }
}
scan()
function print(a,str){
document.write('<h2>'+a+'='+str+'<h2>')
}

function printC(a,str,str2){
    document.write('<h2 '+'style= color:'+str2+'>'+a+'='+str+'<h2>')
    }

print('키',user.tall)
print('몸무게',user.kg)
print('적정몸무게',user.적정체중)
printC('당신은',user.당신의체중,user.color)

