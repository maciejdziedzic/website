#!/bin/bash
source /home/website/backend/pyenv/bin/activate
cd /home/website/backend
exec gunicorn -b :5000 main:app
