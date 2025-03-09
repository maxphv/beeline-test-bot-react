import './App.css';
import { useEffect, useState } from 'react';

const tg = window?.Telegram?.WebApp || {};

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
// function eraseCookie(name) {   
//   document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }

function App() {
  const [dataCookies, setDataCookies] = useState('');
  const [dataSessionStorage, setDataSessionStorage] = useState('');
  const [dataLocalStorage, setDataLocalStorage] = useState('');
  useEffect(() => {
    // метод сообщает, что приложение полностью
    // проинициализировалось, и его можно отрисовывать
    tg.ready();
    setDataCookies(getCookie('testCookies'))
    setDataSessionStorage(sessionStorage.getItem("testSessionStorage"));
    setDataLocalStorage(localStorage.getItem("testLocalStorage"));
  }, [])
  const onClose = () => {
    tg.close();
  }

  const setData = () => {

    setCookie('testCookies','data cookie',7);
    sessionStorage.setItem("testSessionStorage", "data sessionStorage");
    localStorage.setItem("testLocalStorage", "data localStorage");

  }

  return (
    <div className="App">
     {/* Приложение
     window.location.href = {window.location.href} */}
     <a target="_self" href="https://www.google.ru/" >Перейти в гугл</a>
     <button onClick={onClose}>Закрыть</button>
     <button onClick={setData}>Задать данные</button>
     Заданные куки: {dataCookies}
    <br/>
     Заданные sessionStorage: {dataSessionStorage}
     <br/>
     заданные localStorage: {dataLocalStorage}
     <br/>
     <button onClick={() => window.location.replace("https://www.google.com/")}>Редирект реплейс</button>
     <button onClick={() => window.location.href = "https://www.google.com/"}>Редирект href</button>
     <button onClick={() => window.open("https://www.google.com/","_self")}>Редирект через open self</button>
     <button onClick={() => window.open("https://www.google.com/","_blank")}>Редирект через open blank</button>
     {/* <div className='info'>
       tg = {JSON.stringify(tg)}
     </div> */}
    </div>
  );
}

export default App;
