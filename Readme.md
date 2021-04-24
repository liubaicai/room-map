# bj-room
北京租房助手

备份数据
~~~ bash
docker exec bj-room_db_1 pg_dump bj-room -U postgres -W -f /db-backup/backup.sql
~~~

恢复数据
~~~ bash
docker exec bj-room_db_1 psql -U postgres -d bj-room -W -f /db-backup/backup.sql
~~~

导入数据后修复索引
~~~ sql
SELECT setval(
    pg_get_serial_sequence('"room"', 'id'),
    (SELECT MAX("id") FROM "room") + 1
)
~~~