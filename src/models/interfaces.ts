export interface StopInterface {
    line: number;
    stop: string;
    order: number;
    time: string;
}

export interface SelectedStopInterface {
    name: string | null;
    order: number | null;
}

export interface StateInterface {
    lines: number[];
    stops: StopInterface[];
    selectedLineStops: StopInterface[];
    selectedLineNumber: number | null;
    selectedStop: SelectedStopInterface; // Zmiana: Obiekt selectedStop
    isLoading: boolean;
    error: string | null;
}
