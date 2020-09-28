# redux-saga-poller

![CI Status](https://img.shields.io/github/workflow/status/clarktozer/redux-saga-poller/Build%20&%20Test)
[![npm version](https://img.shields.io/npm/v/redux-saga-poller.svg)](https://www.npmjs.com/package/redux-saga-poller)

Saga for consistent polling of async actions

Dispatch the polling start action in FSA format with your desired postfix (default is "\_POLL_START").

```
dispatch({
    type: "GET_ITEMS_POLL_START",
    payload: {
        id: 1,
        interval: 1000,
        request: () => Promise.resolve([1, 2, 3, 4, 5]),
        onContinue: (response) => response.length === 5,
        onSuccess: (response) => {
            alert(response);
        },
        onFailure: (error) => {
            alert(error);
        }
    },
    meta: "Some data"
})
```

Dispatch the polling stop action in FSA format with your desired stop polling postfix (default is "\_POLL_STOP").

```
dispatch({
    type: "GET_ITEMS_POLL_STOP",
    payload: 1,
})
```
