// 各マスの正方形を生成するコンポーネントを定義
function Square() {
  return <button className="square">1</button>;
}

// 外部から参照できるメイン関数"Square"を定義
// "Square"ではなくなったので"Board"に変更
export default function Board() {
  return (
    // JSXを返すので空の親要素<></>を設定
    <>
      {/* 3行描写 */}
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
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
