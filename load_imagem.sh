docker build -t jeffersonfarias/boris-front:latest  -f Dockerfile .
docker login --username=jeffersonfarias
docker push jeffersonfarias/boris-front:latest