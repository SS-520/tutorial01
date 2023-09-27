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
// 描画のメインコンポーネントを"Game"コンポーネントに変更
// 呼び出し元Gameコンポーネントから「次の手番; 表示盤面; 手番指定」情報を受け取る
function Board( {xIsNext, squares, onPlay} ) {

  // 手番プレイヤーの判定→呼び出し元のGameコンポーネントで判定する
  // const [xIsNext, setXIsNext] = useState(true);

  // 変数squaresを定義
  // 配列内の全てをnullで初期設定
  // 盤面初期設定はGameコンポーネントで行う
  // const [squares, setSquares] = useState(Array(9).fill(null));

  // Squareに引き渡す、マスをクリックした時の動作関数handleClick()を定義
  // 引数のマス目iの中身=nextSquaresのi番目要素をXとして定義
  function handleClick(i) {

    // クリックしたマスが空欄か選択済みか判定
    // 選択済み or 勝利判定が帰ってきたら処理終了
    if (squares[i] || calculateWinner(squares)) {
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
    // setSquares(nextSquares);
    
    // 手番交代
    // setXIsNext(!xIsNext);

    // setSquaresとsetXIsNextを統一した関数onPlayを呼び出す
    onPlay(nextSquares)

  }

  // 中身を随時計算されるcalculateWinner()として固定変数winner規定
  const winner = calculateWinner(squares);
  // winnterの結果に応じて「次の手番」or「勝者」の状態を保持する変数status規定
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "×" : "○");
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
      {/* 勝敗表示 */}
      <div className="status">{status}</div>
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

// 描画のメインとして"Game"コンポーネントを作成
export default function Game() {

  // 手番判定
  // currentMove の値に基づいて判定
  // 手番判定をこのコードに集約
  const xIsNext = ( (currentMove % 2) === 0 );

  // ゲームの履歴
  // 盤面が9マスなので最高でも9手しかない→配列要素数9つ
  // 初期設定：配列内要素全てnull
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // 定数としてcurrentMove定義
  // 初期値：0
  const [currentMove, setCurrentMove] = useState(0);

  // 現在描画すべき最新の盤面状態を取得
  // → 現在選択中の手番の履歴を表示（手動変更がない限り最新を選択しているという扱い）
  // const currentSquares = history[history.length - 1];
  const currentSquares = history[currentMove];

  // ゲーム状況を任意の手番に更新
  function handlePlay(nextSquares) {

    // 過去の手番に戻った場合、指定手番の後の履歴はすべて削除する
    // → 指定手番の部分までコピーした履歴配列 + 次の盤面で履歴を再セット
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // setHistory([...history, nextSquares]);
    setHistory(nextHistory);

    // 手番番号を更新
    // 現在の配列数-1が手番の配列
    setCurrentMove(nextHistory.length - 1);

    // 手番更新
    // →Gameコンポーネントの序盤でcurrentMove に基づいて計算させるため削除
    // setXIsNext(!xIsNext);
  }

  // 任意の操作に戻す
  function jumpTo(nextMove) {
    // currentMoveを更新する
    setCurrentMove(nextMove);

    // currentMoveが奇数→xIsNext: true
    // currentMoveが偶数→xIsNext: false
    // →Gameコンポーネントの序盤でcurrentMove に基づいて計算させるため削除
    // setXIsNext(nextMove % 2 === 0);

  }

  // 配列historyの中身を配列squaresに以下の関数の中身に書き換えたものに変更し、結果を定数movesに格納する
  // 引数：move
  const moves = history.map((squares, move) => {

    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={ () => jumpTo(move) }>{description}</button>
      </li>
    );
  });

  // 描画内容
  return (
    <div className="game">
        {/* ゲーム盤面描画するBoardコンポーネントを呼び出す */}
        {/* props: 次の手番; 表示盤面; 手番指定 */}
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {/* ゲームの履歴を毎ターン追加 */}
      {/* 定数movesを表示する */}
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


// 三目並びの勝敗定義のための関数を定義
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
      return squares[a];
    }
  }
  return null;
}