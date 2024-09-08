address 0x5a5e91caa029ccfbfcd8038cb9cf39a742f21f12a90a423d9e0e204d268cf308 {

module RockPaperScissors {
    use std::signer;
    use aptos_framework::randomness;

    const ROCK: u8 = 1;
    const PAPER: u8 = 2;
    const SCISSORS: u8 = 3;

    struct Game has key {
        player: address,
        // last game details
        player_move: u8,
        computer_move: u8,
        result: u8,
        // total game played
        count: u8,
        // total game won
        score: u8
    }

    #[randomness]
    entry fun start_game(account: &signer) acquires Game {
        let player = signer::address_of(account);
        let computer_move = randomness::u8_range(1, 4);

        if (exists<Game>(signer::address_of(account))) {
            // reset game if there's already game
            let game = borrow_global_mut<Game>(signer::address_of(account));
            game.player_move = 0;
            game.computer_move = computer_move;
            game.result = 0;
        } else {
            // init game
            let game = Game {
                player,
                player_move: 0,
                computer_move,
                result: 0,
                count: 0,
                score: 0
            };
            move_to(account, game);
        }
    }

    public entry fun set_player_move(account: &signer, player_move: u8) acquires Game {
        let game = borrow_global_mut<Game>(signer::address_of(account));
        game.player_move = player_move;
        game.count = game.count + 1;
        game.result = determine_winner(game.player_move, game.computer_move);
        if (game.result == 2) {
            game.score = game.score + 1;
        }
    }

    fun determine_winner(player_move: u8, computer_move: u8): u8 {
        if (player_move == ROCK && computer_move == SCISSORS) {
            2 // player wins
        } else if (player_move == PAPER && computer_move == ROCK) {
            2 // player wins
        } else if (player_move == SCISSORS && computer_move == PAPER) {
            2 // player wins
        } else if (player_move == computer_move) {
            1 // draw
        } else {
            3 // computer wins
        }
    }

    #[view]
    public fun get_player_move(account_addr: address): u8 acquires Game {
        borrow_global<Game>(account_addr).player_move
    }

    #[view]
    public fun get_computer_move(account_addr: address): u8 acquires Game {
        let game = borrow_global<Game>(account_addr);
        // if player has not set move
        if (game.player_move == 0) {
            0
        } else {
            game.computer_move
        }
    }

    #[view]
    public fun get_game_result(account_addr: address): u8 acquires Game {
        let game = borrow_global<Game>(account_addr);
        // if player has not set move
        if (game.player_move == 0) {
            0
        } else {
            game.result
        }
    }

    #[view]
    public fun get_player_score(account_addr: address): u8 acquires Game {
        if (exists<Game>(account_addr)) {
            borrow_global<Game>(account_addr).score
        } else {
            0
        }
    }
}
}
