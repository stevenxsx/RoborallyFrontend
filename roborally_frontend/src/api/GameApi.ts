import axios from "axios";
import { Board } from "../types/Board";
import { Space } from "../types/Space";
import { Game } from "../types/Game";
import {User} from "../types/User";

class GameApi {
    private static instance: GameApi;
    private readonly BACKEND_URL = "http://localhost:8080"
    private constructor() { }

    public static getInstance(): GameApi {
        if (!GameApi.instance) {
            GameApi.instance = new GameApi();
        }
        return GameApi.instance;
    }

    public getBoard(boardId: number) {
        return axios.get<Board>(`${this.BACKEND_URL}/board/${boardId}`).then(value => value.data)
    }

    public moveCurrentPlayer(boardId: number, space: Space) {
        return axios.put(`${this.BACKEND_URL}/board/${boardId}/move`, space)
    }

    public switchPlayer(boardId: number) {
        return axios.put(`${this.BACKEND_URL}/board/${boardId}/switchplayer`)
    }
    public getGames() {
        return axios.get<Game[]>(`${this.BACKEND_URL}/games`).then(value => value.data)
    }

    public getGame(gameId: number) {
        return axios.get<Game>(`${this.BACKEND_URL}/game/${gameId}`).then(value => value.data)
    }

    public deleteGame(gameId: number) {
        return axios.delete<Game>(`${this.BACKEND_URL}/game/${gameId}/delete`).then(value => value.data)
    }

    public startGame(gameId: number) {
        return axios.put<Game>(`${this.BACKEND_URL}/game/${gameId}/start`).then(value => value.data)
    }

    public endGame(gameId: number) {
        return axios.put<Game>(`${this.BACKEND_URL}/game/${gameId}/end`).then(value => value.data)
    }

    public createGame(gameName: String) {
        let game = {
            gameName: gameName,
            gameStarted: false,
            gameId: -1
        }
        return axios.post<Game>(`${this.BACKEND_URL}/newgame/`, game).then(value => value.data)
    }

    public createPlayer(gameId: number) {
        let player = {
            "boardId": gameId,
            "playerId": null,
            "playerName": null,
            "playerColor": null,
            "x": null,
            "y": null
        }
        return axios.post<Game>(`${this.BACKEND_URL}/board/${gameId}/player`, player).then(value => value.data)
    }

    public validateUser(name: string){
        return axios.get<User>(`${this.BACKEND_URL}/user/`, {params:{name: name}})
        .then(
            value => value.data
        )
    }

    public setCurrentPlayer(boardId: number, playerId: number) {
        return axios.put(`${this.BACKEND_URL}/board/${boardId}/currentPlayer/${playerId}`)
    }

    public addUserToGame(gameId: number, userName: string) {
        return axios.post(`${this.BACKEND_URL}/game/${gameId}/user/${userName}`)
    }


}

export default GameApi.getInstance()