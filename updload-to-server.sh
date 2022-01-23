#!/bin/sh

rsync -rtvzP --exclude node_modules . upcloud-1:~/random-tracklist/

