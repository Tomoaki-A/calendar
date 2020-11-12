'use strict';

console.clear();

  // まず今日の日付を取得しそこから年と月を取得
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  // 先月末を作る関数-----------関数1-----------
  function getCalendarHead(){
    const dates = [];
    // 今月の0日目、つまり先月末日を取得
    const d = new Date(year,month,0).getDate();
    // 今月1日の曜日を取得、日曜が０、月曜が１...
    const n = new Date(year, month,1).getDay();

    // 曜日の数だけconst datesに先月分の日にちを入れていく。isDisabledを付ける。
    for (let i = 0; i < n; i++){
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  //const datesに1日から末日までの日付の配列を取得する関数-----------関数2-----------
  function getCalendarBody() {
    const dates = [];
    //翌月の0日目を指定することで今月の末日を取得
    const lastDate = new Date(year,month +1,0).getDate(); 
    // for文で1日から今月末日までをconst datesに入れる。
    for (let i = 1; i <= lastDate; i++){
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    // 今日の日付の配列に対してisTodayをtrueにする処理
    if(year === today.getFullYear() && month === today.getMonth()){
      // 配列は0から数えるので仮に今日が5日ならその要素は4番目に当たるので-1する。
       dates[today.getDate() - 1].isToday = true;
    }
    return dates;
  }

  // 今月分のカレンダーに表示する来月頭を作る関数-----------関数3-----------
  function getCalendarTail(){
    const dates = [];
    // 今月末日の曜日を整数値で求める。
    const lastDay = new Date(year,month +1,0).getDay()

    // 7日から末日の曜日の整数値（水曜なら４）を引いた数だけconst datesに入れる。
    for(let i = 1; i < 7 - lastDay; i++){
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }
// カレンダーを移動した時に目を消す関数-----------関数4-----------
  function clearCalender(){
  const tbody = document.querySelector('tbody')
  while(tbody.firstChild){
  tbody.removeChild(tbody.firstChild);
}
} 

// タイトルを描画する関数-----------関数5-----------
function renderTitle() {
  const title = `${year}/${String(month+1).padStart(2,'0')}`;
document.getElementById('title').textContent = title;
}

// 週を作る関数-----------関数6-----------
function renderWeeks() {
    // 3つの配列を配列ではなく要素としてconst datesに入れる。
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    const weeks = [];
    const weeksCount = dates.length / 7;

    // const weeks に１週間(7日)ごとの配列として入れる
    for(let i = 0; i < weeksCount; i++){
      weeks.push(dates.splice(0,7));
    }
    // １週間ごと(7日)にtr(列)を作る。
    weeks.forEach(week =>{
      const tr = document.createElement('tr');
      // 1日ごとにtdを作り日付としてテキストする。
      week.forEach(date => {
        const td = document.createElement('td');
        td.textContent = date.date;
        // もしその日のisToayプロパティがtrueならtodayクラスをつける。
        if(date.isToday){
          td.classList.add('today');
        }
        // もしその日のisDisabledプロパティがtrueならdisabledクラスをつける。
        if(date.isDisabled){
          td.classList.add('disabled');
        }
          tr.appendChild(td)
      });
      document.querySelector('tbody').appendChild(tr);
    })
  }


  // メイン!!!!!!!!!!!!!!!
  // カレンダーを移動した時に目を消す関数、タイトルを描画する関数、週を作る関数を実行する関数-----------関数7-----------
  function createCalender(){
    clearCalender();
    renderTitle();
    renderWeeks();
  };

  // prevボタンをクリックした時、monthを-1して、もしmonthが1月より小さくなったらyearを-1、monthを12月にする。そのあとメインのcreateCalender()を実行
  document.getElementById('prev').addEventListener('click',() => {
    month --;
    if(month < 0){
      year  --;
      month = 11;
    }
    createCalender()
  });
  // nextボタンをクリックした時、monthを+1して、もしmonthが12月より大きくなったらyearを+1、monthを1月にする。そのあとメインのcreateCalender()を実行
  document.getElementById('next').addEventListener('click',() => {
    month ++;
    if(month > 11){
      year++;
      month = 0;
    }
    createCalender()
  })
  // todatボタンをクリックしたらlet year,monhを今にしてメインのcreateCalender()を実行
  document.getElementById('today').addEventListener('click',() => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalender()
  })


  // メイン!!!!!!!!!!!!!!!
  createCalender()





