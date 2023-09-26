// useState関数をimport
import { useState } from "react";

// 各マスの正方形を生成するコンポーネントを定義
// props:value
// マスに表示する値が呼び出し元のBoardに由来するので再度propsに指定
function Square( {value} ) {

  // 値valuseを永続定義
  // valueの中身はuseStateを設定することでsetValueの中身で変更
  // const [value, setValue] = useState(null);

  // consoleに"clicked!"が表示されるようにする
  // function handleClick() {
  //   // console.log("clicked!");
  //   // setValueに値"X"を設定
  //   // この関数が呼び出されるたびにvalueの中身が変更されて再レンダリングが走る
  //   setValue('X');
  // }

  // マスをクリックしたらhandleClick()を呼び出す
  // return <button className="square" onClick={handleClick}>{ value }</button>;
  return <button className="square">{ value }</button>;
}

// 外部から参照できるメイン関数"Square"を定義
// "Square"ではなくなったので"Board"に変更
export default function Board() {

  // 変数squaresを定義
  // 配列内の全てをnullで初期設定
  const [squares, setSquares] = useState(Array(9).fill(null));

  return (
    // JSXを返すので空の親要素<></>を設定
    // Square呼び出し時のvalueを削除
    <>
      {/* 3行描写 */}
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        {/* 表示する値は配列squareで対応する中身 */}
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}
