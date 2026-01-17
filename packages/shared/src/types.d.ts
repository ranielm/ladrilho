export type TileColor = 'blue' | 'yellow' | 'red' | 'black' | 'white';
export type Tile = TileColor | 'first-player';
export type Factory = TileColor[];
export interface CenterPool {
    tiles: TileColor[];
    hasFirstPlayer: boolean;
}
export interface PatternLine {
    color: TileColor | null;
    count: number;
    capacity: number;
}
export interface WallCell {
    color: TileColor;
    filled: boolean;
    wasCompleted: boolean;
}
export interface PlayerBoard {
    patternLines: PatternLine[];
    wall: WallCell[][];
    floorLine: Tile[];
    score: number;
}
export interface Player {
    id: string;
    name: string;
    board: PlayerBoard;
    isConnected: boolean;
    isHost: boolean;
}
export type GamePhase = 'waiting' | 'playing' | 'wall-tiling' | 'finished';
export interface GameState {
    id: string;
    players: Player[];
    factories: Factory[];
    centerPool: CenterPool;
    bag: TileColor[];
    discard: TileColor[];
    currentPlayerIndex: number;
    firstPlayerIndex: number;
    phase: GamePhase;
    round: number;
    winner: string | null;
}
export interface Room {
    id: string;
    createdAt: Date;
    gameState: GameState;
    maxPlayers: 2 | 3 | 4;
}
export interface TileSelection {
    source: 'factory' | 'center';
    factoryIndex?: number;
    color: TileColor;
}
export interface TilePlacement {
    destination: 'pattern-line' | 'floor';
    patternLineIndex?: number;
}
export interface PlayerMove {
    playerId: string;
    selection: TileSelection;
    placement: TilePlacement;
}
export interface RoundScore {
    playerId: string;
    tilesPlaced: number;
    adjacencyBonus: number;
    floorPenalty: number;
    roundTotal: number;
}
export interface FinalScore {
    playerId: string;
    playerName: string;
    baseScore: number;
    rowBonus: number;
    columnBonus: number;
    colorBonus: number;
    finalTotal: number;
}
export interface CreateRoomPayload {
    playerName: string;
    maxPlayers: 2 | 3 | 4;
}
export interface JoinRoomPayload {
    roomId: string;
    playerName: string;
}
export interface GameMovePayload {
    roomId: string;
    move: PlayerMove;
}
export interface RoomIdPayload {
    roomId: string;
}
export interface ReconnectPayload {
    roomId: string;
    playerId: string;
}
export interface RoomCreatedResponse {
    room: Room;
    playerId: string;
}
export interface RoomJoinedResponse {
    room: Room;
    playerId: string;
}
export interface ErrorResponse {
    message: string;
}
//# sourceMappingURL=types.d.ts.map