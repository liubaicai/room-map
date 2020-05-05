#!/bin/bash

sudo docker exec room-map-db psql -U postgres -d room-map -f /db-backup/backup.sql