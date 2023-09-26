// 各マスの正方形を生成するコンポーネントを定義
// props:value
function Square({ value }) {
  
  // consoleに"clicked!"が表示されるようにする
  function handleClick() {
    console.log("clicked!");
  }
  
  // マスをクリックしたらhandleClick()を呼び出す
  return <button className="square" onClick={handleClick}>{ value }</button>;
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
        {/* 表示する値はvalueで指定 */}
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        {/* Squareコンポーネントを3マス分呼び出す */}
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
