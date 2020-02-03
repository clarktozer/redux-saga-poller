import { expectSaga } from "redux-saga-test-plan";
import { pollingSaga } from "../src";

const successRequest = () => Promise.resolve([1, 2, 3, 4, 5]);

it("API Success Test", () =>
    expectSaga(pollingSaga)
        .put({
            type: "TEST_POLL_FINISHED",
            payload: [1, 2, 3, 4, 5],
            meta: successRequest
        })
        .put({
            type: "TEST_POLL_STOP",
            payload: 1,
            meta: successRequest
        })
        .dispatch({
            type: "TEST_POLL_START",
            payload: {
                id: 1,
                interval: 100,
                request: successRequest,
                onContinue: () => false
            }
        })
        .run());
