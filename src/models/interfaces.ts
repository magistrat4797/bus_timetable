export interface StopInterface {
    line: number;
    stop: string;
    order: number;
    time: string;
}

export interface StateInterface {
    lines: number[];
    stops: StopInterface[];
    selectedLineStops: StopInterface[];
    selectedLineNumber: number | null;
    selectedStopName: string | null;
    isLoading: boolean;
}
