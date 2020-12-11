'use strict';

{
// idの取得
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  
// スタート時間,タイムアウトid、経過時間の変数
  let startTime;
  let timeoutId;
  let elapsedTime = 0;
  
// カウントアップ関数の作成
  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;
    
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }
  
// ボタン操作の制御
  function setButtonStateInitial() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
  }
  function setButtonStateRunning() {
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;
  }
  function setButtonStateStopped() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
  }

  setButtonStateInitial();
  
// スタートボタンの動作
  start.addEventListener('click', () => {
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });
  
// ストップボタンの動作
  stop.addEventListener('click', () => {
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });
// リセットボタンの動作
  reset.addEventListener('click', () => {
    setButtonStateInitial();
    timer.textContent = '00:00.000'
    elapsedTime = 0;
  });
}