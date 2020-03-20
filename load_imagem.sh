docker build -t jeffersonfarias/boris-front:1.0.2  -f Dockerfile .
docker login --username=jeffersonfarias
docker push jeffersonfarias/boris-front:1.0.2