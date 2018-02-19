#!/bin/bash

cd server
gunicorn wsgi.py:app
