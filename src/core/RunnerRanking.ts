import { IRunnerData } from "../models/rankingModel";
import { IRankingsSportmaniacs } from "../models/sportmaniacsModel";

interface IRunnerHistoryRaceService {
    getRunnerHistory(runnerId: string, leagueId: string): Promise<IRankingsSportmaniacs[]>
}

interface IRunnerHistoryRankingService {
    getRanking(raceId: string, leagueId: string): Promise<IRunnerData>
}

export class RunnerRanking {
    dorsal: string;
    position: number;
    lastPosition: number;
    points: string;
    name: string;
    lastRace: number;
    topFive: boolean;
    participaciones: number;
    bestPosition: number;
    bestPositionCount: number;
    textBestPosition: string;
    pointCircuit: number;
    positionGeneralCircuit: number;
    lastPositionGeneralCircuit: number;
    lastPositionCategoryCircuit: number;
    bestPace: string;
    bestPositionCategotyCircuit: number;
    texBestPositionCategotyCircuit: string;
    pointsCurrentRace: number;

    RunnerHistoryRaceService: IRunnerHistoryRaceService; // servicio que devuelve el historial de un corredor
    RunnerHistoryRankingService: IRunnerHistoryRankingService; // servicio que devuelve ranking historico de un corredor

    constructor(runnerHistoryRaceService: IRunnerHistoryRaceService, runnerHistoryRankingService: IRunnerHistoryRankingService) {
        this.RunnerHistoryRaceService = runnerHistoryRaceService;
        this.RunnerHistoryRankingService = 0
        
    }

}