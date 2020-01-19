docker build -t jeffersonfarias/boris-front:1.0.1  -f Dockerfile .
docker login --username=jeffersonfarias
docker push jeffersonfarias/boris-front:1.0.1