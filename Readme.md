# room-map

备份数据
~~~ bash
docker exec room-map-db pg_dump room-map -U postgres -W -f /db-backup/backup.sql
~~~

恢复数据
~~~ bash
docker exec room-map-db psql -U postgres -d room-map -W -f /db-backup/backup.sql
~~~

导入数据后修复索引
~~~ sql
SELECT setval(
    pg_get_serial_sequence('"room"', 'id'),
    (SELECT MAX("id") FROM "room") + 1
)
~~~