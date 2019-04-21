# ToDo Application

[This is a code that comes along with great tutorial](https://medium.com/@bhavaniravi/build-your-1st-python-web-app-with-flask-b039d11f101c)

### To Run App in Docker

1. Checkout `Dockerfile`. It is created by [following this tutorial](https://runnable.com/docker/python/dockerize-your-flask-application).
2. I have changed it to accomodate latest version of ununtu and `python3`
3. To build docker image `docker build -t todo-flask:latest .`
4. To run the docker container `docker run -it -p 5000:8888 todo-flask `

