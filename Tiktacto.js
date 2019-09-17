var body = document.body;
var table = document.createElement('table');
var div = document.createElement('div');
var tds = [];
var trs = [];
var turn = 'X';


//callbakc 함수 event라는 파라미터를 가진다.
//클릭되었을때 몇줄의 몇칸인지를 정확히 캐치해야하므로 그걸 구현하기 위해 callback 함수가 필요하다.
var callback = function(event){
    //클릭했을시 몇번째 줄인지를 파악하기 위해 선언한 변수.
    //target은 클릭했을시 클릭한 그 칸을 선택하게 해준다.
    //parentNode는 현재 속성을 받고있는 부모속성에게 가는것이다.
    var line = trs.indexOf(event.target.parentNode);
    
    //클릭했을 시 몇번째 칸인지를 파악하기 위해 선언한 변수이다.
    //target은 클릭했을 시 클릭한 그 줄을 선택하게 해준다.
    var box = tds[line].indexOf(event.target);
    
    console.log(line);
    console.log(box);

    //내가 클릭한 칸이 빈칸일때와 빈칸이 아닐때를 대비하여 만든 조건문. 
    if(tds[line][box].textContent !== ''){
        console.log('빈칸 아닌뒙');
    }else{
        console.log('빈칸이다.');
        tds[line][box].textContent = turn;
    
        //가로줄 검사
        var full = false;
        if(tds[line][0].textContent === turn 
            && tds[line][1].textContent === turn 
            && tds[line][2].textContent === turn)
        {
            full = true;
        }

        //세로줄 검사
        if(tds[0][box].textContent === turn 
            && tds [1][box].textContent === turn 
            && tds[2][box].textContent === turn)
        {
            full = true;
        }

        //왼쪽에서 오른쪽으로 가는 대각선 검사
        if(line - box === 0){
            if(tds[0][0].textContent === turn 
                && tds[1][1].textContent === turn 
                && tds[2][2].textContent == turn)
            {
                full = true;
            }
        }

        //오른쪽에서 왼쪽으로 가는 대각선 검사
        if(Math.abs(line - box) === 2){
            if(tds[0][2].textContent === turn 
                && tds[1][1].textContent === turn 
                && tds[2][0].textContent == turn)
                {
                    full = true;
                }   
        }

        //빙고가 완성되었을시.
        if(full){
            div.innerHTML = turn + '님이 승리';
            turn = 'X';

            //빙고가 완성되면 forEach를 통해서 모두 빈칸으로 초기화.
            tds.forEach(function(tr)
            {
                tr.forEach(function(td)
                {
                    td.textContent = '';
                })
            })
        } else {
            //X턴과 O턴으로 번갈아가며 턴이 바뀜.
            if(turn === 'X'){
                turn = 'O';
            } else{
                turn = 'X';
            }
        }
    }
};

//3번을 하는 이유는 3x3 바둑판이 필요하기때문에 3번 반복한다. 
for(var i = 1; i <= 3; i += 1){
    //tr은 줄을 의미.
    var tr = document.createElement('tr');
    trs.push(tr);
    tds.push([]);

    //3x3 바둑판의 세줄은 위에서 만들었고 이제는 1줄에 3칸을 만들어야 하므로
    //이중for문으로 한줄에 칸 3개씩 넣기위해 for문을 한번 더쓴다.
    for(var j = 1; j <= 3; j += 1){
        //칸을 생성한다.
        var td = document.createElement('td');
        //생성된 칸을 클릭시 callback이라는 함수가 실행되게 만든다.
        td.addEventListener('click', callback);
        //칸의 배열에 1-1 = 0, 2-1 = 1, 3-1 = 2 라는 배열의 위치값을 주고 그 배열에 칸을 준다.
        tds[i - 1].push(td);
        //미리 만들어둔 줄에 칸을 넣는다.
        tr.appendChild(td);
    }
    //테이블에 줄을 넣는다.
    table.appendChild(tr);
}
//바디에 테이블을 넣는다.
body.appendChild(table);
body.appendChild(div);

console.log(tds);
