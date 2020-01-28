import { call, race, take, takeEvery } from "redux-saga/effects";

export interface IPollingAction<T, M, E = Error> {
    type: string;
    payload: IPollingPayload<T, E>;
    meta?: M;
}

export interface IPollingPayload<P, E = Error> {
    id: string;
    interval?: number;
    request: () => Promise<P>;
    onContinue: (response: P) => boolean;
    onFinished?: (response: P) => void;
    onFailure?: (error: E) => void;
}

export interface IStopPollingAction {
    type: string;
    payload: string;
}

function* pollingWorker<T, M>(actionSuffix: string, actionStopSuffix: string, action: IPollingAction<T, M>) {
    const prefix = action.type.replace(actionSuffix, "");

    yield race({
        task: call(pollingExecutor, action, prefix),
        cancel: take(
            (stopAction: IStopPollingAction) =>
                stopAction.type === `${prefix}${actionStopSuffix}` && stopAction.payload && stopAction.payload === action.payload.id
        )
    });
}

function* pollingExecutor<P, M>(
    { payload: { id, onContinue, request, interval = 10000, onFailure, onFinished } }: IPollingAction<P, M>,
    actionPrefix: string
) {
    // start polling
}

export function* pollingSaga<T, M>(actionStartSuffix = "_POLL_START", actionStopSuffix = "_POLL_STOP") {
    yield takeEvery(
        ({ payload, type }: IPollingAction<T, M>) => type && type.endsWith(actionStartSuffix) && payload.id != null,
        function*(action: IPollingAction<T, M>) {
            yield call(pollingWorker, actionStartSuffix, actionStopSuffix, action);
        }
    );
}
