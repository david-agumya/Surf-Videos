#!/bin/bash

cd server
gunicorn wsgi:app
