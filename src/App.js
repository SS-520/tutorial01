// useState関数をimport
import { useState } from "react";

/*
流れ
⓪枠が描画される
①マスをクリックする
②クリックしたらhandleClick()が実行されて配列が更新される
③②で更新された配列の中身の値でマスが再描画される
*/

// 各マスの正方形を生成するコンポーネントを定義
// props:value
// マスに表示する値が呼び出し元のBoardに由来するので再度propsに指定
// propsとしてBoardから関数onSquareClickを受け取る
function Square( {value, onSquareClick } ) {

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

  // マスをクリックしたらonSquareClick()を呼び出す
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

// 外部から参照できるメイン関数"Square"を定義
// "Square"ではなくなったので"Board"に変更
export default function Board() {

  // 手番プレイヤーの判定
  const [xIsNext, setXIsNext] = useState(true);

  // 変数squaresを定義
  // 配列内の全てをnullで初期設定
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Squareに引き渡す、マスをクリックした時の動作関数handleClick()を定義
  // 引数のマス目iの中身=nextSquaresのi番目要素をXとして定義
  function handleClick(i) {

    // クリックしたマスが空欄か選択済みか判定
    // 選択済みなら処理終了
    if (squares[i]) {
      return;
    }

    // クリックマスか空欄の場合以下続行

    // 定数nextSquares に配列squaresをコピー
    const nextSquares = squares.slice();

    // 配列nextSquaresの最初の要素を"0"に設定
    // nextSquares[i] = "X";
    
    // 手版に応じて○×を指定
    if (xIsNext) {
      nextSquares[i] = "×";
    } else {
      nextSquares[i] = "○";
    }
      
    // 定数squaresの中身をnextSquaresに更新
    setSquares(nextSquares);

    // 手番交代
    setXIsNext(!xIsNext);

  }

  return (
    // JSXを返すので空の親要素<></>を設定
    // Squareに渡すvalueは配列内の値
    // SquareにonSquareClickとして関数handleClickを引き渡す
    // handleClickの引数を定義する
    // →onSquareClick={handleClick(0)}を渡すとローディング時から無限ループに陥る
    // →handleClick()を呼び出すための関数をonSquareClickに渡す
    // →冗長化を避けるためアロー関数で定義
    <>
      {/* 3行描写 */}
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        {/* 表示する値は配列squareで対応する中身 */}
        <Square value={squares[0]} onSquareClick={ () => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={ () => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={ () => handleClick(2)} />
      </div>
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        <Square value={squares[3]} onSquareClick={ () => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={ () => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={ () => handleClick(5)} />
      </div>
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        <Square value={squares[6]} onSquareClick={ () => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={ () => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={ () => handleClick(8)} />
      </div>
    </>
  );
}
