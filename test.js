import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    stages: [
        { duration: '1m', target: 100 },     // Warm-up
        { duration: '5m', target: 1000 },    // Ramp to 1k
        { duration: '5m', target: 3000 },    // Ramp to 3k
        { duration: '5m', target: 5000 },    // Ramp to 5k
        { duration: '5m', target: 10000 },   // Ramp to 10k
        { duration: '10m', target: 15000 },   // Ramp to 15k
        { duration: '10m', target: 20000 },   // Ramp to 20k
        { duration: '15m', target: 20000 },   // Hold at 20k
        { duration: '3m', target: 0 },       // Cool down
      ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should complete below 1000ms
    http_req_failed: ['rate<0.01'],    // <1% of requests should fail
  },
};

const urls = [
  'https://www.hillypix.com/',
  'https://www.hillypix.com/register',
  'https://www.hillypix.com/login',
  'https://www.hillypix.com/movies/all',
  'https://www.hillypix.com/web-series/all',
  'https://www.hillypix.com/music/all',
  'https://www.hillypix.com/about-us-hillypix-truly-east',
  'https://www.hillypix.com/hillywood-fiesta',
  'https://www.hillypix.com/connect-with-us-or-hillypix-truly-east',
  'https://www.hillypix.com/faq',
  'https://www.hillypix.com/help-center-hillypix-truly-east',
  'https://www.hillypix.com/refund-and-cancellations-policy',
  'https://www.hillypix.com/detail/alung-rui-tho-khuai-mak-ge',
  'https://www.hillypix.com/detail/ningam-mak-ge',
  'https://www.hillypix.com/detail/duipeng-thang-tei',
  'https://www.hillypix.com/detail/parampita',
  'https://www.hillypix.com/detail/chamdan-la-tho',
  'https://www.hillypix.com/detail/project-praise'
];

export default function () {
  const url = randomItem(urls);
  const res = http.get(url);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Sleep to mimic human behavior (random delay between 1s and 5s)
  sleep(Math.random() * 4 + 1);
}
