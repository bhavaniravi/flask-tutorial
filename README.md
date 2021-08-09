# ToDo Application

[This is a code that comes along with great tutorial](https://medium.com/@bhavaniravi/build-your-1st-python-web-app-with-flask-b039d11f101c)

## Using the Frontend

1. Open `index.html` file in a browser.
2. Run `python app/app.py` in the terminal.
3. That's it! You can add create edit delete items via UI

## Using React Frontned

The above frontend is built with plain JS, for modern web apps most people use React. 

In this tutorial I have complied the [React Frontend](https://medium.com/bhavaniravi/building-your-1st-webapp-integrating-with-frontend-d9f1a8bf21a5) with Flask.

### To Run App in Docker

1. Checkout `Dockerfile`. It is created by [following this tutorial](https://runnable.com/docker/python/dockerize-your-flask-application).
2. I have changed it to accomodate latest version of ununtu and `python3`
3. To build docker image `docker build -t todo-flask:latest .`
4. To run the docker container `docker run -it -p 5000:8888 todo-flask `

