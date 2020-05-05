#!/bin/bash

sudo docker exec room-map-db pg_dump room-map -U postgres -f /db-backup/backup.sql