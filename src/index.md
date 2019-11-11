class Square extends React.Component {
    // constructor(props) {
    //     Em JS super é chamado para definir o construtor de uma subclasse
    //     super(props);
    //     state armazena o valor do componente
    //     this.state = { 
    //         value: null,
    //     };
    // }

    render() {
      return (
        //   utiliza arrow function ao invés do this
        // passa uma função como prop onClick
        //com o alert, a função só é chamada após um clique
        <button
         className="square" 
         onClick={() => this.props.onClick()} 
        //  ao chamar this.setState no manipulador onClick, o React renderiza novamente esse componente 
        //sempre quando for clicado; Quando setState é chamado os comp. filhos também são atualizados
        >
        {/* mostra o valor de props da classe board
        passa uma prop do componente pai "board" para componente filho "square" */}
        {this.props.value} 
        {/* exibe o valor do estado atual quando clicado*/ }
      </button>
      );
    }
  }

      // o state é guardado no componente Board ao invés de cada Square
    // Agora os squares são controlled components, Board tem controle total sobre eles
    handleClick(i) {
        // slice cria uma cópia do Array para modificá-lo ao invés de modificar o existente
        const squares = this.state.squares.slice();
        // ignora o click e retorna antes caso alguém tenha ganho o jogo ou se o square já estiver ocupado
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        // boolean para trocar o valor de xIsNext, agora os jogadores podem trocar de turno
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
    }