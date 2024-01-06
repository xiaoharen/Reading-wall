create database if not exists xhr;

use xhr;

create table if not exists book
(
    id         bigint auto_increment comment 'book id' primary key,
    bookName   varchar(256)                       not null comment 'title',
    author     varchar(256)                       not null comment 'author',
    xhrUrl     varchar(256)                       null comment 'book xhr blog url',
    imageUrl   varchar(256)                       null comment 'imageUrl',
    lid        varchar(256)                       null comment 'label id',
    createTime datetime default CURRENT_TIMESTAMP not null comment 'createTime',
    updateTime datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment 'updateTime',
    isDelete   tinyint  default 0                 not null comment 'isDelete'
) comment 'book' collate = utf8mb4_unicode_ci;

create table if not exists label
(
    id       bigint auto_increment comment 'label id' primary key,
    title    varchar(256)      not null comment 'title',
    isDelete tinyint default 0 not null comment 'isDelete'
) comment 'label' collate = utf8mb4_unicode_ci;

create table if not exists user
(
    id       bigint auto_increment comment 'user id' primary key,
    username varchar(256)      not null comment 'username',
    password varchar(256)      not null comment 'password',
    state tinyint default 0 not null comment '0:user 1:admin',
    isDelete tinyint default 0 not null comment 'isDelete'
) comment 'user' collate = utf8mb4_unicode_ci;

