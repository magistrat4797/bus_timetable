export interface StopInterface {
    line: number;
    stop: string;
    order: number;
    time: string;
}

export interface SelectedStopInterface {
    name: string | null;
    order: number | null;
    times: string[];
}

export interface StateInterface {
    lines: number[];
    stops: StopInterface[];
    selectedLineStops: StopInterface[];
    selectedLineNumber: number | null;
    selectedStop: SelectedStopInterface;
    isLoading?: boolean;
    error?: string | null;
}
