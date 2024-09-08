# Rock-paper-scissor-on-aptos

## Features

### **Decentralized Blockchain Game**
   - All game actions are recorded on the Aptos blockchain, ensuring fairness, transparency, and immutability.

### **Player vs. Computer**
   - Players face off against a computer, with its moves randomly generated using Aptos' randomness module.

### **Game State Management**
   - The smart contract keeps track of the total games played, games won, and the player's score across multiple rounds.

### **Frontend Integration**
   - A simple and interactive user interface allows players to easily start games, set their moves, and view results.

## Smart Contract Functions

### **Core Functions**

- **start_game**:  
  Starts a new game for the player or resets the game if one already exists. It also generates the computer's random move.

- **set_player_move**:  
  Sets the player's move (Rock, Paper, or Scissors) and compares it with the computer’s move to determine the winner. Updates the game count and player's score if they win.

- **determine_winner**:  
  A helper function that compares the player's and computer's moves to determine the winner. It returns the result as:
  - 2: Player wins
  - 1: Draw
  - 3: Computer wins

### **View Functions**

- **get_player_move**:  
  Retrieves the player's move for the current game.

- **get_computer_move**:  
  Returns the computer's move, but only after the player has made their move. Before that, it returns 0.

- **get_game_result**:  
  Shows the result of the current game (Player win, Computer win, or Draw). If the player hasn’t made a move, it returns 0.

- **get_player_score**:  
  Retrieves the player's total score across all rounds.

## Frontend Features

- **Start New Game**:  
  A button to initiate or reset the game, generating a random move for the computer and preparing the game state.

- **Select Player Move**:  
  The player can select Rock, Paper, or Scissors as their move using buttons in the UI, which will trigger the `set_player_move` function in the backend.

- **View Results**:  
  After both the player and computer have made their moves, the result of the game is displayed on the frontend, indicating whether the player won, lost, or the game ended in a draw.

- **Scoreboard**:  
  Displays the player’s score and total games played to keep track of progress.

## Game Flow

1. **Start the Game**:  
   The player clicks on "Start Game" to initialize the game, generating a random move for the computer.

2. **Player's Move**:  
   The player selects Rock, Paper, or Scissors using the UI, which is then recorded on the blockchain.

3. **Result Display**:  
   After both moves are made, the result is displayed on the frontend, and the game count and player score are updated if the player wins.

4. **Continue Playing**:  
   The player can continue playing and viewing the results by repeating the move selection process, with all game data recorded on the blockchain.

## Installation and Setup

### **Backend (Smart Contract on Aptos)**
1. **Install Aptos CLI**:  
   Follow the instructions to install Aptos CLI from [Aptos documentation](https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli).
   
2. **Deploy the Smart Contract**:
   - Compile the smart contract using Aptos CLI.
   - Deploy it to your Aptos account using the following commands:
     ```bash
     aptos move compile --package-dir <path-to-contract-folder>
     aptos move publish --package-dir <path-to-contract-folder>
     ```

3. **Interact with the Contract**:
   - Use Aptos CLI to call the smart contract methods and interact with the game.

### **Frontend**
1. **Install Node.js and npm**:  
   Ensure that Node.js and npm are installed on your system.

2. **Clone the Repository**:
   git clone <repository-url>
   cd frontend
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Frontend**:
   ```bash
   npm run dev
   ```
   This will launch the frontend application in your browser, allowing you to play the game.

## How It Works

- The player selects their move (Rock, Paper, or Scissors) through the frontend.
- The smart contract on Aptos randomly generates the computer's move.
- The player's move and computer's move are compared, and the result is displayed in the frontend.
- The game keeps track of the player's score, total games played, and result history.
