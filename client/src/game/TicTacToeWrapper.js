import React, { Component } from "react";
import { connect } from "react-redux";
import {
  toggleplayingFlag,
  createRoom,
  setPiece,
  resetGame,
  toggleGameBoard,
} from "../actions/game";
import Game from "./Game";
import UserInfo from "./UserInfo";
import Board from "./Board";
import PubNubReact from "pubnub-react";
import Swal from "sweetalert2";
import shortid from "shortid";
import "./Game.css";
import { gapi } from "gapi-script";

class TicTacToeWrapper extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: "pub-c-8638a07d-b87b-47d8-ac1c-5bd34ffb3db9",
      subscribeKey: "sub-c-7f8e8d28-81d3-11ea-881d-66486515f06e",
    });

    this.lobbyChannel = null;
    this.gameChannel = null;
    this.roomId = null;
    this.pubnub.init(this);
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: [this.lobbyChannel, this.gameChannel],
    });
  }

  componentDidUpdate() {
    // Check that the player is connected to a channel
    if (this.lobbyChannel != null) {
      this.pubnub.getMessage(this.lobbyChannel, (msg) => {
        // Start the game once an opponent joins the channel
        if (msg.message.notRoomCreator) {
          // Create a different channel for the game
          this.gameChannel = "tictactoegame--" + this.roomId;

          this.pubnub.subscribe({
            channels: [this.gameChannel],
          });

          this.props.toggleplayingFlag({ isPlaying: true });

          // Close the modals if they are opened
          Swal.close();
        }
      });
    }
  }

  // Create a room channel
  onPressCreate = (e) => {
    // Create a random name for the channel
    this.roomId = shortid.generate().substring(0, 5);
    this.lobbyChannel = "tictactoelobby--" + this.roomId;
    this.pubnub.subscribe({
      channels: [this.lobbyChannel],
      withPresence: true,
    });

    // Open the modal
    Swal.fire({
      position: "top",
      allowOutsideClick: false,
      title: "Share this room ID with your friend",
      text: this.roomId,
      width: 275,
      padding: "0.7em",
      // Custom CSS
      customClass: {
        heightAuto: false,
        title: "title-class",
        popup: "popup-class",
        confirmButton: "button-class",
      },
    });
    this.props.createRoom();
  };

  // The 'Join' button was pressed
  onPressJoin = (e) => {
    Swal.fire({
      position: "top",
      input: "text",
      allowOutsideClick: false,
      inputPlaceholder: "Enter the room id",
      showCancelButton: true,
      confirmButtonColor: "rgb(208,33,41)",
      confirmButtonText: "OK",
      width: 275,
      padding: "0.7em",
      customClass: {
        heightAuto: false,
        popup: "popup-class",
        confirmButton: "join-button-class ",
        cancelButton: "join-button-class",
      },
    }).then((result) => {
      // Check if the user typed a value in the input field
      if (result.value) {
        this.joinRoom(result.value);
      }
    });
  };

  // Join a room channel
  joinRoom = (value) => {
    this.roomId = value;
    this.lobbyChannel = "tictactoelobby--" + this.roomId;

    // Check the number of people in the channel
    this.pubnub
      .hereNow({
        channels: [this.lobbyChannel],
      })
      .then((response) => {
        if (response.totalOccupancy < 2) {
          this.pubnub.subscribe({
            channels: [this.lobbyChannel],
            withPresence: true,
          });

          this.props.setPiece({ piece: "O" });
          this.pubnub.publish({
            message: {
              notRoomCreator: true,
            },
            channel: this.lobbyChannel,
          });
        } else {
          // Game in progress
          Swal.fire({
            position: "top",
            allowOutsideClick: false,
            title: "Error",
            text: "Game in progress. Try another room.",
            width: 275,
            padding: "0.7em",
            customClass: {
              heightAuto: false,
              title: "title-class",
              popup: "popup-class",
              confirmButton: "button-class",
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Reset everything
  endGame = () => {
    this.props.resetGame();
    this.lobbyChannel = null;
    this.gameChannel = null;
    this.roomId = null;

    this.pubnub.unsubscribe({
      channels: [this.lobbyChannel, this.gameChannel],
    });
  };

  logout = () => {
    console.log("logout user");
    gapi.auth2.getAuthInstance().disconnect();
  };

  render() {
    return (
      <div>
        <div className="title">
          <p>Tic Tac Toe Game</p>
        </div>
        {!this.props.showGameBoard && (
          <>
            <UserInfo />

            <div
              className="play-game-btn"
              onClick={() =>
                this.props.toggleGameBoard({ showGameBoard: true })
              }
            >
              {" "}
              Play Game
            </div>
            <div className="logout-btn" onClick={() => this.logout()}>
              {" "}
              Logout
            </div>
          </>
        )}
        {this.props.showGameBoard && (
          <>
            {!this.props.isPlaying && (
              <>
                <div
                  className="view-profile"
                  onClick={() =>
                    this.props.toggleGameBoard({ showGameBoard: false })
                  }
                >
                  {" "}
                  View Profile
                </div>
                <div className="game">
                  <div className="button-container">
                    <div
                      className="create-button "
                      disabled={this.props.isDisabled}
                      onClick={(e) => this.onPressCreate()}
                    >
                      {" "}
                      Create
                    </div>
                    <div
                      className="join-button"
                      onClick={(e) => this.onPressJoin()}
                    >
                      {" "}
                      Join
                    </div>
                  </div>
                  <div className="board">
                    <Board squares={0} onClick={(index) => null} />
                  </div>
                </div>
              </>
            )}

            {this.props.isPlaying && (
              <>
                <div
                  className="view-profile"
                  onClick={() =>
                    this.props.toggleGameBoard({ showGameBoard: false })
                  }
                >
                  {" "}
                  View Profile
                </div>
                <Game
                  pubnub={this.pubnub}
                  gameChannel={this.gameChannel}
                  piece={this.props.piece}
                  isRoomCreator={this.props.isRoomCreator}
                  myTurn={this.props.myTurn}
                  endGame={this.endGame}
                />
              </>
            )}
          </>
        )}

        <div className="copyright">© Tanmay Shah</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  isDisabled: state.game.isDisabled,
  isPlaying: state.game.isPlaying,
  piece: state.game.piece,
  isRoomCreator: state.game.isRoomCreator,
  myTurn: state.game.myTurn,
  showGameBoard: state.game.showGameBoard,
});

const mapDispatchToProps = {
  toggleplayingFlag,
  createRoom,
  setPiece,
  resetGame,
  toggleGameBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeWrapper);
