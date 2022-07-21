export const jsApiCallToken = `var data = JSON.stringify({
  "organization": "bh",
  "customerId": "cust_01",
  "data": [
    {
      "name": "naveen dudi",
      "email": "naveen@gmail.com",
      "key": 1,
      "table": "test_table"
    },
    {
      "name": "parag",
      "email": "parag@gmail.com",
      "key": 1,
      "table": "test_table_2"
    }
  ]
});
var config = {
  method: 'post',
  url: 'http://apis-dev.blinktrust.com/api/v1/vault-service/vault/createOrUpdate',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};`;

export const jsApiCallDetoken = `var data = JSON.stringify({
    "organization": "bh",
    "customerId": "cust_01",
    "table": "test_table",
    "row_id": 1
  });

var config = {
  method: 'post',
  url: 'localhost:3200/api/v1/vault-service/vault/detokenize',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};`;

export const pyApiCallToken = `url = "http://localhost:3200/api/v1/vault-service/vault/createOrUpdate"
payload = json.dumps({
  "organization": "bh",
  "customerId": "cust_01",
  "data": [
    {
      "name": "naveen dudi",
      "email": "naveen@gmail.com",
      "key": 1,
      "table": "test_table"
    },
    {
      "name": "parag",
      "email": "parag@gmail.com",
      "key": 1,
      "table": "test_table_2"
    }
  ]
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)`;

export const pyApiCallDetoken = `url = "localhost:3200/api/v1/vault-service/vault/detokenize"

payload = json.dumps({
  "organization": "bh",
  "customerId": "cust_01",
  "table": "test_table",
  "row_id": 1
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)`;
