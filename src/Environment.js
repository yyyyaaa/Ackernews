import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';
import { GC_AUTH_TOKEN } from './constants';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const store = new Store(new RecordSource());
const fetchQuery = (operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/cj64fh9zlj2gf0160e400em7x', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  })
};

// Setup subscription endpoint
const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text;
  const subscriptionClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj64fh9zlj2gf0160e400em7x', {reconnect: true});
  subscriptionClient.subscribe({query, variables}, (error, result) => {
    observer.onNext({data: result});
  });
}

const network = Network.create(fetchQuery, setupSubscription);

const environment = new Environment({
  network,
  store
});

export default environment;