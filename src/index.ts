import { takeEvery } from "redux-saga/effects";

export interface PollingAction<T, M, E = Error> {
    type: string;
    payload: PollingPayload<T, E>;
    meta?: M;
}

export interface PollingPayload<P, E = Error> {
    id: string;
    interval?: number;
    request: () => Promise<P>;
    onContinue: (response: P) => boolean;
    onFinished?: (response: P) => void;
    onFailure?: (error: E) => void;
}

function* pollingWorker<T, M>({ type, payload: { onFailure, onContinue, request }, meta }: PollingAction<T, M>) {}

export function* pollingSaga<P extends any, M extends any>() {
    yield takeEvery(({ type, payload }: PollingAction<P, M>) => type && type.endsWith("_POLL_START") && payload.id != null, pollingWorker);
}
