import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// componente de classe Square foi mudado para componente de função
// comp. de função possui apenas render e não possui seu próprio state, podendo apenas receber uma prop
// e retornar o que deve ser renderizado
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
  class Board extends React.Component {
    renderSquare(i) {
        // define o valor do método renderSquare a partir do seu estado 
        //é utilizado parênteses para que o JS não insira ; após o return e quebre o código
      return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      history: [{
      squares: Array(9).fill(null),
      }],
      // indica qual passo estamos visualizando no momento
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // descarta jogadas feitas até o momento em que voltamos na jogada anterior, começando a partir do ponto da jogada passada
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    }); 
  }
// atualiza stepNumber, também define xIsNext para true caso caso stepNumber seja par
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

// o método de array concat não modifica o array original ou contrário do método push
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
// método map mapeia fonte de dados para outra fonte de dados
      const moves = history.map((step, move) => {
        const desc = move ? 
        'Vá para movimento #' + move :
        'Vá para o começo do jogo';
        return (
          // Adiciona ID único associado a cada jogada anterior
          <li key={move}> 
            <button onClick={() => this.jumpTo(move)}> {desc} </button>
          </li>
        );
      });

      let status;
      if(winner) {
        status = 'Vencedor: ' + winner;
      } else {
        status = 'Próximo jogador: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />

          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner (squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] ===  squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


// Obs:
// 1. A propriedade onClick do DOM dentro de button cria um event listenerCount;
// 2. Quando o botão é clicado, o React chama a função event handler onClick definido no render de Square;
// 3. Esse event handler chama a função recebida através da prop onClick criada em Board (this.props.onClick());
// 4. Ao Board passar onClick={() => this.handleClick(i)} para o Square, a função this.handleClick(i)
//    será chamada quando o Square for chamado;
// 5. Se usa on em props que representam eventos e handle para props que manipulam eventos;