// useState関数をimport
import { useState } from "react";

// 各マスの正方形を生成するコンポーネントを定義
// props:value
// マスの中身を外部から受け取らず内部のsetValueで規定に変更
function Square() {

  // 値valuseを永続定義
  // valueの中身はuseStateを設定することでsetValueの中身で変更
  const [value, setValue] = useState(null);

  // consoleに"clicked!"が表示されるようにする
  function handleClick() {
    // console.log("clicked!");
    // setValueに値"X"を設定
    // この関数が呼び出されるたびにvalueの中身が変更されて再レンダリングが走る
    setValue('X');
  }
  
  // マスをクリックしたらhandleClick()を呼び出す
  return <button className="square" onClick={handleClick}>{ value }</button>;
}

// 外部から参照できるメイン関数"Square"を定義
// "Square"ではなくなったので"Board"に変更
export default function Board() {
  return (
    // JSXを返すので空の親要素<></>を設定
    // Square呼び出し時のvalueを削除
    <>
      {/* 3行描写 */}
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        {/* 表示する値はvalueで指定 */}
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
