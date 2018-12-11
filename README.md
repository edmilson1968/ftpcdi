# ftpcdi

#### compiling using Docker and node version 8-alpine
```
$ mkdir -f /code/finance
$ cd /code/finance
$ git clone https://github.com/edmilson1968/ftpcdi.git
$ docker run -it -w /finance/ftpcdi -v /code/finance:/finance node:8-alpine npm install
```

#### running using Docker
```
$ docker run -d -it -p 3000:3000 -w /finance/ftpcdi -v /code/finance:/finance node:8-alpine node index.js
```

#### consuming services

### health service (hello-world)
```
$ curl http://localhost:3000
Hello World!
Response-Code: 200 (OK)
```

### cdi tax daily rate service
```
Request: /cdi/{date-pattern}
date-pattern: yyyyMMdd.txt

$ curl http://localhost:3000/cdi/20181211.txt

Response-Body: {"cdi":6.4,"cdidia":1.0002462}
Response-Code: 200 (OK)
```
